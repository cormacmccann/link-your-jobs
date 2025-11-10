import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { CommandPalette } from "@/components/CommandPalette";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LimelightNav } from "@/components/ui/limelight-nav";
import { supabase } from "@/integrations/supabase/client";
import { Activity, Calendar, Users, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CRMLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const navLinks = [
    { to: "/crm/stream", label: "Stream", icon: <Activity />, color: "hsl(180, 70%, 50%)" }, // Cyan
    { to: "/crm/today", label: "Today", icon: <Calendar />, color: "hsl(280, 70%, 60%)" }, // Purple
    { to: "/crm/contacts", label: "Contacts", icon: <Users />, color: "hsl(330, 70%, 60%)" }, // Pink
    { to: "/crm/deals", label: "Deals", icon: <Target />, color: "hsl(45, 90%, 55%)" }, // Orange/Gold
  ];

  const navItems = navLinks.map(link => ({
    id: link.to,
    icon: link.icon,
    label: link.label,
    color: link.color,
    onClick: () => navigate(link.to)
  }));

  const activeIndex = navLinks.findIndex(link => location.pathname === link.to);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CommandPalette />
      
      {/* Top Navigation Bar */}
      <header className="h-14 border-b border-border bg-background sticky top-0 z-50">
        <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/crm/stream" className="flex items-center gap-2">
            <h1 className="text-lg font-gobold uppercase tracking-tight">KAMROK</h1>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex">
            <LimelightNav 
              items={navItems}
              defaultActiveIndex={Math.max(0, activeIndex)}
              className="bg-background"
            />
          </div>

          {/* Right: Search + Profile */}
          <div className="flex items-center gap-3">
            <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/crm/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
