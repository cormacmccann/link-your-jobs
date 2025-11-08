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
        "h-14 rounded-full shadow-2xl",
        "bg-gradient-to-r from-pink-500 to-purple-600",
        "hover:from-pink-600 hover:to-purple-700",
        "text-white font-medium",
        "transition-all duration-300 ease-out",
        "hover:scale-110 active:scale-95",
        "focus:outline-none focus:ring-4 focus:ring-pink-500/50",
        "touch-manipulation",
        "animate-scale-in",
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
            "h-12 rounded-full shadow-xl",
            "bg-gradient-to-r from-pink-500 to-purple-600",
            "hover:from-pink-600 hover:to-purple-700",
            "text-white font-medium text-sm",
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