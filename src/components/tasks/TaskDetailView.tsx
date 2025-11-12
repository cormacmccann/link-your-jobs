import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Clock, Play, Pause, CheckCircle, AlertCircle, Link as LinkIcon, MessageSquare, Paperclip } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface TaskDetailViewProps {
  taskId: string;
  organizationId: string;
}

export function TaskDetailView({ taskId, organizationId }: TaskDetailViewProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isTimeTracking, setIsTimeTracking] = useState(false);
  const [currentTimeEntryId, setCurrentTimeEntryId] = useState<string | null>(null);
  const [isDependencyDialogOpen, setIsDependencyDialogOpen] = useState(false);
  const [selectedDependencyTask, setSelectedDependencyTask] = useState("");

  const { data: task } = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cards")
        .select(`
          *,
          assigned:profiles!cards_assigned_to_fkey(full_name),
          contact:contacts(first_name, last_name),
          company:companies(name)
        `)
        .eq("id", taskId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: timeEntries } = useQuery({
    queryKey: ["time-entries", taskId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("time_entries" as any)
        .select("*")
        .eq("card_id", taskId)
        .order("start_time", { ascending: false });

      if (error) throw error;
      return data as any[];
    },
  });

  const { data: dependencies } = useQuery({
    queryKey: ["task-dependencies", taskId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("task_dependencies" as any)
        .select(`
          *,
          depends_on:cards!task_dependencies_depends_on_task_id_fkey(id, title, status)
        `)
        .eq("task_id", taskId);

      if (error) throw error;
      return data as any[];
    },
  });

  const { data: availableTasks } = useQuery({
    queryKey: ["available-tasks", organizationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cards")
        .select("id, title")
        .eq("organization_id", organizationId)
        .eq("card_type", "task")
        .neq("id", taskId);

      if (error) throw error;
      return data;
    },
  });

  const { data: comments } = useQuery({
    queryKey: ["task-comments", taskId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("card_comments")
        .select(`
          *,
          user:profiles(full_name)
        `)
        .eq("card_id", taskId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const startTimeMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("time_entries" as any)
        .insert({
          organization_id: organizationId,
          card_id: taskId,
          user_id: user.id,
          start_time: new Date().toISOString(),
        } as any)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data: any) => {
      setIsTimeTracking(true);
      setCurrentTimeEntryId(data.id);
      toast({ title: "Time tracking started" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to start time tracking", description: error.message, variant: "destructive" });
    },
  });

  const stopTimeMutation = useMutation({
    mutationFn: async () => {
      if (!currentTimeEntryId) throw new Error("No active time entry");

      const endTime = new Date();
      const { data: entry } = await supabase
        .from("time_entries" as any)
        .select("start_time")
        .eq("id", currentTimeEntryId)
        .single();

      if (!entry) throw new Error("Time entry not found");

      const durationMinutes = Math.floor((endTime.getTime() - new Date((entry as any).start_time).getTime()) / 60000);

      const { error } = await supabase
        .from("time_entries" as any)
        .update({
          end_time: endTime.toISOString(),
          duration_minutes: durationMinutes,
        } as any)
        .eq("id", currentTimeEntryId);

      if (error) throw error;
    },
    onSuccess: () => {
      setIsTimeTracking(false);
      setCurrentTimeEntryId(null);
      toast({ title: "Time tracking stopped" });
      queryClient.invalidateQueries({ queryKey: ["time-entries", taskId] });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to stop time tracking", description: error.message, variant: "destructive" });
    },
  });

  const addDependencyMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("task_dependencies" as any).insert({
        task_id: taskId,
        depends_on_task_id: selectedDependencyTask,
        dependency_type: "blocks",
      } as any);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Dependency added" });
      queryClient.invalidateQueries({ queryKey: ["task-dependencies", taskId] });
      setSelectedDependencyTask("");
      setIsDependencyDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: "Failed to add dependency", description: error.message, variant: "destructive" });
    },
  });

  const updateProgressMutation = useMutation({
    mutationFn: async (progress: number) => {
      const { error } = await supabase
        .from("cards")
        .update({ progress_percentage: progress } as any)
        .eq("id", taskId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });

  if (!task) return <div>Loading...</div>;

  const totalTimeSpent = timeEntries?.reduce((acc: number, entry: any) => acc + (entry.duration_minutes || 0), 0) || 0;
  const estimatedHours = (task as any).estimated_hours || 0;
  const actualHours = totalTimeSpent / 60;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl">{task.title}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge>{task.card_type}</Badge>
                <Badge variant={task.priority === "urgent" ? "destructive" : "outline"}>{task.priority}</Badge>
                <Badge variant={task.status === "completed" ? "success" : "secondary"}>{task.status}</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              {!isTimeTracking ? (
                <Button onClick={() => startTimeMutation.mutate()} disabled={startTimeMutation.isPending}>
                  <Play className="mr-2 h-4 w-4" />
                  Start Timer
                </Button>
              ) : (
                <Button onClick={() => stopTimeMutation.mutate()} disabled={stopTimeMutation.isPending} variant="destructive">
                  <Pause className="mr-2 h-4 w-4" />
                  Stop Timer
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {task.description && (
            <div>
              <Label>Description</Label>
              <p className="text-muted-foreground mt-1">{task.description}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time Tracking
              </Label>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Estimated</span>
                  <span className="font-medium">{estimatedHours.toFixed(1)}h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Actual</span>
                  <span className="font-medium">{actualHours.toFixed(1)}h</span>
                </div>
                <Progress value={estimatedHours > 0 ? (actualHours / estimatedHours) * 100 : 0} className="h-2" />
              </div>
            </div>

            <div>
              <Label>Progress</Label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={(task as any).progress_percentage || 0}
                    onChange={(e) => updateProgressMutation.mutate(parseInt(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                <Progress value={(task as any).progress_percentage || 0} className="h-2" />
              </div>
            </div>

            <div>
              <Label>Assignment</Label>
              <div className="mt-2">
                {task.assigned_to ? (
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {(task as any).assigned?.full_name?.[0] || "?"}
                    </div>
                    <span>{(task as any).assigned?.full_name || "Assigned"}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">Unassigned</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="time">
        <TabsList>
          <TabsTrigger value="time">Time Entries</TabsTrigger>
          <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
        </TabsList>

        <TabsContent value="time" className="space-y-4">
          {!timeEntries || timeEntries.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No time entries yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {timeEntries.map((entry: any) => (
                <Card key={entry.id}>
                  <CardContent className="py-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{entry.duration_minutes} minutes</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(entry.start_time).toLocaleString()}
                          {entry.end_time && ` - ${new Date(entry.end_time).toLocaleTimeString()}`}
                        </p>
                      </div>
                      {entry.is_billable && <Badge variant="outline">Billable</Badge>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="dependencies" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isDependencyDialogOpen} onOpenChange={setIsDependencyDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Add Dependency
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Task Dependency</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>This task depends on:</Label>
                    <Select value={selectedDependencyTask} onValueChange={setSelectedDependencyTask}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a task" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTasks?.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={() => addDependencyMutation.mutate()}
                    disabled={!selectedDependencyTask || addDependencyMutation.isPending}
                    className="w-full"
                  >
                    Add Dependency
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {!dependencies || dependencies.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8 text-muted-foreground">
                <LinkIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No dependencies</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {dependencies.map((dep: any) => (
                <Card key={dep.id}>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>{dep.depends_on.title}</span>
                      </div>
                      <Badge variant={dep.depends_on.status === "completed" ? "success" : "secondary"}>
                        {dep.depends_on.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="comments">
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Comments coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attachments">
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <Paperclip className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Attachments coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
