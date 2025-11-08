import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, CalendarDays, ListTodo, FileText } from "lucide-react";
import { format } from "date-fns";

interface ProjectOverviewProps {
  projectId: string;
  orgId: string;
}

export function ProjectOverview({ projectId, orgId }: ProjectOverviewProps) {
  const { data: project } = useQuery({
    queryKey: ["project-detail", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const { data: members } = useQuery({
    queryKey: ["project-members", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_members")
        .select(`
          *,
          profiles:user_id (
            id,
            email,
            full_name
          )
        `)
        .eq("project_id", projectId);
      if (error) throw error;
      return data;
    },
  });

  const { data: stats } = useQuery({
    queryKey: ["project-stats", projectId],
    queryFn: async () => {
      const [todoLists, docs, milestones] = await Promise.all([
        supabase.from("todo_lists").select("id, todo_items(id, completed)", { count: "exact" }).eq("project_id", projectId),
        supabase.from("project_documents").select("id", { count: "exact" }).eq("project_id", projectId),
        supabase.from("project_milestones").select("id, completed", { count: "exact" }).eq("project_id", projectId),
      ]);

      const totalTodos = todoLists.data?.reduce((sum, list: any) => sum + (list.todo_items?.length || 0), 0) || 0;
      const completedTodos = todoLists.data?.reduce((sum, list: any) => 
        sum + (list.todo_items?.filter((item: any) => item.completed).length || 0), 0) || 0;

      return {
        totalTodos,
        completedTodos,
        totalDocs: docs.count || 0,
        totalMilestones: milestones.count || 0,
        completedMilestones: milestones.data?.filter((m: any) => m.completed).length || 0,
      };
    },
  });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Project Details</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Created</span>
            <span className="font-medium">{project ? format(new Date(project.created_at), "MMM d, yyyy") : "-"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Last Updated</span>
            <span className="font-medium">{project ? format(new Date(project.updated_at), "MMM d, yyyy") : "-"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Team Members</span>
            <span className="font-medium">{members?.length || 0}</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-500/20">
              <ListTodo className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">To-Dos</p>
              <p className="text-2xl font-bold">{stats?.completedTodos || 0} / {stats?.totalTodos || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-purple-500/20">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Documents</p>
              <p className="text-2xl font-bold">{stats?.totalDocs || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-500/20">
              <CalendarDays className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Milestones</p>
              <p className="text-2xl font-bold">{stats?.completedMilestones || 0} / {stats?.totalMilestones || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-orange-500/20">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Team</p>
              <p className="text-2xl font-bold">{members?.length || 0}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Team Members</h3>
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
        <div className="space-y-3">
          {members?.map((member: any) => (
            <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/5">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {(member.profiles?.full_name || member.profiles?.email || "?").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.profiles?.full_name || member.profiles?.email}</p>
                  <p className="text-sm text-muted-foreground capitalize">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
          {(!members || members.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-4">No team members yet</p>
          )}
        </div>
      </Card>
    </div>
  );
}
