import { useNavigate, useLocation } from "react-router-dom";
import { Activity, FolderKanban, FileText, ScrollText, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Activity, label: "Activity", path: "/portal/stream" },
  { icon: FolderKanban, label: "Projects", path: "/portal/projects" },
  { icon: Plus, label: "New", path: "/portal/new-request", isAction: true },
  { icon: FileText, label: "Invoices", path: "/portal/invoices" },
  { icon: ScrollText, label: "Contracts", path: "/portal/contracts" },
];

export function MobilePortalNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          
          if (item.isAction) {
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 touch-manipulation"
              >
                <div className="h-10 w-10 rounded-full bg-acc-violet flex items-center justify-center -mt-4 shadow-lg shadow-acc-violet/30">
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </button>
            );
          }
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors touch-manipulation",
                isActive 
                  ? "text-acc-violet" 
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
