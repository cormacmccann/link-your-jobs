import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Building, Calendar, Activity, MessageSquare, Clock, Tag, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface ContactDetailViewProps {
  contactId: string;
  organizationId: string;
}

export function ContactDetailView({ contactId, organizationId }: ContactDetailViewProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);
  const [activityType, setActivityType] = useState<"email" | "call" | "meeting" | "note">("note");
  const [activityTitle, setActivityTitle] = useState("");
  const [activityDescription, setActivityDescription] = useState("");

  const { data: contact } = useQuery({
    queryKey: ["contact", contactId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contacts")
        .select(`
          *,
          company:companies(*),
          score:contact_scores(*)
        `)
        .eq("id", contactId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: activities } = useQuery({
    queryKey: ["contact-activities", contactId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_activities" as any)
        .select("*")
        .eq("contact_id", contactId)
        .order("activity_date", { ascending: false });

      if (error) throw error;
      return data as any[];
    },
  });

  const addActivityMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("contact_activities" as any).insert({
        organization_id: organizationId,
        contact_id: contactId,
        activity_type: activityType,
        title: activityTitle,
        description: activityDescription,
        created_by: user.id,
      } as any);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Activity added successfully" });
      queryClient.invalidateQueries({ queryKey: ["contact-activities", contactId] });
      setActivityTitle("");
      setActivityDescription("");
      setIsActivityDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: "Failed to add activity", description: error.message, variant: "destructive" });
    },
  });

  const updateLifecycleMutation = useMutation({
    mutationFn: async (stage: string) => {
      const { error } = await supabase
        .from("contacts")
        .update({ lifecycle_stage: stage } as any)
        .eq("id", contactId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Lifecycle stage updated" });
      queryClient.invalidateQueries({ queryKey: ["contact", contactId] });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to update lifecycle", description: error.message, variant: "destructive" });
    },
  });

  if (!contact) return <div>Loading...</div>;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "call":
        return <Phone className="h-4 w-4" />;
      case "meeting":
        return <Calendar className="h-4 w-4" />;
      case "note":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getLifecycleColor = (stage: string) => {
    const colors: Record<string, string> = {
      lead: "bg-blue-500",
      prospect: "bg-yellow-500",
      customer: "bg-green-500",
      partner: "bg-purple-500",
      lost: "bg-red-500",
    };
    return colors[stage] || "bg-gray-500";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">
                {contact.first_name} {contact.last_name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                {contact.company && (
                  <>
                    <Building className="h-4 w-4" />
                    {contact.company.name}
                  </>
                )}
              </CardDescription>
            </div>
            <Select value={(contact as any).lifecycle_stage} onValueChange={(value) => updateLifecycleMutation.mutate(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="prospect">Prospect</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Email</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="h-4 w-4" />
                  <span>{contact.email}</span>
                </div>
              </div>
              {contact.phone && (
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4" />
                    <span>{contact.phone}</span>
                  </div>
                </div>
              )}
              {contact.title && (
                <div>
                  <Label className="text-muted-foreground">Title</Label>
                  <p className="mt-1">{contact.title}</p>
                </div>
              )}
            </div>

            {contact.score && (
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Contact Score
                  </Label>
                  <div className="text-3xl font-bold mt-1">{contact.score[0]?.total_score || 0}</div>
                </div>
                <div className="space-y-2">
                  <div>
                    <Label className="text-sm">Engagement</Label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary h-2 rounded-full">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${contact.score[0]?.engagement_score || 0}%` }}
                        />
                      </div>
                      <span className="text-sm">{contact.score[0]?.engagement_score || 0}</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm">Fit</Label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-secondary h-2 rounded-full">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${contact.score[0]?.fit_score || 0}%` }} />
                      </div>
                      <span className="text-sm">{contact.score[0]?.fit_score || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Lifecycle Stage</Label>
                <div className="mt-2">
                  <Badge className={getLifecycleColor((contact as any).lifecycle_stage || 'lead')}>
                    {(contact as any).lifecycle_stage || 'lead'}
                  </Badge>
                </div>
              </div>
              {(contact as any).tags && (contact as any).tags.length > 0 && (
                <div>
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Tags
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(contact as any).tags.map((tag: string) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="activities">
        <TabsList>
          <TabsTrigger value="activities">Activity Timeline</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={isActivityDialogOpen} onOpenChange={setIsActivityDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Activity className="mr-2 h-4 w-4" />
                  Log Activity
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log Activity</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Activity Type</Label>
                    <Select value={activityType} onValueChange={(value: any) => setActivityType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="call">Call</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="note">Note</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input value={activityTitle} onChange={(e) => setActivityTitle(e.target.value)} placeholder="Activity title" />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={activityDescription}
                      onChange={(e) => setActivityDescription(e.target.value)}
                      placeholder="Activity details"
                      rows={4}
                    />
                  </div>
                  <Button onClick={() => addActivityMutation.mutate()} disabled={!activityTitle || addActivityMutation.isPending} className="w-full">
                    Add Activity
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {!activities || activities.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No activities yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {activities.map((activity: any) => (
                <Card key={activity.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">{getActivityIcon(activity.activity_type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{activity.title}</h4>
                          <Badge variant="outline">{activity.activity_type}</Badge>
                        </div>
                        {activity.description && <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {new Date(activity.activity_date).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="deals">
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <p>Deals associated with this contact will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <p>Tasks related to this contact will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
