import { ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onClick: () => void;
  icon?: ReactNode;
  label?: string;
  className?: string;
}

export function FloatingActionButton({ 
  onClick, 
  icon = <Plus className="h-6 w-6" />, 
  label,
  className 
}: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "h-14 rounded-full",
        "bg-gradient-to-r from-pink-500 to-orange-500",
        "hover:from-pink-600 hover:to-orange-600",
        "text-white font-semibold",
        "shadow-[0_8px_32px_rgba(340,75%,60%,0.4)]",
        "hover:shadow-[0_12px_48px_rgba(340,75%,60%,0.6)]",
        "backdrop-blur-sm",
        "transition-all duration-300 ease-out",
        "hover:scale-105 active:scale-95",
        "focus:outline-none focus:ring-4 focus:ring-pink-500/50",
        "touch-manipulation",
        label ? "px-6 flex items-center gap-2" : "w-14 flex items-center justify-center",
        className
      )}
      aria-label={label || "Add new item"}
    >
      {icon}
      {label && <span className="hidden sm:inline">{label}</span>}
    </button>
  );
}

interface FABGroupProps {
  items: Array<{
    icon: ReactNode;
    label: string;
    onClick: () => void;
  }>;
}

export function FABGroup({ items }: FABGroupProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-3 animate-fade-in">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className={cn(
            "h-12 rounded-full",
            "bg-gradient-to-r from-pink-500 to-orange-500",
            "hover:from-pink-600 hover:to-orange-600",
            "text-white font-semibold text-sm",
            "shadow-[0_8px_32px_rgba(340,75%,60%,0.4)]",
            "hover:shadow-[0_12px_48px_rgba(340,75%,60%,0.6)]",
            "backdrop-blur-sm",
            "px-5 flex items-center gap-2",
            "transition-all duration-300 ease-out",
            "hover:scale-105 active:scale-95",
            "focus:outline-none focus:ring-4 focus:ring-pink-500/50",
            "touch-manipulation"
          )}
          style={{
            animationDelay: `${index * 50}ms`,
          }}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}