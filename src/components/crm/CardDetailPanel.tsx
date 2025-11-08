import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
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
  UserCircle
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { CardFormDialog } from "./CardFormDialog";

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

const mockActivity = [
  { id: "1", type: "comment", user: "JD", content: "Started working on this", time: "2h ago" },
  { id: "2", type: "status", user: "System", content: "Status changed to Active", time: "3h ago" },
  { id: "3", type: "created", user: "SM", content: "Created this card", time: "1d ago" }
];

export function CardDetailPanel({ open, onOpenChange, card }: CardDetailPanelProps) {
  const [comment, setComment] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
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
      const { error } = await supabase
        .from('cards')
        .update({ status: 'cancelled' })
        .eq('id', card.id);
      if (error) throw error;
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
      const updates: any = { status: newStatus };
      if (newStatus === 'completed') {
        updates.completed_at = new Date().toISOString();
      }
      const { error } = await supabase
        .from('cards')
        .update(updates)
        .eq('id', card.id);
      if (error) throw error;
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
      const { error } = await supabase
        .from('cards')
        .update({ priority: newPriority })
        .eq('id', card.id);
      if (error) throw error;
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
      const { error } = await supabase
        .from('cards')
        .update({ assigned_to: userId })
        .eq('id', card.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
      toast({ title: 'Assignment updated successfully' });
    },
    onError: (error: any) => {
      toast({ title: 'Failed to update assignment', description: error.message, variant: 'destructive' });
    },
  });

  const handleAddComment = () => {
    if (!comment.trim()) return;
    console.log("Adding comment:", comment);
    setComment("");
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

              {/* Attachments */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Paperclip className="h-4 w-4" />
                  Attachments
                  <span className="text-xs text-muted-foreground font-normal">(0)</span>
                </h3>
                <Button variant="outline" size="sm" className="w-full">
                  Add Attachment
                </Button>
              </div>

              <Separator />

              {/* Activity Timeline */}
              <div>
                <h3 className="font-semibold mb-3">Activity</h3>
                <div className="space-y-4">
                  {mockActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {activity.user.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{activity.user}</span>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                className="min-h-[80px]"
              />
              <Button onClick={handleAddComment} size="icon" className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
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