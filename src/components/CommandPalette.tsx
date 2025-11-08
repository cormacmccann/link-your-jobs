import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Zap,
  Users,
  MessageSquare,
  Handshake,
  FileText,
  Calendar,
  Workflow,
  TrendingUp,
  Package,
  Settings,
  Building,
  ListTodo,
  LayoutDashboard,
} from "lucide-react";

interface Command {
  label: string;
  path: string;
  icon: React.ReactNode;
  keywords?: string[];
}

const commands: Command[] = [
  // CRM
  { label: "Today", path: "/crm/today", icon: <Zap className="w-4 h-4" />, keywords: ["queue", "dashboard"] },
  { label: "Contacts", path: "/crm/contacts", icon: <Users className="w-4 h-4" />, keywords: ["people"] },
  { label: "Companies", path: "/crm/companies", icon: <Building className="w-4 h-4" />, keywords: ["organizations"] },
  { label: "Conversations", path: "/crm/conversations", icon: <MessageSquare className="w-4 h-4" />, keywords: ["inbox", "chat", "messages"] },
  { label: "Deals", path: "/crm/deals", icon: <Handshake className="w-4 h-4" />, keywords: ["pipeline", "sales"] },
  { label: "Invoices", path: "/crm/invoices", icon: <FileText className="w-4 h-4" />, keywords: ["quotes", "billing"] },
  { label: "Calendar", path: "/crm/calendar", icon: <Calendar className="w-4 h-4" />, keywords: ["bookings", "schedule"] },
  { label: "Tasks", path: "/crm/tasks", icon: <ListTodo className="w-4 h-4" />, keywords: ["todos"] },
  
  // Main Navigation
  { label: "Automations", path: "/crm/automations", icon: <Workflow className="w-4 h-4" />, keywords: ["workflows", "triggers"] },
  { label: "Insights", path: "/crm/insights", icon: <TrendingUp className="w-4 h-4" />, keywords: ["analytics", "reports"] },
  { label: "Extras", path: "/crm/extras", icon: <Package className="w-4 h-4" />, keywords: ["tools", "utilities"] },
  { label: "Settings", path: "/crm/settings", icon: <Settings className="w-4 h-4" />, keywords: ["preferences", "config"] },
  
  // Old routes (for backwards compatibility)
  { label: "Stream", path: "/crm/stream", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Dashboard", path: "/crm/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Projects", path: "/crm/projects", icon: <LayoutDashboard className="w-4 h-4" /> },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {commands.map((command) => (
            <CommandItem
              key={command.path}
              value={`${command.label} ${command.keywords?.join(" ") || ""}`}
              onSelect={() => handleSelect(command.path)}
            >
              {command.icon}
              <span className="ml-2">{command.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
