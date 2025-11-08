import { ReactNode } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    direction: "up" | "down";
  };
  color?: "red" | "green" | "blue" | "cyan" | "pink" | "purple";
  icon?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const colorClasses = {
  red: "bg-gradient-to-r from-red-500/20 via-red-500/10 to-transparent",
  green: "bg-gradient-to-r from-green-500/20 via-green-500/10 to-transparent",
  blue: "bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-transparent",
  cyan: "bg-gradient-to-r from-cyan-500/20 via-cyan-500/10 to-transparent",
  pink: "bg-gradient-to-r from-pink-500/20 via-pink-500/10 to-transparent",
  purple: "bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-transparent",
};

const barColors = {
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  cyan: "bg-cyan-500",
  pink: "bg-pink-500",
  purple: "bg-purple-500",
};

export function MetricCard({
  label,
  value,
  change,
  color = "blue",
  icon,
  className,
  size = "md",
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "bg-card/40 backdrop-blur-xl",
        "border border-white/10 rounded-2xl",
        "shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
        "hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
        "hover:bg-card/50",
        "transition-all duration-300 ease-out",
        "group",
        size === "sm" && "p-4",
        size === "md" && "p-6",
        size === "lg" && "p-8",
        className
      )}
    >
      {/* Colored gradient overlay */}
      <div className={cn("absolute inset-0 opacity-50", colorClasses[color])} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
            {label}
          </p>
          {icon && (
            <div className="text-muted-foreground/60">
              {icon}
            </div>
          )}
        </div>
        
        <h2
          className={cn(
            "font-bold mb-3",
            size === "sm" && "text-2xl",
            size === "md" && "text-4xl md:text-5xl",
            size === "lg" && "text-5xl md:text-6xl"
          )}
        >
          {value}
        </h2>
        
        {change && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {change.direction === "up" ? (
                <ArrowUp className="w-4 h-4 text-green-400" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-400" />
              )}
              <span
                className={cn(
                  "text-sm font-semibold",
                  change.direction === "up" ? "text-green-400" : "text-red-400"
                )}
              >
                {change.value}%
              </span>
            </div>
            
            {/* Colored underline */}
            <div className={cn("h-1 flex-1 rounded-full", barColors[color])} />
          </div>
        )}
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
