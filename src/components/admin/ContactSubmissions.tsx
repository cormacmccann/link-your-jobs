import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Building2, Calendar, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ContactSubmissions() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [notes, setNotes] = useState("");

  const { data: submissions, isLoading } = useQuery({
    queryKey: ["contact-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...updates }: any) => {
      const { error } = await supabase
        .from("contact_submissions")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Submission updated" });
      queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
      setSelectedSubmission(null);
    },
  });

  const handleStatusChange = (id: string, status: string) => {
    updateMutation.mutate({ id, status });
  };

  const handleSaveNotes = () => {
    if (selectedSubmission) {
      updateMutation.mutate({
        id: selectedSubmission.id,
        notes,
        status: selectedSubmission.status === "new" ? "read" : selectedSubmission.status,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-accent-violet text-white";
      case "read":
        return "bg-blue-500 text-white";
      case "responded":
        return "bg-green-500 text-white";
      case "archived":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Contact Form Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : submissions?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No contact submissions yet
            </div>
          ) : (
            <div className="space-y-3">
              {submissions?.map((submission) => (
                <div
                  key={submission.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedSubmission(submission);
                    setNotes(submission.notes || "");
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-lg">{submission.name}</h4>
                      <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {submission.email}
                        </div>
                        {submission.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {submission.phone}
                          </div>
                        )}
                        {submission.company && (
                          <div className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {submission.company}
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge className={getStatusColor(submission.status)}>
                      {submission.status}
                    </Badge>
                  </div>

                  <p className="text-sm line-clamp-2 mb-2">{submission.message}</p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(submission.created_at), "MMM dd, yyyy 'at' h:mm a")}
                    </div>
                    {submission.source_page && (
                      <span>From: {submission.source_page}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Submission Details</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-lg">{selectedSubmission.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-lg">{selectedSubmission.email}</p>
                </div>
                {selectedSubmission.phone && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p className="text-lg">{selectedSubmission.phone}</p>
                  </div>
                )}
                {selectedSubmission.company && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Company</p>
                    <p className="text-lg">{selectedSubmission.company}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Message</p>
                <p className="p-3 bg-muted rounded-lg">{selectedSubmission.message}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
                <div className="flex gap-2">
                  {["new", "read", "responded", "archived"].map((status) => (
                    <Button
                      key={status}
                      variant={selectedSubmission.status === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(selectedSubmission.id, status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Internal Notes</p>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this submission..."
                  rows={4}
                />
                <Button onClick={handleSaveNotes} className="mt-2">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Save Notes
                </Button>
              </div>

              <div className="pt-4 border-t text-xs text-muted-foreground">
                <p>Submitted: {format(new Date(selectedSubmission.created_at), "MMMM dd, yyyy 'at' h:mm a")}</p>
                {selectedSubmission.source_page && (
                  <p>Source: {selectedSubmission.source_page}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
