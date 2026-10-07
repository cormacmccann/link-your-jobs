import { useId, type CSSProperties } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";

type ActionFeedbackProps = {
  icon: LucideIcon;
  direction?: "up-right" | "right" | "down" | "left";
  size?: number;
};

/** Decorative feedback; the surrounding link or button owns its accessible name. */
export default function ActionFeedback({ icon: Icon, direction = "up-right", size = 18 }: ActionFeedbackProps) {
  const gradientId = `action-light-${useId().replace(/:/g, "")}`;
  const Arrow = { "up-right": ArrowUpRight, right: ArrowRight, down: ArrowDown, left: ArrowLeft }[direction];

  return (
    <>
      <span className={`action-icon action-icon--${direction}`} style={{ "--action-icon-size": `${size}px` } as CSSProperties} aria-hidden="true">
        <Icon className="action-icon-rest" size={size} strokeWidth={1.6} />
        <Arrow className="action-icon-arrow" size={size} strokeWidth={1.6} />
      </span>
      <svg className="action-border" aria-hidden="true" focusable="false">
        <defs><linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" className="action-border-ruby" />
          <stop offset="48%" className="action-border-cream" />
          <stop offset="100%" className="action-border-mint" />
        </linearGradient></defs>
        <rect x="1" y="1" rx="3" pathLength="100" fill="none" stroke={`url(#${gradientId})`} strokeWidth="1" />
      </svg>
    </>
  );
}
