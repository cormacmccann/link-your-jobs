import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FileText, Calendar, MessageSquare, Plus, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface ProjectDashboardProps {
  projectId: string;
  organizationId: string;
}

export function ProjectDashboard({ projectId, organizationId }: ProjectDashboardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDocDialogOpen, setIsDocDialogOpen] = useState(false);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({ title: "", content: "" });
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    event_type: "milestone" as "milestone" | "deadline" | "meeting" | "reminder",
    start_date: "",
  });

  const { data: project } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const { data, error } = await supabase.from("cards").select("*").eq("id", projectId).single();

      if (error) throw error;
      return data;
    },
  });

  const { data: documents } = useQuery({
    queryKey: ["documents", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents")
        .select(`
          *,
          created_by_user:profiles!documents_created_by_fkey(full_name)
        `)
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as any[];
    },
  });

  const { data: events } = useQuery({
    queryKey: ["schedule-events", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("schedule_events")
        .select(`
          *,
          created_by_user:profiles!schedule_events_created_by_fkey(full_name)
        `)
        .eq("project_id", projectId)
        .order("start_date", { ascending: true });

      if (error) throw error;
      return data as any[];
    },
  });

  const { data: messageBoards } = useQuery({
    queryKey: ["message-boards", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("message_boards")
        .select(`
          *,
          messages(count)
        `)
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createDocMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("documents").insert({
        organization_id: organizationId,
        project_id: projectId,
        title: newDoc.title,
        content: newDoc.content,
        created_by: user.id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Document created" });
      queryClient.invalidateQueries({ queryKey: ["documents", projectId] });
      setNewDoc({ title: "", content: "" });
      setIsDocDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: "Failed to create document", description: error.message, variant: "destructive" });
    },
  });

  const createEventMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("schedule_events").insert({
        organization_id: organizationId,
        project_id: projectId,
        title: newEvent.title,
        description: newEvent.description,
        event_type: newEvent.event_type,
        start_date: newEvent.start_date,
        created_by: user.id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Event created" });
      queryClient.invalidateQueries({ queryKey: ["schedule-events", projectId] });
      setNewEvent({ title: "", description: "", event_type: "milestone", start_date: "" });
      setIsEventDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: "Failed to create event", description: error.message, variant: "destructive" });
    },
  });

  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      milestone: "default",
      deadline: "destructive",
      meeting: "secondary",
      reminder: "outline",
    };
    return colors[type] || "default";
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="documents">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="messages">Message Boards</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isDocDialogOpen} onOpenChange={setIsDocDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Document
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Document</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Title</Label>
                    <Input value={newDoc.title} onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })} placeholder="Document title" />
                  </div>
                  <div>
                    <Label>Content</Label>
                    <Textarea
                      value={newDoc.content}
                      onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
                      placeholder="Document content"
                      rows={10}
                    />
                  </div>
                  <Button onClick={() => createDocMutation.mutate()} disabled={!newDoc.title || createDocMutation.isPending} className="w-full">
                    Create Document
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {!documents || documents.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No documents yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc: any) => (
                <Card key={doc.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardDescription className="line-clamp-2">{doc.content}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>By {doc.created_by_user?.full_name}</span>
                      <span>v{doc.version}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Title</Label>
                    <Input value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Event title" />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <select
                      className="w-full border rounded-md p-2"
                      value={newEvent.event_type}
                      onChange={(e) => setNewEvent({ ...newEvent, event_type: e.target.value as any })}
                    >
                      <option value="milestone">Milestone</option>
                      <option value="deadline">Deadline</option>
                      <option value="meeting">Meeting</option>
                      <option value="reminder">Reminder</option>
                    </select>
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input type="datetime-local" value={newEvent.start_date} onChange={(e) => setNewEvent({ ...newEvent, start_date: e.target.value })} />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Event description"
                      rows={3}
                    />
                  </div>
                  <Button
                    onClick={() => createEventMutation.mutate()}
                    disabled={!newEvent.title || !newEvent.start_date || createEventMutation.isPending}
                    className="w-full"
                  >
                    Create Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {!events || events.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No events scheduled</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {events.map((event: any) => (
                <Card key={event.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4" />
                          <h4 className="font-medium">{event.title}</h4>
                          <Badge variant={getEventTypeColor(event.event_type) as any}>{event.event_type}</Badge>
                        </div>
                        {event.description && <p className="text-sm text-muted-foreground mb-2">{event.description}</p>}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {new Date(event.start_date).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="messages">
          {!messageBoards || messageBoards.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No message boards yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {messageBoards.map((board) => (
                <Card key={board.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      {board.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{board.messages?.[0]?.count || 0} messages</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
