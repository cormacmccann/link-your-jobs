import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, FolderKanban, Home, ListTodo, FileText, Calendar, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { ProjectOverview } from "@/components/crm/ProjectOverview";
import { ProjectToDos } from "@/components/crm/ProjectToDos";
import { ProjectDocs } from "@/components/crm/ProjectDocs";
import { ProjectSchedule } from "@/components/crm/ProjectSchedule";
import { ProjectMessages } from "@/components/crm/ProjectMessages";

export default function Projects() {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const currentOrgId = localStorage.getItem("currentOrgId");

  const { data: projects, refetch: refetchProjects } = useQuery({
    queryKey: ["projects", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return [];
      
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("organization_id", currentOrgId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!currentOrgId,
  });

  const handleAddProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !currentOrgId) {
      toast.error("Please select an organization first");
      return;
    }

    const { data: project, error } = await supabase.from("projects").insert([{
      organization_id: currentOrgId,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      created_by: user.id,
    }]).select().single();

    if (error) {
      toast.error("Failed to create project");
      console.error(error);
    } else {
      // Automatically add creator as project member
      await supabase.from("project_members").insert([{
        project_id: project.id,
        user_id: user.id,
        role: "owner",
      }]);
      
      toast.success("Project created successfully");
      setIsAddProjectOpen(false);
      setSelectedProject(project.id);
      refetchProjects();
    }
  };

  const selectedProjectData = projects?.find(p => p.id === selectedProject);

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

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-gobold uppercase tracking-tight mb-1">Projects</h1>
          <p className="text-muted-foreground">Basecamp-style project management</p>
        </div>
        <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <Label htmlFor="name">Project Name</Label>
                <Input id="name" name="name" required placeholder="e.g., Website Redesign" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={3} placeholder="What's this project about?" />
              </div>
              <Button type="submit" className="w-full">Create Project</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Project List */}
        <div className="lg:col-span-1">
          <Card className="p-4 sticky top-4">
            <h3 className="font-semibold mb-3">All Projects</h3>
            <div className="space-y-2">
              {projects?.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedProject === project.id ? "border-primary bg-primary/5 shadow-md" : "border-border hover:bg-accent/5"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${selectedProject === project.id ? "bg-primary/20" : "bg-primary/10"}`}>
                      <FolderKanban className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate text-sm">{project.name}</h4>
                      {project.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {(!projects || projects.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No projects yet. Create one to get started!
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Project Content */}
        <div className="lg:col-span-3">
          {selectedProjectData ? (
            <div className="space-y-4">
              <Card className="p-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/20">
                <h2 className="text-2xl font-gobold mb-2">{selectedProjectData.name}</h2>
                {selectedProjectData.description && (
                  <p className="text-muted-foreground">{selectedProjectData.description}</p>
                )}
              </Card>

              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="overview">
                    <Home className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="todos">
                    <ListTodo className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">To-Dos</span>
                  </TabsTrigger>
                  <TabsTrigger value="docs">
                    <FileText className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Docs</span>
                  </TabsTrigger>
                  <TabsTrigger value="schedule">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Schedule</span>
                  </TabsTrigger>
                  <TabsTrigger value="messages">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Messages</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <ProjectOverview projectId={selectedProject} orgId={currentOrgId} />
                </TabsContent>

                <TabsContent value="todos">
                  <ProjectToDos projectId={selectedProject} />
                </TabsContent>

                <TabsContent value="docs">
                  <ProjectDocs projectId={selectedProject} />
                </TabsContent>

                <TabsContent value="schedule">
                  <ProjectSchedule projectId={selectedProject} />
                </TabsContent>

                <TabsContent value="messages">
                  <ProjectMessages projectId={selectedProject} orgId={currentOrgId} />
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <Card className="p-12 text-center">
              <FolderKanban className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Select a Project</h3>
              <p className="text-muted-foreground">Choose a project from the list or create a new one</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
