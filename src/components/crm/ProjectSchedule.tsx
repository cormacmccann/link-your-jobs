import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Calendar as CalendarIcon, CheckCircle2, Circle } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface ProjectScheduleProps {
  projectId: string;
}

export function ProjectSchedule({ projectId }: ProjectScheduleProps) {
  const [isAddMilestoneOpen, setIsAddMilestoneOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  const { data: milestones, refetch } = useQuery({
    queryKey: ["project-milestones", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_milestones")
        .select("*")
        .eq("project_id", projectId)
        .order("due_date", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const handleAddMilestone = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const dueDate = formData.get("due_date") as string;

    const { error } = await supabase.from("project_milestones").insert([{
      project_id: projectId,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      due_date: dueDate ? new Date(dueDate).toISOString() : null,
      created_by: user.id,
    }]);

    if (error) {
      toast.error("Failed to create milestone");
    } else {
      toast.success("Milestone created");
      setIsAddMilestoneOpen(false);
      refetch();
    }
  };

  const handleToggleMilestone = async (milestoneId: string, completed: boolean) => {
    const { error } = await supabase
      .from("project_milestones")
      .update({ completed: !completed })
      .eq("id", milestoneId);

    if (error) {
      toast.error("Failed to update milestone");
    } else {
      refetch();
    }
  };

  const upcomingMilestones = milestones?.filter(m => !m.completed && m.due_date) || [];
  const completedMilestones = milestones?.filter(m => m.completed) || [];
  const noDateMilestones = milestones?.filter(m => !m.completed && !m.due_date) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Schedule & Milestones</h3>
        <Dialog open={isAddMilestoneOpen} onOpenChange={setIsAddMilestoneOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Milestone
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Milestone</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddMilestone} className="space-y-4">
              <div>
                <Label htmlFor="title">Milestone Title</Label>
                <Input id="title" name="title" required placeholder="e.g., Launch Website" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={3} />
              </div>
              <div>
                <Label htmlFor="due_date">Due Date</Label>
                <Input id="due_date" name="due_date" type="date" />
              </div>
              <Button type="submit" className="w-full">Create Milestone</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-1">
          <h4 className="font-semibold mb-3">Quick Calendar</h4>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {upcomingMilestones.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Circle className="h-4 w-4 text-orange-600" />
                Upcoming Milestones
              </h4>
              <div className="space-y-2">
                {upcomingMilestones.map((milestone) => (
                  <Card key={milestone.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={milestone.completed}
                        onCheckedChange={() => handleToggleMilestone(milestone.id, milestone.completed)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{milestone.title}</p>
                            {milestone.description && (
                              <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                            )}
                          </div>
                          {milestone.due_date && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{format(new Date(milestone.due_date), "MMM d, yyyy")}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {noDateMilestones.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Circle className="h-4 w-4 text-gray-600" />
                No Date Set
              </h4>
              <div className="space-y-2">
                {noDateMilestones.map((milestone) => (
                  <Card key={milestone.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={milestone.completed}
                        onCheckedChange={() => handleToggleMilestone(milestone.id, milestone.completed)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{milestone.title}</p>
                        {milestone.description && (
                          <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {completedMilestones.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Completed
              </h4>
              <div className="space-y-2 opacity-60">
                {completedMilestones.map((milestone) => (
                  <Card key={milestone.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox checked disabled className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium line-through">{milestone.title}</p>
                            {milestone.description && (
                              <p className="text-sm text-muted-foreground mt-1 line-through">{milestone.description}</p>
                            )}
                          </div>
                          {milestone.due_date && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{format(new Date(milestone.due_date), "MMM d")}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {(!milestones || milestones.length === 0) && (
            <Card className="p-12 text-center">
              <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No milestones yet. Create one to track important dates!</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
