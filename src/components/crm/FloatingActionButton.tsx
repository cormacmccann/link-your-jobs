import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Briefcase, Target, CheckCircle2, AlertCircle, X } from "lucide-react";

type CardType = "project" | "deal" | "task" | "support";

interface FloatingActionButtonProps {
  onCreateCard: (type: CardType) => void;
}

const cardTypeOptions = [
  { type: "project" as const, icon: Briefcase, label: "Project", color: "bg-blue-500" },
  { type: "deal" as const, icon: Target, label: "Deal", color: "bg-green-500" },
  { type: "task" as const, icon: CheckCircle2, label: "Task", color: "bg-purple-500" },
  { type: "support" as const, icon: AlertCircle, label: "Support", color: "bg-red-500" }
];

export function FloatingActionButton({ onCreateCard }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateCard = (type: CardType) => {
    onCreateCard(type);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Radial Menu Items */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 -z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Items */}
          {cardTypeOptions.map((option, index) => {
            const Icon = option.icon;
            const angle = (index * 90) - 135; // Spread from top-left to top
            const radius = 80;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            
            return (
              <div
                key={option.type}
                className="absolute"
                style={{
                  bottom: `${-y + 56}px`,
                  right: `${-x + 56}px`,
                  animation: `fadeIn 0.2s ease-out ${index * 0.05}s both`
                }}
              >
                <Button
                  onClick={() => handleCreateCard(option.type)}
                  size="lg"
                  className={cn(
                    "h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all",
                    option.color
                  )}
                  title={option.label}
                >
                  <Icon className="h-5 w-5" />
                </Button>
              </div>
            );
          })}
        </>
      )}

      {/* Main FAB */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all relative z-10",
          isOpen && "rotate-45"
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </Button>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

// ... keep existing code (FABGroup component)

// Legacy FAB component for backward compatibility
interface LegacyFABProps {
  onClick: () => void;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
}

export function LegacyFAB({ 
  onClick, 
  icon = <Plus className="h-6 w-6" />, 
  label,
  className 
}: LegacyFABProps) {
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
    icon: React.ReactNode;
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