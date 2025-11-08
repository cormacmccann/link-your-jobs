import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GlowCard } from "@/components/ui/GlowCard";
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  TrendingUp,
  ArrowRight 
} from "lucide-react";
import { format, isToday, isPast, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TodayModern() {
  const navigate = useNavigate();

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data;
    }
  });

  const user = userData?.user;

  const { data: userOrgs } = useQuery({
    queryKey: ["user-organizations"],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from("user_roles")
        .select("organization_id, organizations(id, name)")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const organizationId = userOrgs?.organization_id;

  const { data: todayData, isLoading } = useQuery({
    queryKey: ["today-cards", organizationId, user?.id],
    queryFn: async () => {
      if (!organizationId || !user) return null;

      const today = new Date().toISOString().split('T')[0];
      const todayEnd = `${today}T23:59:59`;

      // Cards due today (all types)
      const { data: dueToday } = await supabase
        .from("cards")
        .select("*")
        .eq("organization_id", organizationId)
        .gte("due_date", today)
        .lte("due_date", todayEnd)
        .neq("status", "completed")
        .neq("status", "cancelled")
        .order("due_date", { ascending: true });

      // Urgent cards assigned to me
      const { data: urgentCards } = await supabase
        .from("cards")
        .select("*")
        .eq("organization_id", organizationId)
        .eq("assigned_to", user.id)
        .eq("priority", "urgent")
        .neq("status", "completed")
        .neq("status", "cancelled")
        .order("created_at", { ascending: false });

      // Recently updated cards I'm involved in (assigned to me or created by me)
      const { data: recentlyUpdated } = await supabase
        .from("cards")
        .select("*")
        .eq("organization_id", organizationId)
        .or(`assigned_to.eq.${user.id},created_by.eq.${user.id}`)
        .neq("status", "completed")
        .neq("status", "cancelled")
        .order("updated_at", { ascending: false })
        .limit(10);

      // Overdue cards
      const { data: overdue } = await supabase
        .from("cards")
        .select("*")
        .eq("organization_id", organizationId)
        .lt("due_date", today)
        .neq("status", "completed")
        .neq("status", "cancelled")
        .order("due_date", { ascending: true });

      return {
        dueToday: dueToday || [],
        urgentCards: urgentCards || [],
        recentlyUpdated: recentlyUpdated || [],
        overdue: overdue || []
      };
    },
    enabled: !!organizationId && !!user
  });

  if (!organizationId || !user) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">No Organization Selected</h2>
          <p className="text-muted-foreground">Please create or select an organization to continue.</p>
        </div>
      </div>
    );
  }

  const greeting = new Date().getHours() < 12 
    ? "Good morning" 
    : new Date().getHours() < 18 
    ? "Good afternoon" 
    : "Good evening";

  const getCardTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      project: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      deal: "bg-green-500/10 text-green-500 border-green-500/20",
      task: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      support: "bg-red-500/10 text-red-500 border-red-500/20",
      milestone: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      note: "bg-gray-500/10 text-gray-500 border-gray-500/20"
    };
    return (
      <Badge variant="outline" className={`text-xs ${colors[type] || ""}`}>
        {type}
      </Badge>
    );
  };

  const renderCardItem = (card: any) => (
    <div
      key={card.id}
      className="p-3 rounded-lg bg-background/50 border hover:bg-accent/50 transition-colors cursor-pointer"
      onClick={() => navigate("/crm/stream")}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="font-medium text-sm flex-1">{card.title}</p>
        {getCardTypeBadge(card.card_type)}
      </div>
      {card.description && (
        <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
          {card.description}
        </p>
      )}
      {card.due_date && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>
            {isPast(parseISO(card.due_date)) && !isToday(parseISO(card.due_date))
              ? "Overdue"
              : isToday(parseISO(card.due_date))
              ? "Due today"
              : `Due ${format(parseISO(card.due_date), "MMM d")}`}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {greeting}
          </h1>
          <p className="text-muted-foreground">
            Here's what needs your attention today
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Cards Due Today */}
            <GlowCard glowColor="purple" customSize className="w-full h-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Due Today</h3>
                    <p className="text-sm text-muted-foreground">
                      {todayData?.dueToday.length || 0} cards
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/crm/stream")}
                  className="text-purple-500 hover:text-purple-500/80"
                >
                  View all <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {todayData?.dueToday && todayData.dueToday.length > 0 ? (
                    todayData.dueToday.map(renderCardItem)
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No cards due today
                    </p>
                  )}
                </div>
              </ScrollArea>
            </GlowCard>

            {/* Urgent Cards */}
            <GlowCard glowColor="orange" customSize className="w-full h-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Urgent</h3>
                    <p className="text-sm text-muted-foreground">
                      {todayData?.urgentCards.length || 0} cards
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/crm/stream")}
                  className="text-red-500 hover:text-red-500/80"
                >
                  View all <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {todayData?.urgentCards && todayData.urgentCards.length > 0 ? (
                    todayData.urgentCards.map(renderCardItem)
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No urgent cards
                    </p>
                  )}
                </div>
              </ScrollArea>
            </GlowCard>

            {/* Overdue */}
            <GlowCard glowColor="red" customSize className="w-full h-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Overdue</h3>
                    <p className="text-sm text-muted-foreground">
                      {todayData?.overdue.length || 0} cards
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/crm/stream")}
                  className="text-red-500 hover:text-red-500/80"
                >
                  View all <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {todayData?.overdue && todayData.overdue.length > 0 ? (
                    todayData.overdue.map(renderCardItem)
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Nothing overdue
                    </p>
                  )}
                </div>
              </ScrollArea>
            </GlowCard>

            {/* Recently Updated */}
            <GlowCard glowColor="blue" customSize className="w-full h-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Recently Updated</h3>
                    <p className="text-sm text-muted-foreground">
                      {todayData?.recentlyUpdated.length || 0} cards
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/crm/stream")}
                  className="text-blue-500 hover:text-blue-500/80"
                >
                  View all <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {todayData?.recentlyUpdated && todayData.recentlyUpdated.length > 0 ? (
                    todayData.recentlyUpdated.map(renderCardItem)
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No recent updates
                    </p>
                  )}
                </div>
              </ScrollArea>
            </GlowCard>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 p-6 rounded-lg border bg-card">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => navigate("/crm/stream")}>
              View All Cards
            </Button>
            <Button variant="outline" onClick={() => navigate("/crm/contacts")}>
              View Contacts
            </Button>
            <Button variant="outline" onClick={() => navigate("/crm/deals")}>
              View Deals
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
