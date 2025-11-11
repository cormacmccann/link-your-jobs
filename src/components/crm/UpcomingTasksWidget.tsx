import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle, Plus } from "lucide-react";
import { format, isToday, isThisWeek, isPast } from "date-fns";

export function UpcomingTasksWidget() {
  const currentOrgId = localStorage.getItem("currentOrgId");

  const { data: upcomingTasks } = useQuery({
    queryKey: ["upcoming-tasks", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return [];

      const { data } = await supabase
        .from("cards")
        .select("*, assigned_user:profiles!cards_assigned_to_fkey(full_name)")
        .eq("organization_id", currentOrgId)
        .eq("card_type", "task")
        .neq("status", "done")
        .order("due_date", { ascending: true })
        .limit(20);

      return (data || []) as any[];
    },
    enabled: !!currentOrgId,
  });

  const { data: invitations } = useQuery({
    queryKey: ["pending-invitations", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return [];

      const { data } = await supabase
        .from("invitations")
        .select("*")
        .eq("organization_id", currentOrgId)
        .eq("status", "pending")
        .limit(5);

      return (data || []) as any[];
    },
    enabled: !!currentOrgId,
  });

  const todayTasks = upcomingTasks?.filter(task => task.due_date && isToday(new Date(task.due_date))) || [];
  const thisWeekTasks = upcomingTasks?.filter(task => task.due_date && isThisWeek(new Date(task.due_date)) && !isToday(new Date(task.due_date))) || [];
  const overdueTasks = upcomingTasks?.filter(task => task.due_date && isPast(new Date(task.due_date)) && !isToday(new Date(task.due_date))) || [];
  const noDateTasks = upcomingTasks?.filter(task => !task.due_date) || [];

  const TaskPill = ({ task }: { task: any }) => (
    <Button
      variant="outline"
      className="h-auto py-2 px-4 justify-start text-left hover:bg-accent/50 transition-colors"
    >
      <div className="flex items-center gap-2 flex-1">
        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        <span className="flex-1 truncate">{task.title}</span>
        {task.assigned_user?.full_name && (
          <Badge variant="secondary" className="text-xs">
            {task.assigned_user.full_name}
          </Badge>
        )}
      </div>
    </Button>
  );

  return (
    <Card className="p-6 bg-background/80 backdrop-blur-xl border-border/50">
      <div className="space-y-6">
        {/* Overdue Section */}
        {overdueTasks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <h3 className="font-semibold text-destructive">OVERDUE</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {overdueTasks.slice(0, 8).map((task) => (
                <TaskPill key={task.id} task={task} />
              ))}
              {overdueTasks.length > 8 && (
                <Button variant="ghost" size="sm" className="text-xs">
                  +{overdueTasks.length - 8} more
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Today Section */}
        {todayTasks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-primary">TODAY</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {todayTasks.slice(0, 8).map((task) => (
                <TaskPill key={task.id} task={task} />
              ))}
              {todayTasks.length > 8 && (
                <Button variant="ghost" size="sm" className="text-xs">
                  +{todayTasks.length - 8} more
                </Button>
              )}
            </div>
          </div>
        )}

        {/* This Week Section */}
        {thisWeekTasks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">SOMETIME THIS WEEK</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {thisWeekTasks.slice(0, 8).map((task) => (
                <TaskPill key={task.id} task={task} />
              ))}
              {thisWeekTasks.length > 8 && (
                <Button variant="ghost" size="sm" className="text-xs">
                  +{thisWeekTasks.length - 8} more
                </Button>
              )}
            </div>
          </div>
        )}

        {/* No Date Section */}
        {noDateTasks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold text-muted-foreground">NO DATE SET</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {noDateTasks.slice(0, 8).map((task) => (
                <TaskPill key={task.id} task={task} />
              ))}
              {noDateTasks.length > 8 && (
                <Button variant="ghost" size="sm" className="text-xs">
                  +{noDateTasks.length - 8} more
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Pending Invitations */}
        {invitations && invitations.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Plus className="h-5 w-5 text-orange-500" />
              <h3 className="font-semibold text-orange-500">PENDING INVITATIONS</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {invitations.map((inv: any) => (
                <Button
                  key={inv.id}
                  variant="outline"
                  className="h-auto py-2 px-4 justify-start text-left hover:bg-accent/50 transition-colors"
                >
                  <span className="truncate">{inv.email}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {!overdueTasks.length && !todayTasks.length && !thisWeekTasks.length && !noDateTasks.length && (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No upcoming tasks</p>
          </div>
        )}
      </div>
    </Card>
  );
}