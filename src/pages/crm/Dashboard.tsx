import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/crm/MetricCard";
import { Users, Building2, DollarSign, FolderKanban, ListTodo, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const currentOrgId = localStorage.getItem("currentOrgId");

  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return null;

      const [contacts, companies, deals, projects, tasks] = await Promise.all([
        supabase.from("contacts").select("id", { count: "exact" }).eq("organization_id", currentOrgId),
        supabase.from("companies").select("id", { count: "exact" }).eq("organization_id", currentOrgId),
        supabase.from("deals").select("*").eq("organization_id", currentOrgId),
        supabase.from("projects").select("id", { count: "exact" }).eq("organization_id", currentOrgId),
        supabase.from("tasks").select("*").eq("organization_id", currentOrgId),
      ]);

      const totalDealValue = deals.data?.reduce((sum, deal) => sum + (Number(deal.value) || 0), 0) || 0;
      const wonDeals = deals.data?.filter(d => d.stage === "won").length || 0;
      const pendingTasks = tasks.data?.filter(t => t.status !== "done").length || 0;
      const completedTasks = tasks.data?.filter(t => t.status === "done").length || 0;

      return {
        totalContacts: contacts.count || 0,
        totalCompanies: companies.count || 0,
        totalDeals: deals.count || 0,
        totalDealValue,
        wonDeals,
        totalProjects: projects.count || 0,
        pendingTasks,
        completedTasks,
        totalTasks: tasks.count || 0,
      };
    },
    enabled: !!currentOrgId,
  });

  const { data: recentActivity } = useQuery({
    queryKey: ["recent-activity", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return [];

      const [contacts, deals, tasks, projects] = await Promise.all([
        supabase.from("contacts").select("*, companies(name)").eq("organization_id", currentOrgId).order("created_at", { ascending: false }).limit(5),
        supabase.from("deals").select("*").eq("organization_id", currentOrgId).order("created_at", { ascending: false }).limit(5),
        supabase.from("tasks").select("*").eq("organization_id", currentOrgId).order("created_at", { ascending: false }).limit(5),
        supabase.from("projects").select("*").eq("organization_id", currentOrgId).order("created_at", { ascending: false }).limit(5),
      ]);

      const activities = [
        ...(contacts.data?.map(c => ({ type: "contact", data: c, date: c.created_at })) || []),
        ...(deals.data?.map(d => ({ type: "deal", data: d, date: d.created_at })) || []),
        ...(tasks.data?.map(t => ({ type: "task", data: t, date: t.created_at })) || []),
        ...(projects.data?.map(p => ({ type: "project", data: p, date: p.created_at })) || []),
      ];

      return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);
    },
    enabled: !!currentOrgId,
  });

  const { data: dealsByStage } = useQuery({
    queryKey: ["deals-by-stage", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return [];
      
      const { data } = await supabase.from("deals").select("*").eq("organization_id", currentOrgId);
      
      const stages = ["lead", "qualified", "proposal", "negotiation", "won", "lost"];
      return stages.map(stage => ({
        stage,
        count: data?.filter(d => d.stage === stage).length || 0,
        value: data?.filter(d => d.stage === stage).reduce((sum, d) => sum + (Number(d.value) || 0), 0) || 0,
      }));
    },
    enabled: !!currentOrgId,
  });

  if (!currentOrgId) {
    return (
      <div className="p-8">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-gobold mb-2">No Organization Selected</h2>
          <p className="text-muted-foreground">Please create or select an organization to continue.</p>
        </Card>
      </div>
    );
  }

  const statCards = [
    { icon: Users, label: "Contacts", value: stats?.totalContacts || 0, color: "from-blue-500 to-blue-600", iconBg: "bg-blue-500/20", iconColor: "text-blue-600" },
    { icon: Building2, label: "Companies", value: stats?.totalCompanies || 0, color: "from-purple-500 to-purple-600", iconBg: "bg-purple-500/20", iconColor: "text-purple-600" },
    { icon: DollarSign, label: "Deal Value", value: `$${(stats?.totalDealValue || 0).toLocaleString()}`, color: "from-green-500 to-green-600", iconBg: "bg-green-500/20", iconColor: "text-green-600" },
    { icon: FolderKanban, label: "Projects", value: stats?.totalProjects || 0, color: "from-orange-500 to-orange-600", iconBg: "bg-orange-500/20", iconColor: "text-orange-600" },
    { icon: ListTodo, label: "Pending Tasks", value: stats?.pendingTasks || 0, color: "from-pink-500 to-pink-600", iconBg: "bg-pink-500/20", iconColor: "text-pink-600" },
    { icon: TrendingUp, label: "Won Deals", value: stats?.wonDeals || 0, color: "from-emerald-500 to-emerald-600", iconBg: "bg-emerald-500/20", iconColor: "text-emerald-600" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "contact": return Users;
      case "deal": return DollarSign;
      case "task": return ListTodo;
      case "project": return FolderKanban;
      default: return Clock;
    }
  };

  const getActivityText = (activity: any) => {
    const data = activity.data;
    switch (activity.type) {
      case "contact":
        return `New contact: ${data.first_name} ${data.last_name}${data.companies ? ` at ${data.companies.name}` : ""}`;
      case "deal":
        return `New deal: ${data.title}${data.value ? ` ($${Number(data.value).toLocaleString()})` : ""}`;
      case "task":
        return `New task: ${data.title}`;
      case "project":
        return `New project: ${data.name}`;
      default:
        return "Activity";
    }
  };

  const currentOrgName = localStorage.getItem("currentOrgName") || "Organization";
  const greeting = new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">
          {greeting}, {currentOrgName}
        </h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Large Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <MetricCard
          label="Total Contacts"
          value={stats?.totalContacts?.toLocaleString() || "0"}
          icon={<Users className="w-6 h-6" />}
          color="blue"
          size="lg"
        />
        <MetricCard
          label="Total Deal Value"
          value={`$${(stats?.totalDealValue || 0).toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6" />}
          color="green"
          size="lg"
        />
      </div>

      {/* Small Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard
          label="Companies"
          value={stats?.totalCompanies || 0}
          color="purple"
          icon={<Building2 className="w-5 h-5" />}
          size="sm"
        />
        <MetricCard
          label="Projects"
          value={stats?.totalProjects || 0}
          color="cyan"
          icon={<FolderKanban className="w-5 h-5" />}
          size="sm"
        />
        <MetricCard
          label="Won Deals"
          value={stats?.wonDeals || 0}
          change={{ value: 12, direction: "up" }}
          color="green"
          icon={<TrendingUp className="w-5 h-5" />}
          size="sm"
        />
        <MetricCard
          label="Pending Tasks"
          value={stats?.pendingTasks || 0}
          change={{ value: 8, direction: "down" }}
          color="red"
          icon={<ListTodo className="w-5 h-5" />}
          size="sm"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-card/40 backdrop-blur-xl border-white/10">
          <h3 className="text-xl font-semibold mb-4">Deals Pipeline</h3>
          <div className="space-y-3">
            {dealsByStage?.map((stage) => (
              <div key={stage.stage} className="flex items-center justify-between p-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors backdrop-blur-sm">
                <div className="flex-1">
                  <p className="font-medium capitalize">{stage.stage.replace("_", " ")}</p>
                  <p className="text-sm text-muted-foreground">{stage.count} deals</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">${stage.value.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-card/40 backdrop-blur-xl border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Recent Activity</h3>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {recentActivity?.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={index} className="flex items-start gap-3 p-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors backdrop-blur-sm">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{getActivityText(activity)}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(activity.date), "MMM d, h:mm a")}
                    </p>
                  </div>
                </div>
              );
            })}
            {(!recentActivity || recentActivity.length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-8">No recent activity</p>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-card/40 backdrop-blur-xl border-white/10">
          <h3 className="text-xl font-semibold mb-4">Task Completion</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Completed</span>
                <span className="text-sm text-muted-foreground">
                  {stats?.completedTasks || 0} of {stats?.totalTasks || 0}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all"
                  style={{
                    width: `${stats?.totalTasks ? (stats.completedTasks / stats.totalTasks) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">{stats?.completedTasks || 0}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">{stats?.pendingTasks || 0}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card/40 backdrop-blur-xl border-white/10">
          <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-white/10 rounded-lg backdrop-blur-sm">
              <span className="text-sm font-medium">Total Deals</span>
              <span className="text-lg font-bold">{stats?.totalDeals || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Average Deal Size</span>
              <span className="text-lg font-bold">
                ${stats?.totalDeals ? Math.round((stats.totalDealValue || 0) / stats.totalDeals).toLocaleString() : 0}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Win Rate</span>
              <span className="text-lg font-bold">
                {stats?.totalDeals ? Math.round(((stats.wonDeals || 0) / stats.totalDeals) * 100) : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm font-medium">Task Completion Rate</span>
              <span className="text-lg font-bold">
                {stats?.totalTasks ? Math.round(((stats.completedTasks || 0) / stats.totalTasks) * 100) : 0}%
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
