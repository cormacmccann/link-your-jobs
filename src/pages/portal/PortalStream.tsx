import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, isToday, isYesterday, isThisWeek, parseISO } from "date-fns";
import { 
  FileText, 
  ScrollText, 
  FolderKanban, 
  MessageSquare, 
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

interface ActivityItem {
  id: string;
  type: 'project' | 'invoice' | 'contract' | 'message';
  title: string;
  description: string;
  status?: string;
  amount?: number;
  created_at: string;
  entity_id: string;
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'project': return FolderKanban;
    case 'invoice': return FileText;
    case 'contract': return ScrollText;
    case 'message': return MessageSquare;
    default: return Clock;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
    case 'paid':
    case 'signed':
      return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Completed</Badge>;
    case 'in_progress':
    case 'sent':
    case 'viewed':
      return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">In Progress</Badge>;
    case 'pending':
    case 'draft':
      return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>;
    case 'overdue':
      return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Action Required</Badge>;
    default:
      return null;
  }
};

const formatDateGroup = (date: Date): string => {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  if (isThisWeek(date)) return "This Week";
  return format(date, "MMMM d, yyyy");
};

export default function PortalStream() {
  const navigate = useNavigate();

  // Fetch combined activity from projects, invoices, contracts
  const { data: activities, isLoading } = useQuery({
    queryKey: ["portal-stream"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get user's organization from user_roles
      const { data: userRole } = await supabase
        .from("user_roles")
        .select("organization_id")
        .eq("user_id", user.id)
        .single();

      if (!userRole?.organization_id) return [];

      // Fetch cards (projects/tasks)
      const { data: cards } = await supabase
        .from("cards")
        .select("id, title, description, status, card_type, created_at, updated_at")
        .eq("organization_id", userRole.organization_id)
        .in("card_type", ["project", "task"])
        .order("updated_at", { ascending: false })
        .limit(10);

      // Fetch invoices
      const { data: invoices } = await supabase
        .from("invoices")
        .select("id, invoice_number, total_amount, status, created_at, updated_at")
        .eq("organization_id", userRole.organization_id)
        .order("updated_at", { ascending: false })
        .limit(10);

      // Fetch contracts
      const { data: contracts } = await supabase
        .from("contracts")
        .select("id, title, status, created_at, updated_at")
        .eq("organization_id", userRole.organization_id)
        .order("updated_at", { ascending: false })
        .limit(10);

      // Combine and sort
      const combined: ActivityItem[] = [
        ...(cards || []).map(c => ({
          id: c.id,
          type: 'project' as const,
          title: c.title,
          description: c.description || 'Project update',
          status: c.status,
          created_at: c.updated_at || c.created_at,
          entity_id: c.id
        })),
        ...(invoices || []).map(i => ({
          id: i.id,
          type: 'invoice' as const,
          title: `Invoice ${i.invoice_number}`,
          description: `€${i.total_amount?.toLocaleString() || 0}`,
          status: i.status,
          amount: i.total_amount,
          created_at: i.updated_at || i.created_at,
          entity_id: i.id
        })),
        ...(contracts || []).map(c => ({
          id: c.id,
          type: 'contract' as const,
          title: c.title,
          description: 'Contract document',
          status: c.status,
          created_at: c.updated_at || c.created_at,
          entity_id: c.id
        })),
      ];

      return combined.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  });

  // Group activities by date
  const groupedActivities = activities?.reduce((groups, activity) => {
    const date = parseISO(activity.created_at);
    const groupKey = formatDateGroup(date);
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(activity);
    return groups;
  }, {} as Record<string, ActivityItem[]>);

  const handleActivityClick = (activity: ActivityItem) => {
    switch (activity.type) {
      case 'project':
        navigate(`/portal/projects/${activity.entity_id}`);
        break;
      case 'invoice':
        navigate(`/portal/invoices/${activity.entity_id}`);
        break;
      case 'contract':
        navigate(`/portal/contracts/${activity.entity_id}`);
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  const isEmpty = !activities || activities.length === 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Activity Stream</h1>
        <p className="text-muted-foreground mt-1">
          All your project updates, invoices, and contracts in one place
        </p>
      </div>

      {isEmpty ? (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-acc-violet/10 flex items-center justify-center mb-4">
              <FolderKanban className="h-8 w-8 text-acc-violet" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No activity yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Start a new project request and your activity will appear here
            </p>
            <Button 
              onClick={() => navigate("/portal/new-request")}
              className="bg-acc-violet hover:bg-acc-violet/90"
            >
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedActivities || {}).map(([dateGroup, items]) => (
            <div key={dateGroup}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 sticky top-20 bg-background py-2">
                {dateGroup}
              </h3>
              <div className="space-y-3">
                {items.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <Card 
                      key={activity.id} 
                      className="hover:border-acc-violet/50 transition-colors cursor-pointer group"
                      onClick={() => handleActivityClick(activity)}
                    >
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className={`
                          h-10 w-10 rounded-full flex items-center justify-center shrink-0
                          ${activity.type === 'project' ? 'bg-blue-500/10 text-blue-500' : ''}
                          ${activity.type === 'invoice' ? 'bg-green-500/10 text-green-500' : ''}
                          ${activity.type === 'contract' ? 'bg-purple-500/10 text-purple-500' : ''}
                          ${activity.type === 'message' ? 'bg-orange-500/10 text-orange-500' : ''}
                        `}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-medium text-foreground group-hover:text-acc-violet transition-colors">
                                {activity.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {activity.description}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-1 shrink-0">
                              {activity.status && getStatusBadge(activity.status)}
                              <span className="text-xs text-muted-foreground">
                                {format(parseISO(activity.created_at), "h:mm a")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 self-center" />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
