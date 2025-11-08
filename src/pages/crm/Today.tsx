import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GlowCard } from "@/components/ui/GlowCard";
import { CheckCircle2, MessageSquare, DollarSign, FileText, ArrowRight } from "lucide-react";
import { format, isToday, isPast } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Today() {
  const navigate = useNavigate();
  const currentOrgId = localStorage.getItem("currentOrgId");

  const { data: queueData } = useQuery({
    queryKey: ["today-queue", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return null;

      const [tasks, deals] = await Promise.all([
        supabase
          .from("tasks")
          .select("*")
          .eq("organization_id", currentOrgId)
          .neq("status", "done")
          .order("due_date", { ascending: true }),
        supabase
          .from("deals")
          .select("*, contacts(first_name, last_name)")
          .eq("organization_id", currentOrgId)
          .in("stage", ["qualified", "proposal", "negotiation"])
          .order("expected_close_date", { ascending: true }),
      ]);

      const tasksDue = Array.isArray(tasks.data) ? tasks.data.filter((t) => t.due_date && (isToday(new Date(t.due_date)) || isPast(new Date(t.due_date)))) : [];
      const dealsNeedingAction = Array.isArray(deals.data) ? deals.data.filter((d) => d.expected_close_date && isPast(new Date(d.expected_close_date))) : [];

      return {
        tasksDue,
        unreadConversations: [], // TODO: Add when conversations table exists
        dealsNeedingAction,
        invoicesOverdue: [], // TODO: Add invoices when table exists
      };
    },
    enabled: !!currentOrgId,
  });

  if (!currentOrgId) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">No Organization Selected</h2>
          <p className="text-muted-foreground">Please create or select an organization to continue.</p>
        </div>
      </div>
    );
  }

  const greeting = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen p-8 bg-bg-0">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-text-1">
            {greeting}
          </h1>
          <p className="text-text-2">
            Here's what needs your attention today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tasks Due */}
          <GlowCard glowColor="purple" customSize className="w-full h-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-acc-violet/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-acc-violet" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-1">Tasks Due</h3>
                  <p className="text-sm text-text-2">{queueData?.tasksDue.length || 0} tasks</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/crm/tasks")}
                className="text-acc-violet hover:text-acc-violet/80"
              >
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {queueData?.tasksDue.map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-lg bg-bg-1/50 border border-white/5 hover:bg-bg-1 transition-colors cursor-pointer"
                  onClick={() => navigate("/crm/tasks")}
                >
                  <p className="font-medium text-text-1 text-sm">{task.title}</p>
                  {task.due_date && (
                    <p className="text-xs text-text-2 mt-1">
                      Due {format(new Date(task.due_date), "MMM d")}
                    </p>
                  )}
                </div>
              ))}
              {(!queueData?.tasksDue || queueData.tasksDue.length === 0) && (
                <p className="text-sm text-text-2 text-center py-8">No tasks due today</p>
              )}
            </div>
          </GlowCard>

          {/* Unread Conversations */}
          <GlowCard glowColor="blue" customSize className="w-full h-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-acc-cyan/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-acc-cyan" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-1">Conversations</h3>
                  <p className="text-sm text-text-2">{queueData?.unreadConversations.length || 0} open</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/crm/conversations")}
                className="text-acc-cyan hover:text-acc-cyan/80"
              >
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <p className="text-sm text-text-2 text-center py-8">No open conversations</p>
            </div>
          </GlowCard>

          {/* Deals Needing Action */}
          <GlowCard glowColor="green" customSize className="w-full h-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-1">Deals Needing Action</h3>
                  <p className="text-sm text-text-2">{queueData?.dealsNeedingAction.length || 0} deals</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/crm/deals")}
                className="text-green-500 hover:text-green-500/80"
              >
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {queueData?.dealsNeedingAction.map((deal) => (
                <div
                  key={deal.id}
                  className="p-3 rounded-lg bg-bg-1/50 border border-white/5 hover:bg-bg-1 transition-colors cursor-pointer"
                  onClick={() => navigate("/crm/deals")}
                >
                  <p className="font-medium text-text-1 text-sm">{deal.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-text-2">
                      {deal.contacts?.first_name} {deal.contacts?.last_name}
                    </p>
                    {deal.value && (
                      <p className="text-xs font-semibold text-green-500">
                        ${Number(deal.value).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {(!queueData?.dealsNeedingAction || queueData.dealsNeedingAction.length === 0) && (
                <p className="text-sm text-text-2 text-center py-8">All deals are on track</p>
              )}
            </div>
          </GlowCard>

          {/* Invoices Overdue */}
          <GlowCard glowColor="orange" customSize className="w-full h-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-acc-pink/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-acc-pink" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-1">Invoices Overdue</h3>
                  <p className="text-sm text-text-2">{queueData?.invoicesOverdue.length || 0} invoices</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/crm/invoices")}
                className="text-acc-pink hover:text-acc-pink/80"
              >
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {(!queueData?.invoicesOverdue || queueData.invoicesOverdue.length === 0) && (
                <p className="text-sm text-text-2 text-center py-8">No overdue invoices</p>
              )}
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
