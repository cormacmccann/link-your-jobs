import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Calendar as CalendarIcon, User } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const statusColumns = [
  { value: "todo", label: "To Do", color: "bg-slate-500" },
  { value: "in_progress", label: "In Progress", color: "bg-blue-500" },
  { value: "review", label: "Review", color: "bg-yellow-500" },
  { value: "done", label: "Done", color: "bg-green-500" },
];

const priorities = [
  { value: "low", label: "Low", badge: "secondary" },
  { value: "medium", label: "Medium", badge: "default" },
  { value: "high", label: "High", badge: "destructive" },
  { value: "urgent", label: "Urgent", badge: "destructive" },
];

export default function Tasks() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"kanban" | "calendar">("kanban");
  const currentOrgId = localStorage.getItem("currentOrgId");

  const { data: tasks, refetch } = useQuery({
    queryKey: ["tasks", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return [];
      
      const { data, error } = await supabase
        .from("tasks")
        .select(`
          *,
          projects (
            id,
            name
          ),
          assigned_to_profile:profiles!tasks_assigned_to_fkey (
            id,
            email,
            full_name
          )
        `)
        .eq("organization_id", currentOrgId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!currentOrgId,
  });

  const { data: projects } = useQuery({
    queryKey: ["projects", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return [];
      
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("organization_id", currentOrgId);

      if (error) throw error;
      return data;
    },
    enabled: !!currentOrgId,
  });

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !currentOrgId) {
      toast.error("Please select an organization first");
      return;
    }

    const dueDate = formData.get("due_date") as string;

    const { error } = await supabase.from("tasks").insert([{
      organization_id: currentOrgId,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as any,
      priority: formData.get("priority") as any,
      project_id: formData.get("project_id") as string || null,
      due_date: dueDate ? new Date(dueDate).toISOString() : null,
      created_by: user.id,
    }]);

    if (error) {
      toast.error("Failed to add task");
      console.error(error);
    } else {
      toast.success("Task added successfully");
      setIsAddDialogOpen(false);
      refetch();
    }
  };

  const tasksByStatus = statusColumns.map(status => ({
    ...status,
    tasks: tasks?.filter(task => task.status === status.value) || [],
  }));

  const tasksOnDate = tasks?.filter(task => {
    if (!task.due_date || !selectedDate) return false;
    const taskDate = new Date(task.due_date);
    return taskDate.toDateString() === selectedDate.toDateString();
  }) || [];

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
          <h1 className="text-3xl font-gobold uppercase tracking-tight mb-1">Tasks</h1>
          <p className="text-muted-foreground">Manage your team's work</p>
        </div>
        <div className="flex gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-auto">
            <TabsList>
              <TabsTrigger value="kanban">Kanban</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
          </Tabs>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <Label htmlFor="title">Task Title</Label>
                  <Input id="title" name="title" required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue="todo">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusColumns.map(status => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select name="priority" defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map(priority => (
                          <SelectItem key={priority.value} value={priority.value}>
                            {priority.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="project_id">Project (Optional)</Label>
                  <Select name="project_id">
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects?.map(project => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="due_date">Due Date</Label>
                  <Input id="due_date" name="due_date" type="date" />
                </div>
                <Button type="submit" className="w-full">Add Task</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {view === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tasksByStatus.map((status) => (
            <div key={status.value} className="flex flex-col">
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-3 h-3 rounded-full ${status.color}`} />
                  <h3 className="font-semibold">{status.label}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{status.tasks.length} tasks</p>
              </div>
              <div className="space-y-2 flex-1">
                {status.tasks.map((task: any) => (
                  <Card key={task.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer border-l-4" style={{ borderLeftColor: `hsl(var(--${status.color.replace('bg-', '')}))` }}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium line-clamp-2">{task.title}</h4>
                      <Badge variant={priorities.find(p => p.value === task.priority)?.badge as any}>
                        {task.priority}
                      </Badge>
                    </div>
                    {task.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{task.description}</p>
                    )}
                    {task.projects && (
                      <Badge variant="outline" className="text-xs mb-2">
                        {task.projects.name}
                      </Badge>
                    )}
                    {task.due_date && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{format(new Date(task.due_date), "MMM d, yyyy")}</span>
                      </div>
                    )}
                    {task.assigned_to_profile && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <User className="h-3 w-3" />
                        <span>{task.assigned_to_profile.full_name || task.assigned_to_profile.email}</span>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md"
            />
          </Card>
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">
                Tasks for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
              </h3>
              <div className="space-y-3">
                {tasksOnDate.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No tasks on this date</p>
                ) : (
                  tasksOnDate.map((task: any) => (
                    <Card key={task.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{task.title}</h4>
                          {task.description && (
                            <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                          )}
                          <div className="flex gap-2">
                            <Badge variant={priorities.find(p => p.value === task.priority)?.badge as any}>
                              {task.priority}
                            </Badge>
                            <Badge variant="secondary">
                              {statusColumns.find(s => s.value === task.status)?.label}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
