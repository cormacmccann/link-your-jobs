import { Zap, Users, MessageSquare, Handshake, FileText, Calendar, Workflow, TrendingUp, Package, Settings, Building2, ChevronDown, Shield, UserPlus, Globe } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import kamrokLogo from "@/assets/kamrok-logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const crmItems = [
  { title: "Today", url: "/crm/today", icon: Zap },
  { title: "Contacts", url: "/crm/contacts", icon: Users },
  { title: "Conversations", url: "/crm/conversations", icon: MessageSquare },
  { title: "Deals", url: "/crm/deals", icon: Handshake },
  { title: "Invoices", url: "/crm/invoices", icon: FileText },
  { title: "Calendar", url: "/crm/calendar", icon: Calendar },
];

const mainNav = [
  { title: "CRM", icon: Building2, items: crmItems },
  { title: "Projects", url: "/crm/projects", icon: Package },
  { title: "Automations", url: "/crm/automations", icon: Workflow },
  { title: "Insights", url: "/crm/insights", icon: TrendingUp },
  { title: "Mission Control", url: "/crm/mission-control", icon: Zap },
  { title: "Client Portals", url: "/crm/client-portals", icon: Globe },
  { title: "Team", url: "/crm/team", icon: UserPlus },
  { title: "Super Admin", url: "/crm/super-admin", icon: Shield },
  { title: "Extras", url: "/crm/extras", icon: Package },
  { title: "Settings", url: "/crm/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";
  const [currentOrgId, setCurrentOrgId] = useState<string | null>(
    localStorage.getItem("currentOrgId")
  );

  // Fetch user's organizations
  const { data: organizations } = useQuery({
    queryKey: ["user-organizations"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase.rpc("get_user_organizations", {
        _user_id: user.id,
      });

      if (error) throw error;
      
      // Ensure data is an array
      const safeData = Array.isArray(data) ? data : [];
      
      // Dev mode warning
      if (process.env.NODE_ENV === 'development' && !Array.isArray(data)) {
        console.warn('Expected organizations to be an array but got:', typeof data, data);
      }
      
      // Set first org as current if none selected
      if (safeData.length > 0 && !currentOrgId) {
        setCurrentOrgId(safeData[0].id);
        localStorage.setItem("currentOrgId", safeData[0].id);
      }
      
      return safeData;
    },
  });

  // Fetch current user profile
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Safe array operations
  const safeOrganizations = Array.isArray(organizations) ? organizations : [];
  const currentOrg = safeOrganizations.find((org: any) => org.id === currentOrgId);

  const handleOrgSwitch = (orgId: string) => {
    setCurrentOrgId(orgId);
    localStorage.setItem("currentOrgId", orgId);
    window.location.reload(); // Refresh to load new org data
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <img src={kamrokLogo} alt="KAMROK" className="h-8" />
          </div>
        )}
        {isCollapsed && (
          <img src={kamrokLogo} alt="KAMROK" className="h-8 mx-auto" />
        )}
      </SidebarHeader>

      <SidebarContent>
        {/* Workspace Switcher - Only show if user has access to multiple workspaces */}
        {safeOrganizations.length > 1 && (
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between h-auto py-2 px-3"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Building2 className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="truncate text-sm">
                          {currentOrg?.name || "Select workspace"}
                        </span>
                      )}
                    </div>
                    {!isCollapsed && <ChevronDown className="h-4 w-4 flex-shrink-0" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {safeOrganizations.map((org: any) => (
                    <DropdownMenuItem
                      key={org.id}
                      onClick={() => handleOrgSwitch(org.id)}
                      className="flex items-center gap-2"
                    >
                      <Building2 className="h-4 w-4" />
                      <div className="flex flex-col">
                        <span>{org.name}</span>
                        <span className="text-xs text-muted-foreground">{org.role}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((section) => (
                <div key={section.title}>
                  {section.items ? (
                    <Collapsible defaultOpen>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="hover:bg-sidebar-accent">
                            <section.icon className="h-4 w-4" />
                            {!isCollapsed && <span>{section.title}</span>}
                            {!isCollapsed && <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenu className="ml-4 mt-1">
                            {section.items.map((item) => (
                              <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                  <NavLink
                                    to={item.url}
                                    className="flex items-center gap-3 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors text-sm"
                                    activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                  >
                                    <item.icon className="h-3 w-3" />
                                    {!isCollapsed && <span>{item.title}</span>}
                                  </NavLink>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={section.url!}
                          className="flex items-center gap-3 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                          activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        >
                          <section.icon className="h-4 w-4" />
                          {!isCollapsed && <span>{section.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start h-auto p-2">
              <div className="flex items-center gap-2 min-w-0">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-pink-500 text-white text-xs">
                    {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex flex-col items-start min-w-0">
                    <span className="text-sm font-medium truncate w-full">
                      {profile?.full_name || profile?.email}
                    </span>
                    <span className="text-xs text-muted-foreground truncate w-full">
                      {currentOrg?.role}
                    </span>
                  </div>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => (window.location.href = "/crm/mission-control")}>
              <Zap className="h-4 w-4 mr-2" />
              Mission Control
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => (window.location.href = "/crm/settings")}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
