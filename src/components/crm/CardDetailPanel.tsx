import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Briefcase, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  MessageSquare,
  Paperclip,
  Send,
  Edit,
  Trash2,
  Archive,
  UserCircle,
  Upload,
  Download,
  FileIcon,
  X,
  Activity
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { CardFormDialog } from "./CardFormDialog";
import { formatDistanceToNow } from "date-fns";

type CardType = "project" | "deal" | "task" | "support" | "milestone" | "note";
type Priority = "urgent" | "high" | "normal" | "low";
type Status = "active" | "completed" | "archived" | "cancelled";

interface CardDetailPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  card?: {
    id: string;
    cardType: CardType;
    title: string;
    description?: string;
    status: Status;
    priority?: Priority;
    assignedTo?: string | null;
    dueDate?: string;
    relatedContact?: string;
    relatedContactId?: string;
    relatedCompanyId?: string;
    organizationId: string;
  };
}

const cardStyles: Record<CardType, { icon: any; color: string }> = {
  project: { icon: Briefcase, color: "text-blue-500" },
  deal: { icon: Target, color: "text-green-500" },
  task: { icon: CheckCircle2, color: "text-purple-500" },
  support: { icon: AlertCircle, color: "text-red-500" },
  milestone: { icon: Clock, color: "text-yellow-500" },
  note: { icon: MessageSquare, color: "text-gray-500" }
};

