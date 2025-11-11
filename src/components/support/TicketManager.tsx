import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, Clock, MessageSquare, Star, Ticket } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TicketManagerProps {
  organizationId: string;
}

export function TicketManager({ organizationId }: TicketManagerProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    priority: "normal" as "low" | "normal" | "high" | "urgent",
  });

  const { data: tickets } = useQuery({
    queryKey: ["tickets", organizationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cards")
        .select(`
          *,
          contact:contacts(first_name, last_name, email),
          assigned:profiles!cards_assigned_to_fkey(full_name)
        `)
        .eq("organization_id", organizationId)
        .eq("card_type", "support")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: selectedTicketDetails } = useQuery({
    queryKey: ["ticket-details", selectedTicket],
    queryFn: async () => {
      if (!selectedTicket) return null;

      const { data, error } = await supabase
        .from("cards")
        .select(`
          *,
          contact:contacts(*),
          assigned:profiles!cards_assigned_to_fkey(*),
          responses:ticket_responses(*)
        `)
        .eq("id", selectedTicket)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!selectedTicket,
  });

  const createTicketMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Generate ticket number
      const ticketNumber = `TKT-${Date.now().toString().slice(-8)}`;

      const { error } = await supabase.from("cards").insert({
        organization_id: organizationId,
        card_type: "support",
        title: newTicket.title,
        description: newTicket.description,
        priority: newTicket.priority,
        status: "active",
        created_by: user.id,
        ticket_number: ticketNumber,
      } as any);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Ticket created successfully" });
      queryClient.invalidateQueries({ queryKey: ["tickets", organizationId] });
      setNewTicket({ title: "", description: "", priority: "normal" });
      setIsCreateDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: "Failed to create ticket", description: error.message, variant: "destructive" });
    },
  });

  const addResponseMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("ticket_responses").insert({
        organization_id: organizationId,
        ticket_id: selectedTicket!,
        user_id: user.id,
        response_type: "public_reply",
        content: responseText,
      } as any);

      if (error) throw error;

      // Update first_response_at if not set
      if (selectedTicketDetails && !(selectedTicketDetails as any).first_response_at) {
        await supabase
          .from("cards")
          .update({ first_response_at: new Date().toISOString() } as any)
          .eq("id", selectedTicket!);
      }
    },
    onSuccess: () => {
      toast({ title: "Response added" });
      queryClient.invalidateQueries({ queryKey: ["ticket-details", selectedTicket] });
      setResponseText("");
    },
    onError: (error: Error) => {
      toast({ title: "Failed to add response", description: error.message, variant: "destructive" });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ ticketId, status }: { ticketId: string; status: string }) => {
      const updates: any = { status };
      if (status === "completed") {
        updates.resolved_at = new Date().toISOString();
      }

      const { error } = await supabase.from("cards").update(updates).eq("id", ticketId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Status updated" });
      queryClient.invalidateQueries({ queryKey: ["tickets", organizationId] });
      queryClient.invalidateQueries({ queryKey: ["ticket-details", selectedTicket] });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to update status", description: error.message, variant: "destructive" });
    },
  });

  const rateSatisfactionMutation = useMutation({
    mutationFn: async (score: number) => {
      const { error} = await supabase
        .from("cards")
        .update({ customer_satisfaction_score: score } as any)
        .eq("id", selectedTicket!);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Thank you for your feedback!" });
      queryClient.invalidateQueries({ queryKey: ["ticket-details", selectedTicket] });
    },
  });

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: "secondary",
      normal: "default",
      high: "warning",
      urgent: "destructive",
    };
    return colors[priority] || "default";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Support Tickets</CardTitle>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Ticket className="mr-2 h-4 w-4" />
                    New
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Support Ticket</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={newTicket.title}
                        onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                        placeholder="Brief description of the issue"
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={newTicket.description}
                        onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                        placeholder="Detailed description"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label>Priority</Label>
                      <Select value={newTicket.priority} onValueChange={(value: any) => setNewTicket({ ...newTicket, priority: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={() => createTicketMutation.mutate()} disabled={!newTicket.title || createTicketMutation.isPending} className="w-full">
                      Create Ticket
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {!tickets || tickets.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Ticket className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No tickets yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket.id)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedTicket === ticket.id ? "bg-accent" : "hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(ticket.status)}
                          <span className="font-medium text-sm truncate">{(ticket as any).ticket_number || 'TKT-000'}</span>
                        </div>
                        <p className="text-sm truncate">{ticket.title}</p>
                        {ticket.contact && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {ticket.contact.first_name} {ticket.contact.last_name}
                          </p>
                        )}
                      </div>
                      <Badge variant={getPriorityColor(ticket.priority) as any} className="text-xs">
                        {ticket.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        {!selectedTicket || !selectedTicketDetails ? (
          <Card>
            <CardContent className="text-center py-16 text-muted-foreground">
              <Ticket className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Select a ticket to view details</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle>{(selectedTicketDetails as any).ticket_number || 'TKT-000'}</CardTitle>
                    <Badge variant={getPriorityColor(selectedTicketDetails.priority) as any}>
                      {selectedTicketDetails.priority}
                    </Badge>
                  </div>
                  <CardDescription>{selectedTicketDetails.title}</CardDescription>
                </div>
                <Select
                  value={selectedTicketDetails.status}
                  onValueChange={(value) => updateStatusMutation.mutate({ ticketId: selectedTicket, status: value })}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Description</Label>
                <p className="text-muted-foreground mt-1">{selectedTicketDetails.description}</p>
              </div>

              {selectedTicketDetails.contact && (
                <div>
                  <Label>Customer</Label>
                  <div className="mt-1">
                    <p className="font-medium">
                      {selectedTicketDetails.contact.first_name} {selectedTicketDetails.contact.last_name}
                    </p>
                    <p className="text-sm text-muted-foreground">{selectedTicketDetails.contact.email}</p>
                  </div>
                </div>
              )}

              <Tabs defaultValue="responses">
                <TabsList>
                  <TabsTrigger value="responses">Responses</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
                </TabsList>

                <TabsContent value="responses" className="space-y-4">
                  <div className="space-y-3">
                    {(selectedTicketDetails as any).responses?.map((response: any) => (
                      <div key={response.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-sm font-medium">{response.response_type.replace("_", " ")}</span>
                          <span className="text-xs text-muted-foreground">{new Date(response.created_at).toLocaleString()}</span>
                        </div>
                        <p className="text-sm">{response.content}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label>Add Response</Label>
                    <Textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Type your response..."
                      rows={4}
                    />
                    <Button
                      onClick={() => addResponseMutation.mutate()}
                      disabled={!responseText || addResponseMutation.isPending}
                    >
                      Send Response
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="details">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Created</Label>
                    <p className="text-sm mt-1">{new Date(selectedTicketDetails.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <Label>First Response</Label>
                    <p className="text-sm mt-1">
                      {(selectedTicketDetails as any).first_response_at
                        ? new Date((selectedTicketDetails as any).first_response_at).toLocaleString()
                        : "Awaiting response"}
                    </p>
                  </div>
                  {(selectedTicketDetails as any).resolved_at && (
                    <div>
                      <Label>Resolved</Label>
                      <p className="text-sm mt-1">{new Date((selectedTicketDetails as any).resolved_at).toLocaleString()}</p>
                    </div>
                  )}
                  {(selectedTicketDetails as any).sla_deadline && (
                    <div>
                      <Label>SLA Deadline</Label>
                      <p className="text-sm mt-1">{new Date((selectedTicketDetails as any).sla_deadline).toLocaleString()}</p>
                    </div>
                  )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="satisfaction">
                  <div className="space-y-4">
                    {(selectedTicketDetails as any).customer_satisfaction_score ? (
                      <div>
                        <Label>Customer Satisfaction</Label>
                        <div className="flex items-center gap-2 mt-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-6 w-6 ${
                                star <= (selectedTicketDetails as any).customer_satisfaction_score
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">
                            {(selectedTicketDetails as any).customer_satisfaction_score}/5
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Label>Rate Your Experience</Label>
                        <p className="text-sm text-muted-foreground mb-4">How satisfied were you with the support?</p>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Button
                              key={star}
                              variant="outline"
                              size="icon"
                              onClick={() => rateSatisfactionMutation.mutate(star)}
                            >
                              <Star className="h-5 w-5" />
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
