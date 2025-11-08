import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Briefcase, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  MessageSquare,
  Paperclip,
  Send
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
    assignedTo?: string;
    dueDate?: string;
    relatedContact?: string;
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

  if (!card) return null;

  const style = cardStyles[card.cardType];
  const Icon = style.icon;

  const handleAddComment = () => {
    if (!comment.trim()) return;
    console.log("Adding comment:", comment);
    setComment("");
  };

  return (
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
                <Badge variant="outline" className="capitalize">
                  {card.status}
                </Badge>
                {card.priority && (
                  <Badge variant="outline" className="capitalize">
                    {card.priority}
                  </Badge>
                )}
              </div>
            </div>
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
              {card.assignedTo && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Assigned To</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {card.assignedTo.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{card.assignedTo}</span>
                  </div>
                </div>
              )}
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
  );
}
