import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO } from "date-fns";
import { FolderKanban, ArrowRight, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'completed':
    case 'done':
      return { label: 'Completed', color: 'bg-green-500/10 text-green-500 border-green-500/20', icon: CheckCircle2 };
    case 'in_progress':
      return { label: 'In Progress', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: Loader2 };
    case 'pending':
    case 'todo':
      return { label: 'Pending', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', icon: Clock };
    default:
      return { label: status, color: 'bg-muted text-muted-foreground', icon: Clock };
  }
};

export default function PortalProjects() {
  const navigate = useNavigate();

  const { data: projects, isLoading } = useQuery({
    queryKey: ["portal-projects"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: userRole } = await supabase
        .from("user_roles")
        .select("organization_id")
        .eq("user_id", user.id)
        .single();

      if (!userRole?.organization_id) return [];

      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("organization_id", userRole.organization_id)
        .eq("card_type", "project")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const isEmpty = !projects || projects.length === 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Your Projects</h1>
          <p className="text-muted-foreground mt-1">
            Track the progress of all your website design projects
          </p>
        </div>
        <Button 
          onClick={() => navigate("/portal/new-request")}
          className="bg-acc-violet hover:bg-acc-violet/90 hidden sm:flex"
        >
          New Project
        </Button>
      </div>

      {isEmpty ? (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-acc-violet/10 flex items-center justify-center mb-4">
              <FolderKanban className="h-8 w-8 text-acc-violet" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Start a new project request to get your website design underway
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
        <div className="grid gap-4">
          {projects.map((project) => {
            const statusConfig = getStatusConfig(project.status);
            const StatusIcon = statusConfig.icon;
            
            // Calculate mock progress based on status
            const progress = project.status === 'archived' ? 100 : project.status === 'active' ? 60 : 20;

            return (
              <Card
                key={project.id} 
                className="hover:border-acc-violet/50 transition-colors cursor-pointer group"
                onClick={() => navigate(`/portal/projects/${project.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-acc-violet to-acc-pink flex items-center justify-center shrink-0">
                        <FolderKanban className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-acc-violet transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description || 'Website design project'}
                        </p>
                      </div>
                    </div>
                    <Badge className={statusConfig.color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusConfig.label}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      Started {format(parseISO(project.created_at), "MMM d, yyyy")}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
