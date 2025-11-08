import { useState } from "react";
import { 
  FolderKanban, DollarSign, ListTodo, LifeBuoy, Flag, StickyNote,
  Calendar, User, Building2, Mail, MessageSquare, Paperclip, ChevronDown, ChevronUp
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type CardType = "project" | "deal" | "task" | "support" | "milestone" | "note";
type CardStatus = "active" | "completed" | "archived" | "cancelled";
type CardPriority = "urgent" | "high" | "normal" | "low";

interface UnifiedCardProps {
  id: string;
  cardType: CardType;
  title: string;
  description?: string;
  status: CardStatus;
  priority: CardPriority;
  assignedTo?: { id: string; name: string };
  company?: { id: string; name: string };
  contact?: { id: string; name: string };
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
  onComplete?: () => void;
  onArchive?: () => void;
  onClick?: () => void;
}

const cardTypeConfig = {
  project: {
    icon: FolderKanban,
    label: "Project",
    badge: "bg-blue-500/10 text-blue-600 border-blue-500/20"
  },
  deal: {
    icon: DollarSign,
    label: "Deal",
    badge: "bg-green-500/10 text-green-600 border-green-500/20"
  },
  task: {
    icon: ListTodo,
    label: "Task",
    badge: "bg-purple-500/10 text-purple-600 border-purple-500/20"
  },
  support: {
    icon: LifeBuoy,
    label: "Support",
    badge: "bg-orange-500/10 text-orange-600 border-orange-500/20"
  },
  milestone: {
    icon: Flag,
    label: "Milestone",
    badge: "bg-pink-500/10 text-pink-600 border-pink-500/20"
  },
  note: {
    icon: StickyNote,
    label: "Note",
    badge: "bg-gray-500/10 text-gray-600 border-gray-500/20"
  }
};

const priorityConfig = {
  urgent: { label: "Urgent", className: "border-red-500 text-red-400" },
  high: { label: "High", className: "border-orange-500 text-orange-400" },
  normal: { label: "Normal", className: "border-blue-500 text-blue-400" },
  low: { label: "Low", className: "border-gray-500 text-gray-400" }
};

const statusConfig = {
  active: "border-l-green-500",
  completed: "border-l-gray-500 opacity-60",
  archived: "border-l-gray-400 opacity-40",
  cancelled: "border-l-red-500 opacity-50"
};

export function UnifiedCard({
  cardType,
  title,
  description,
  status,
  priority,
  assignedTo,
  company,
  contact,
  dueDate,
  createdAt,
  updatedAt,
  metadata,
  onComplete,
  onArchive,
  onClick
}: UnifiedCardProps) {
  const [expanded, setExpanded] = useState(false);
  const typeInfo = cardTypeConfig[cardType];
  const Icon = typeInfo.icon;

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative overflow-hidden",
        "bg-card/50 backdrop-blur-xl",
        "border border-white/10 rounded-xl",
        "shadow-[0_4px_24px_-1px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.1)]",
        "hover:shadow-[0_8px_32px_-1px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.15)]",
        "hover:bg-card/60",
        "transition-all duration-300 ease-out",
        "cursor-pointer group",
        "p-4 mb-3 border-l-4",
        statusConfig[status]
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Header with type and priority */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="gradient" className={cn("text-xs", cardTypeConfig[cardType].badge)}>
              <Icon className="h-3 w-3 mr-1" />
              {cardTypeConfig[cardType].label}
            </Badge>
            
            {priority !== "normal" && (
              <Badge variant="outline" className={cn("text-xs", priorityConfig[priority].className)}>
                {priorityConfig[priority].label}
              </Badge>
            )}
          </div>
          {dueDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {format(dueDate, "MMM d")}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-semibold text-base mb-2",
          status === "completed" && "line-through"
        )}>
          {title}
        </h3>

        {/* Description (if exists and expanded) */}
        {description && (
          <p className={cn(
            "text-sm text-muted-foreground mb-3",
            !expanded && "line-clamp-2"
          )}>
            {description}
          </p>
        )}

        {/* Metadata Row */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap mb-3">
          {assignedTo && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {assignedTo.name}
            </div>
          )}
          {company && (
            <div className="flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              {company.name}
            </div>
          )}
          {contact && (
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {contact.name}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {metadata?.comments && (
              <div className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                {metadata.comments}
              </div>
            )}
            {metadata?.attachments && (
              <div className="flex items-center gap-1">
                <Paperclip className="w-3 h-3" />
                {metadata.attachments}
              </div>
            )}
            <span>Updated {format(updatedAt, "h:mma")}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="h-6 px-2"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}