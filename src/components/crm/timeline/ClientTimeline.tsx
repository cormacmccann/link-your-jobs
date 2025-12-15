import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Receipt, FileText, Calendar, Clock, MessageSquare, 
  Mail, CheckCircle2, AlertCircle, Eye, Send, 
  FileSignature, Briefcase, MoreHorizontal
} from "lucide-react";
import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface ClientTimelineProps {
  entityId: string;
  entityType: "contact" | "company";
  filter?: string;
}

const activityIcons: Record<string, any> = {
  invoice_created: Receipt,
  invoice_sent: Send,
  invoice_paid: CheckCircle2,
  invoice_updated: Receipt,
  quote_created: FileText,
  quote_sent: Send,
  quote_viewed: Eye,
  quote_accepted: CheckCircle2,
  quote_rejected: AlertCircle,
  quote_updated: FileText,
  contract_created: FileSignature,
  contract_sent: Send,
  contract_viewed: Eye,
  contract_signed: CheckCircle2,
  contract_updated: FileSignature,
  meeting_scheduled: Calendar,
  meeting_completed: CheckCircle2,
  meeting_cancelled: AlertCircle,
  meeting_updated: Calendar,
  time_logged: Clock,
  time_started: Clock,
  card_created: Briefcase,
  project_created: Briefcase,
  project_completed: CheckCircle2,
  project_updated: Briefcase,
  task_created: CheckCircle2,
  task_completed: CheckCircle2,
  task_updated: CheckCircle2,
  support_created: MessageSquare,
  support_completed: CheckCircle2,
  chat_message: MessageSquare,
  email_received: Mail,
  email_sent: Send,
};

const activityColors: Record<string, string> = {
  invoice_paid: "text-green-500 bg-green-500/10",
  quote_accepted: "text-green-500 bg-green-500/10",
  contract_signed: "text-green-500 bg-green-500/10",
  meeting_completed: "text-green-500 bg-green-500/10",
  project_completed: "text-green-500 bg-green-500/10",
  task_completed: "text-green-500 bg-green-500/10",
  quote_rejected: "text-red-500 bg-red-500/10",
  meeting_cancelled: "text-red-500 bg-red-500/10",
  invoice_sent: "text-blue-500 bg-blue-500/10",
  quote_sent: "text-blue-500 bg-blue-500/10",
  contract_sent: "text-blue-500 bg-blue-500/10",
  quote_viewed: "text-yellow-500 bg-yellow-500/10",
  contract_viewed: "text-yellow-500 bg-yellow-500/10",
};

function groupActivitiesByDate(activities: any[]) {
  const groups: { [key: string]: any[] } = {};
  
  activities.forEach(activity => {
    const date = parseISO(activity.created_at);
    let label: string;
    
    if (isToday(date)) {
      label = "Today";
    } else if (isYesterday(date)) {
      label = "Yesterday";
    } else {
      label = format(date, "MMMM d, yyyy");
    }
    
    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(activity);
  });
  
  return groups;
}

export function ClientTimeline({ entityId, entityType, filter }: ClientTimelineProps) {
  const filterColumn = entityType === "contact" ? "contact_id" : "company_id";

  const { data: activities, refetch } = useQuery({
    queryKey: ["activity-log", entityId, entityType, filter],
    queryFn: async () => {
      let query = supabase
        .from("activity_log")
        .select("*")
        .eq(filterColumn, entityId)
        .order("created_at", { ascending: false })
        .limit(100);

      if (filter) {
        query = query.eq("entity_type", filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!entityId,
  });

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel(`activity-${entityId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'activity_log',
          filter: `${filterColumn}=eq.${entityId}`,
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [entityId, filterColumn, refetch]);

  if (!activities?.length) {
    return (
      <Card className="p-8 text-center">
        <div className="text-muted-foreground">
          <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No activity yet</p>
          <p className="text-sm mt-1">Activities will appear here as you interact with this {entityType}</p>
        </div>
      </Card>
    );
  }

  const groupedActivities = groupActivitiesByDate(activities);

  return (
    <div className="space-y-6">
      {Object.entries(groupedActivities).map(([dateLabel, dateActivities]) => (
        <div key={dateLabel}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-medium text-muted-foreground">{dateLabel}</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          
          <div className="space-y-3">
            {dateActivities.map((activity) => {
              const Icon = activityIcons[activity.activity_type] || Briefcase;
              const colorClass = activityColors[activity.activity_type] || "text-muted-foreground bg-muted";
              const time = format(parseISO(activity.created_at), "HH:mm");
              
              return (
                <Card key={activity.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className={cn("p-2 rounded-lg", colorClass)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-sm">{activity.activity_title}</p>
                          {activity.activity_description && (
                            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                              {activity.activity_description}
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{time}</span>
                      </div>
                      
                      {/* Metadata badges */}
                      {activity.activity_metadata && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {activity.activity_metadata.amount && (
                            <Badge variant="outline" className="text-xs">
                              €{Number(activity.activity_metadata.amount).toLocaleString()}
                            </Badge>
                          )}
                          {activity.activity_metadata.status && (
                            <Badge variant="secondary" className="text-xs capitalize">
                              {activity.activity_metadata.status}
                            </Badge>
                          )}
                          {activity.activity_metadata.duration_minutes && (
                            <Badge variant="outline" className="text-xs">
                              {activity.activity_metadata.duration_minutes} min
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
