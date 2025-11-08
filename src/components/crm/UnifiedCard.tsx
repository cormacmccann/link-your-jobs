import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  MessageSquare, 
  Briefcase, 
  Target,
  AlertCircle,
  FileText,
  Milestone
} from "lucide-react";
import { cn } from "@/lib/utils";

type CardType = "project" | "deal" | "task" | "support" | "milestone" | "note";
type Priority = "urgent" | "high" | "normal" | "low";
type Status = "active" | "completed" | "archived" | "cancelled";

interface UnifiedCardProps {
  id: string;
  cardType: CardType;
  title: string;
  description?: string;
  status: Status;
  priority?: Priority;
  assignedTo?: string;
  dueDate?: string;
  relatedContact?: string;
  onClick?: () => void;
  className?: string;
}

const cardStyles: Record<CardType, { badge: string; icon: any; color: string }> = {
  project: { badge: "bg-blue-500", icon: Briefcase, color: "text-blue-500" },
  deal: { badge: "bg-green-500", icon: Target, color: "text-green-500" },
  task: { badge: "bg-purple-500", icon: CheckCircle2, color: "text-purple-500" },
  support: { badge: "bg-red-500", icon: AlertCircle, color: "text-red-500" },
  milestone: { badge: "bg-yellow-500", icon: Milestone, color: "text-yellow-500" },
  note: { badge: "bg-gray-500", icon: FileText, color: "text-gray-500" }
};

const priorityStyles: Record<Priority, string> = {
  urgent: "bg-red-100 text-red-800 border-red-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  normal: "bg-blue-100 text-blue-800 border-blue-200",
  low: "bg-gray-100 text-gray-800 border-gray-200"
};

const statusIcons: Record<Status, any> = {
  active: Circle,
  completed: CheckCircle2,
  archived: FileText,
  cancelled: AlertCircle
};

export function UnifiedCard({
  cardType,
  title,
  description,
  status,
  priority = "normal",
  assignedTo,
  dueDate,
  relatedContact,
  onClick,
  className
}: UnifiedCardProps) {
  const style = cardStyles[cardType];
  const Icon = style.icon;
  const StatusIcon = statusIcons[status];

  return (
    <Card 
      className={cn("p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 touch-manipulation", className)}
      style={{ borderLeftColor: style.badge.replace('bg-', '#') }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left: Icon + Content */}
        <div className="flex gap-3 flex-1 min-w-0">
          <div className={cn("mt-1", style.color)}>
            <Icon className="h-5 w-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-base truncate">{title}</h3>
              <Badge variant="outline" className="text-xs capitalize">
                {cardType}
              </Badge>
            </div>
            
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {description}
              </p>
            )}
            
            {/* Metadata Row */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
              {relatedContact && (
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {relatedContact}
                </span>
              )}
              
              {dueDate && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {dueDate}
                </span>
              )}
              
              {assignedTo && (
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-[10px]">
                    {assignedTo.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </div>
        
        {/* Right: Priority + Status */}
        <div className="flex flex-col items-end gap-2">
          {priority && (
            <Badge variant="outline" className={cn("text-xs", priorityStyles[priority])}>
              {priority}
            </Badge>
          )}
          <StatusIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
}
