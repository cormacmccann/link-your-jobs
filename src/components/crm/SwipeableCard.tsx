import { useSwipeable } from "react-swipeable";
import { useState } from "react";
import { UnifiedCard } from "./UnifiedCard";
import { Archive, CheckCircle2, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SwipeableCardProps {
  id: string;
  cardType: "project" | "deal" | "task" | "support" | "milestone" | "note";
  title: string;
  description?: string;
  status: "active" | "completed" | "cancelled";
  priority?: "urgent" | "high" | "normal" | "low";
  assignedTo?: string;
  dueDate?: string;
  relatedContact?: string;
  onClick?: () => void;
  onArchive?: () => void;
  onComplete?: () => void;
  onAssignToMe?: () => void;
  className?: string;
}

export function SwipeableCard(props: SwipeableCardProps) {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      const offset = eventData.deltaX;
      // Limit swipe to 120px in either direction
      const clampedOffset = Math.max(-120, Math.min(120, offset));
      setSwipeOffset(clampedOffset);
      setSwipeDirection(offset < 0 ? "left" : "right");
    },
    onSwiped: (eventData) => {
      const threshold = 80;
      
      if (eventData.deltaX < -threshold) {
        // Swiped left - Archive or Complete
        if (props.status !== "completed") {
          props.onComplete?.();
        } else {
          props.onArchive?.();
        }
      } else if (eventData.deltaX > threshold) {
        // Swiped right - Assign to me
        props.onAssignToMe?.();
      }
      
      // Reset swipe
      setTimeout(() => {
        setSwipeOffset(0);
        setSwipeDirection(null);
      }, 200);
    },
    trackMouse: false,
    trackTouch: true,
    preventScrollOnSwipe: false,
  });

  const showLeftActions = swipeOffset < -20;
  const showRightActions = swipeOffset > 20;

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Left actions (Archive/Complete) */}
      {showLeftActions && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center gap-2 pr-4 z-0">
          {props.status !== "completed" ? (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-medium">Complete</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-orange-600">
              <Archive className="h-5 w-5" />
              <span className="text-sm font-medium">Archive</span>
            </div>
          )}
        </div>
      )}

      {/* Right actions (Assign to Me) */}
      {showRightActions && (
        <div className="absolute left-0 top-0 bottom-0 flex items-center gap-2 pl-4 z-0">
          <div className="flex items-center gap-1 text-blue-600">
            <UserPlus className="h-5 w-5" />
            <span className="text-sm font-medium">Assign to Me</span>
          </div>
        </div>
      )}

      {/* Card */}
      <div
        {...handlers}
        className="relative z-10 transition-transform"
        style={{
          transform: `translateX(${swipeOffset}px)`,
        }}
      >
        <UnifiedCard
          {...props}
          className={cn(props.className, "select-none")}
        />
      </div>
    </div>
  );
}