export function CardDetailPanel({ open, onOpenChange, card }: CardDetailPanelProps) {
  const [comment, setComment] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  if (!card) return null;

  const style = cardStyles[card.cardType];
  const Icon = style.icon;

  // Fetch organization users for assignment
  const { data: users = [] } = useQuery({
    queryKey: ['org-users', card.organizationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_roles')
        .select('user_id, profiles(id, full_name, email)')
        .eq('organization_id', card.organizationId);
      
      if (error) throw error;
      return data.map((ur: any) => ({
        id: ur.user_id,
        full_name: ur.profiles?.full_name,
        email: ur.profiles?.email,
      }));
    },
  });

  // Fetch comments with real-time updates
  const { data: comments = [] } = useQuery({
    queryKey: ["card-comments", card.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("card_comments")
        .select("*, profiles(full_name, email)")
        .eq("card_id", card.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    }
  });

  // Fetch activities with real-time updates
  const { data: activities = [] } = useQuery({
    queryKey: ["card-activities", card.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("card_activities")
        .select("*, profiles(full_name, email)")
        .eq("card_id", card.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  // Fetch attachments with real-time updates
  const { data: attachments = [] } = useQuery({
    queryKey: ["card-attachments", card.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("card_attachments")
        .select("*, profiles(full_name, email)")
        .eq("card_id", card.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  // Set up real-time subscriptions
  useEffect(() => {
    const commentsChannel = supabase
      .channel(`card-comments-${card.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'card_comments',
          filter: `card_id=eq.${card.id}`
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["card-comments", card.id] });
        }
      )
      .subscribe();

    const activitiesChannel = supabase
      .channel(`card-activities-${card.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'card_activities',
          filter: `card_id=eq.${card.id}`
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["card-activities", card.id] });
        }
      )
      .subscribe();

    const attachmentsChannel = supabase
      .channel(`card-attachments-${card.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'card_attachments',
          filter: `card_id=eq.${card.id}`
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["card-attachments", card.id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(commentsChannel);
      supabase.removeChannel(activitiesChannel);
      supabase.removeChannel(attachmentsChannel);
    };
  }, [card.id, queryClient]);

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('cards')
        .delete()
        .eq('id', card.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      toast({ title: 'Card deleted successfully' });
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast({ title: 'Failed to delete card', description: error.message, variant: 'destructive' });
    },
  });

  // Archive mutation
  const archiveMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('cards')
        .update({ status: 'cancelled' })
        .eq('id', card.id);
      if (error) throw error;

      // Log activity
      await supabase.from("card_activities").insert({
        card_id: card.id,
        user_id: user.id,
        activity_type: "archived",
        activity_data: {}
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      toast({ title: 'Card archived successfully' });
    },
    onError: (error: any) => {
      toast({ title: 'Failed to archive card', description: error.message, variant: 'destructive' });
    },
  });

  // Status change mutation
  const statusMutation = useMutation({
    mutationFn: async (newStatus: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const updates: any = { status: newStatus };
      if (newStatus === 'completed') {
        updates.completed_at = new Date().toISOString();
      }
      const { error } = await supabase
        .from('cards')
        .update(updates)
        .eq('id', card.id);
      if (error) throw error;

      // Log activity
      await supabase.from("card_activities").insert({
        card_id: card.id,
        user_id: user.id,
        activity_type: "status_changed",
        activity_data: { status: newStatus }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      toast({ title: 'Status updated successfully' });
    },
    onError: (error: any) => {
      toast({ title: 'Failed to update status', description: error.message, variant: 'destructive' });
    },
  });

  // Priority change mutation
  const priorityMutation = useMutation({
    mutationFn: async (newPriority: Priority) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('cards')
        .update({ priority: newPriority })
        .eq('id', card.id);
      if (error) throw error;

      // Log activity
      await supabase.from("card_activities").insert({
        card_id: card.id,
        user_id: user.id,
        activity_type: "priority_changed",
        activity_data: { priority: newPriority }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      toast({ title: 'Priority updated successfully' });
    },
    onError: (error: any) => {
      toast({ title: 'Failed to update priority', description: error.message, variant: 'destructive' });
    },
  });

  // Assignment mutation
  const assignMutation = useMutation({
    mutationFn: async (userId: string | null) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('cards')
        .update({ assigned_to: userId })
        .eq('id', card.id);
      if (error) throw error;

      // Log activity
      await supabase.from("card_activities").insert({
        card_id: card.id,
        user_id: user.id,
        activity_type: "assigned",
        activity_data: { assigned_to: userId }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      toast({ title: 'Assignment updated successfully' });
    },
    onError: (error: any) => {
      toast({ title: 'Failed to update assignment', description: error.message, variant: 'destructive' });
    },
  });

  // Comment mutation
  const commentMutation = useMutation({
    mutationFn: async (text: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("card_comments")
        .insert({
          card_id: card.id,
          user_id: user.id,
          comment_text: text
        });

      if (error) throw error;

      // Log activity
      await supabase.from("card_activities").insert({
        card_id: card.id,
        user_id: user.id,
        activity_type: "commented",
        activity_data: { comment_preview: text.substring(0, 50) }
      });
    },
    onSuccess: () => {
      setComment("");
      toast({ title: "Comment added" });
    },
    onError: (error: any) => {
      toast({ title: "Failed to add comment", description: error.message, variant: "destructive" });
    }
  });

  // Upload attachment mutation
  const uploadAttachmentMutation = useMutation({
    mutationFn: async (file: File) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${card.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('card-attachments')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('card-attachments')
        .getPublicUrl(fileName);

      // Save attachment record
      const { error } = await supabase
        .from("card_attachments")
        .insert({
          card_id: card.id,
          uploaded_by: user.id,
          file_name: file.name,
          file_url: publicUrl,
          file_size: file.size,
          file_type: file.type
        });

      if (error) throw error;

      // Log activity
      await supabase.from("card_activities").insert({
        card_id: card.id,
        user_id: user.id,
        activity_type: "attachment_added",
        activity_data: { file_name: file.name }
      });
    },
    onSuccess: () => {
      toast({ title: "File uploaded successfully" });
      setUploadingFile(false);
    },
    onError: (error: any) => {
      toast({ title: "Failed to upload file", description: error.message, variant: "destructive" });
      setUploadingFile(false);
    }
  });

  // Delete attachment mutation
  const deleteAttachmentMutation = useMutation({
    mutationFn: async (attachmentId: string) => {
      const { error } = await supabase
        .from("card_attachments")
        .delete()
        .eq("id", attachmentId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Attachment deleted" });
    },
    onError: (error: any) => {
      toast({ title: "Failed to delete attachment", description: error.message, variant: "destructive" });
    }
  });

  const handleAddComment = () => {
    if (!comment.trim()) return;
    commentMutation.mutate(comment.trim());
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleAssignToMe = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      assignMutation.mutate(user.id);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File size must be less than 10MB", variant: "destructive" });
      return;
    }

    setUploadingFile(true);
    uploadAttachmentMutation.mutate(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getActivityMessage = (activity: any) => {
    const userName = activity.profiles?.full_name || activity.profiles?.email || 'Someone';
    switch (activity.activity_type) {
      case 'created':
        return `${userName} created this card`;
      case 'updated':
        return `${userName} updated this card`;
      case 'commented':
        return `${userName} added a comment`;
      case 'assigned':
        return `${userName} assigned this card`;
      case 'status_changed':
        return `${userName} changed the status to ${activity.activity_data?.status}`;
      case 'priority_changed':
        return `${userName} changed the priority to ${activity.activity_data?.priority}`;
      case 'attachment_added':
        return `${userName} uploaded ${activity.activity_data?.file_name}`;
      case 'archived':
        return `${userName} archived this card`;
      case 'deleted':
        return `${userName} deleted this card`;
      default:
        return `${userName} performed an action`;
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-2xl p-0 flex flex-col">
          <SheetHeader className="px-6 pt-6 pb-4">
            <div className="flex items-start gap-3">
              <div className={cn("mt-1", style.color)}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <SheetTitle className="text-2xl mb-2">{card.title}</SheetTitle>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="capitalize">
                    {card.cardType}
                  </Badge>
                  
                  <Select value={card.status} onValueChange={(value) => statusMutation.mutate(value)}>
                    <SelectTrigger className="w-32 h-7 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>

                  {card.priority && (
                    <Select value={card.priority} onValueChange={(value) => priorityMutation.mutate(value as Priority)}>
                      <SelectTrigger className="w-28 h-7 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4 flex-wrap">
              <Button variant="outline" size="sm" onClick={() => setShowEditDialog(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => archiveMutation.mutate()}>
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </Button>
              <Button variant="outline" size="sm" onClick={handleAssignToMe}>
                <UserCircle className="w-4 h-4 mr-2" />
                Assign to Me
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setShowDeleteDialog(true)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </SheetHeader>

          <Separator />

          <ScrollArea className="flex-1 px-6">
            <div className="space-y-6 py-6">
              {/* Details Section */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Description
                </h3>
                <p className="text-sm text-muted-foreground">
                  {card.description || "No description provided"}
                </p>
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Assigned To</p>
                  <Select 
                    value={card.assignedTo || 'unassigned'} 
                    onValueChange={(value) => assignMutation.mutate(value === 'unassigned' ? null : value)}
                  >
                    <SelectTrigger className="w-full h-8 text-sm">
                      <SelectValue placeholder="Unassigned" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {users.map((user: any) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.full_name || user.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {card.dueDate && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Due Date</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{card.dueDate}</span>
                    </div>
                  </div>
                )}
                {card.relatedContact && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Related Contact</p>
                    <span className="text-sm">{card.relatedContact}</span>
                  </div>
                )}
              </div>

              <Separator />

              {/* Tabs for Comments, Activity, and Attachments */}
              <Tabs defaultValue="comments" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="comments">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Comments ({comments.length})
                  </TabsTrigger>
                  <TabsTrigger value="activity">
                    <Activity className="h-4 w-4 mr-2" />
                    Activity ({activities.length})
                  </TabsTrigger>
                  <TabsTrigger value="attachments">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Files ({attachments.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="comments" className="space-y-4 mt-4">
                  {/* Comments List */}
                  <div className="space-y-4 max-h-[300px] overflow-y-auto">
                    {comments.length === 0 ? (
                      <div className="text-sm text-muted-foreground text-center py-8">
                        No comments yet. Be the first to comment!
                      </div>
                    ) : (
                      comments.map((commentItem: any) => (
                        <div key={commentItem.id} className="flex gap-3 pb-4 border-b last:border-0">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {(commentItem.profiles?.full_name || commentItem.profiles?.email || 'U')[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">
                                {commentItem.profiles?.full_name || commentItem.profiles?.email}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(commentItem.created_at), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                              {commentItem.comment_text}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="mt-4">
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {activities.length === 0 ? (
                      <div className="text-sm text-muted-foreground text-center py-8">
                        No activity yet
                      </div>
                    ) : (
                      activities.map((activity: any) => (
                        <div key={activity.id} className="flex gap-3 pb-3 border-b last:border-0">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {(activity.profiles?.full_name || activity.profiles?.email || 'U')[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm">
                              {getActivityMessage(activity)}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="attachments" className="space-y-4 mt-4">
                  {/* Upload Button */}
                  <div>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={uploadingFile}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('file-upload')?.click()}
                      disabled={uploadingFile}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadingFile ? 'Uploading...' : 'Upload File'}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Maximum file size: 10MB
                    </p>
                  </div>

                  {/* Attachments List */}
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {attachments.length === 0 ? (
                      <div className="text-sm text-muted-foreground text-center py-8">
                        No attachments yet
                      </div>
                    ) : (
                      attachments.map((attachment: any) => (
                        <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <FileIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{attachment.file_name}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{formatFileSize(attachment.file_size)}</span>
                                <span>•</span>
                                <span>{formatDistanceToNow(new Date(attachment.created_at), { addSuffix: true })}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(attachment.file_url, '_blank')}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteAttachmentMutation.mutate(attachment.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>

          <Separator />

          {/* Comment Input */}
          <div className="px-6 py-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    handleAddComment();
                  }
                }}
                className="min-h-[80px]"
              />
              <Button onClick={handleAddComment} size="icon" className="shrink-0" disabled={commentMutation.isPending}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Cmd/Ctrl + Enter to send
            </p>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Card</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{card.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {showEditDialog && (
        <CardFormDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          organizationId={card.organizationId}
          card={{
            id: card.id,
            card_type: card.cardType,
            title: card.title,
            description: card.description,
            priority: (card.priority || 'normal') as Priority,
            due_date: card.dueDate,
            related_company_id: card.relatedCompanyId || null,
            related_contact_id: card.relatedContactId || null,
            assigned_to: card.assignedTo || null,
          }}
        />
      )}
    </>
  );
}
