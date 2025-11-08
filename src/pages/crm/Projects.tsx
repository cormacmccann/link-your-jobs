import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, FolderKanban, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function Projects() {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
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

  const { data: projectTasks } = useQuery({
    queryKey: ["project-tasks", selectedProject],
    queryFn: async () => {
      if (!selectedProject) return [];
      
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("project_id", selectedProject)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!selectedProject,
  });

  const { data: messageBoards, refetch: refetchBoards } = useQuery({
    queryKey: ["message-boards", selectedProject],
    queryFn: async () => {
      if (!selectedProject) return [];
      
      const { data, error } = await supabase
        .from("message_boards")
        .select("*")
        .eq("project_id", selectedProject)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!selectedProject,
  });

  const { data: messages, refetch: refetchMessages } = useQuery({
    queryKey: ["messages", selectedBoard],
    queryFn: async () => {
      if (!selectedBoard) return [];
      
      const { data, error } = await supabase
        .from("messages")
        .select(`
          *,
          profiles!messages_created_by_fkey (
            id,
            email,
            full_name
          )
        `)
        .eq("message_board_id", selectedBoard)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!selectedBoard,
  });

  const handleAddProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !currentOrgId) {
      toast.error("Please select an organization first");
      return;
    }

    const { error } = await supabase.from("projects").insert([{
      organization_id: currentOrgId,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      created_by: user.id,
    }]);

    if (error) {
      toast.error("Failed to create project");
      console.error(error);
    } else {
      toast.success("Project created successfully");
      setIsAddProjectOpen(false);
      refetchProjects();
    }
  };

  const handleAddMessageBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !selectedProject) return;

    const { error } = await supabase.from("message_boards").insert([{
      organization_id: currentOrgId!,
      project_id: selectedProject,
      title: formData.get("title") as string,
      created_by: user.id,
    }]);

    if (error) {
      toast.error("Failed to create message board");
      console.error(error);
    } else {
      toast.success("Message board created");
      setIsAddBoardOpen(false);
      refetchBoards();
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedBoard) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("messages").insert([{
      message_board_id: selectedBoard,
      content: newMessage,
      created_by: user.id,
    }]);

    if (error) {
      toast.error("Failed to send message");
      console.error(error);
    } else {
      setNewMessage("");
      refetchMessages();
    }
  };

  const selectedProjectData = projects?.find(p => p.id === selectedProject);
  const selectedBoardData = messageBoards?.find(b => b.id === selectedBoard);
  const todoTasks = projectTasks?.filter(t => t.status === "todo") || [];
  const completedTasks = projectTasks?.filter(t => t.status === "done") || [];

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
          <p className="text-muted-foreground">Collaborate on projects with your team</p>
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
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={3} />
              </div>
              <Button type="submit" className="w-full">Create Project</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">All Projects</h3>
            <div className="space-y-2">
              {projects?.map((project) => (
                <div
                  key={project.id}
                  onClick={() => {
                    setSelectedProject(project.id);
                    setSelectedBoard(null);
                  }}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedProject === project.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FolderKanban className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{project.name}</h4>
                      {project.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {(!projects || projects.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-8">No projects yet</p>
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {selectedProjectData ? (
            <Tabs defaultValue="todos" className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="todos">To-Dos</TabsTrigger>
                  <TabsTrigger value="messages">Message Boards</TabsTrigger>
                </TabsList>
                {selectedBoard && (
                  <Button variant="outline" size="sm" onClick={() => setSelectedBoard(null)}>
                    Back to Boards
                  </Button>
                )}
              </div>

              <TabsContent value="todos">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{selectedProjectData.name} - To-Do List</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <span className="text-muted-foreground">To Do</span>
                        <span className="text-xs bg-muted px-2 py-1 rounded">{todoTasks.length}</span>
                      </h4>
                      <div className="space-y-2">
                        {todoTasks.map((task) => (
                          <div key={task.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/5">
                            <Checkbox />
                            <div className="flex-1">
                              <p className="font-medium">{task.title}</p>
                              {task.description && (
                                <p className="text-sm text-muted-foreground">{task.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                        {todoTasks.length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-4">No pending tasks</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-muted-foreground">Completed</span>
                        <span className="text-xs bg-muted px-2 py-1 rounded">{completedTasks.length}</span>
                      </h4>
                      <div className="space-y-2">
                        {completedTasks.map((task) => (
                          <div key={task.id} className="flex items-start gap-3 p-3 border rounded-lg opacity-60">
                            <Checkbox checked disabled />
                            <div className="flex-1">
                              <p className="font-medium line-through">{task.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="messages">
                {!selectedBoard ? (
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">Message Boards</h3>
                      <Dialog open={isAddBoardOpen} onOpenChange={setIsAddBoardOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            New Board
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create Message Board</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleAddMessageBoard} className="space-y-4">
                            <div>
                              <Label htmlFor="title">Board Title</Label>
                              <Input id="title" name="title" required />
                            </div>
                            <Button type="submit" className="w-full">Create Board</Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {messageBoards?.map((board) => (
                        <Card
                          key={board.id}
                          className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-primary"
                          onClick={() => setSelectedBoard(board.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <MessageSquare className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">{board.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                Created {format(new Date(board.created_at), "MMM d, yyyy")}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                      {(!messageBoards || messageBoards.length === 0) && (
                        <p className="col-span-2 text-sm text-muted-foreground text-center py-8">
                          No message boards yet. Create one to start discussions!
                        </p>
                      )}
                    </div>
                  </Card>
                ) : (
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{selectedBoardData?.title}</h3>
                    <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                      {messages?.map((message: any) => (
                        <div key={message.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <p className="font-medium text-sm">
                              {message.profiles?.full_name || message.profiles?.email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(message.created_at), "MMM d, h:mm a")}
                            </p>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      ))}
                      {(!messages || messages.length === 0) && (
                        <p className="text-sm text-muted-foreground text-center py-8">
                          No messages yet. Start the conversation!
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="p-12 text-center">
              <FolderKanban className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Select a Project</h3>
              <p className="text-muted-foreground">Choose a project from the list to view details</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
