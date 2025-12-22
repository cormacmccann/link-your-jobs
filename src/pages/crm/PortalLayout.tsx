import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { CommandPalette } from "@/components/CommandPalette";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { Activity, FolderKanban, FileText, ScrollText, Settings, LogOut, HelpCircle, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobilePortalNav } from "@/components/portal/MobilePortalNav";
import kamrokLogo from "@/assets/kamrok-logo.png";

const navItems = [
  { to: "/portal/stream", label: "Activity", icon: Activity },
  { to: "/portal/projects", label: "Projects", icon: FolderKanban },
  { to: "/portal/invoices", label: "Invoices", icon: FileText },
  { to: "/portal/contracts", label: "Contracts", icon: ScrollText },
];

export default function PortalLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CommandPalette />
      
      {/* Top Navigation Bar - matches homepage style */}
      <header className="h-16 border-b border-border/50 bg-background/95 backdrop-blur-md sticky top-0 z-50">
        <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/portal/stream" className="flex items-center gap-2">
            <img src={kamrokLogo} alt="KAMROK" className="h-9" />
          </Link>

          {/* Center Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    isActive(item.to)
                      ? "bg-acc-violet text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: New Request + Profile */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => navigate("/portal/new-request")}
              className="hidden sm:flex items-center gap-2 bg-acc-violet hover:bg-acc-violet/90 text-white rounded-full px-5"
            >
              <Plus className="h-4 w-4" />
              <span>New Request</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-9 w-9 border-2 border-border">
                    <AvatarFallback className="bg-acc-violet/10 text-acc-violet text-sm font-semibold">U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onClick={() => navigate("/portal/new-request")} className="sm:hidden">
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/portal/settings")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/help")}>
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help Center
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <MobilePortalNav />
    </div>
  );
}
