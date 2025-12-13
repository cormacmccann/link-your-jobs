import { useNavigate, useLocation } from "react-router-dom";
import { Activity, CalendarDays, Users, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Activity, label: "Stream", path: "/crm/stream" },
  { icon: CalendarDays, label: "Today", path: "/crm/today" },
  { icon: Users, label: "People", path: "/crm/people" },
  { icon: Rocket, label: "Control", path: "/crm/mission-control" },
];

export function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors touch-manipulation",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground active:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "scale-110")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
