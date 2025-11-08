import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, CheckCircle2, ListTodo } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface ProjectToDosProps {
  projectId: string;
}

export function ProjectToDos({ projectId }: ProjectToDosProps) {
  const [isAddListOpen, setIsAddListOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

  const { data: todoLists, refetch: refetchLists } = useQuery({
    queryKey: ["todo-lists", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("todo_lists")
        .select(`
          *,
          todo_items (
            *,
            assigned_profile:profiles!todo_items_assigned_to_fkey (
              id,
              email,
              full_name
            )
          )
        `)
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleAddList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("todo_lists").insert([{
      project_id: projectId,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      created_by: user.id,
    }]);

    if (error) {
      toast.error("Failed to create to-do list");
    } else {
      toast.success("To-do list created");
      setIsAddListOpen(false);
      refetchLists();
    }
  };

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedListId) return;
    
    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("todo_items").insert([{
      todo_list_id: selectedListId,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      created_by: user.id,
    }]);

    if (error) {
      toast.error("Failed to add item");
    } else {
      toast.success("Item added");
      setIsAddItemOpen(false);
      refetchLists();
    }
  };

  const handleToggleItem = async (itemId: string, completed: boolean) => {
    const { error } = await supabase
      .from("todo_items")
      .update({ completed: !completed })
      .eq("id", itemId);

    if (error) {
      toast.error("Failed to update item");
    } else {
      refetchLists();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">To-Do Lists</h3>
        <Dialog open={isAddListOpen} onOpenChange={setIsAddListOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New List
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create To-Do List</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddList} className="space-y-4">
              <div>
                <Label htmlFor="title">List Name</Label>
                <Input id="title" name="title" required placeholder="e.g., Design Tasks" />
              </div>
              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea id="description" name="description" rows={2} />
              </div>
              <Button type="submit" className="w-full">Create List</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {todoLists?.map((list: any) => {
          const items = list.todo_items || [];
          const completedCount = items.filter((item: any) => item.completed).length;
          const totalCount = items.length;

          return (
            <Card key={list.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">{list.title}</h4>
                  {list.description && (
                    <p className="text-sm text-muted-foreground mb-2">{list.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">
                      {completedCount} of {totalCount} completed
                    </span>
                    {totalCount > 0 && (
                      <div className="flex-1 max-w-xs">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all"
                            style={{ width: `${(completedCount / totalCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedListId(list.id);
                    setIsAddItemOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-2">
                {items.map((item: any) => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/5 transition-colors ${
                      item.completed ? "opacity-60" : ""
                    }`}
                  >
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => handleToggleItem(item.id, item.completed)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className={`font-medium ${item.completed ? "line-through" : ""}`}>{item.title}</p>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      )}
                      {item.due_date && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Due: {format(new Date(item.due_date), "MMM d, yyyy")}
                        </p>
                      )}
                    </div>
                    {item.completed && (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                ))}
                {items.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No items yet</p>
                )}
              </div>
            </Card>
          );
        })}

        {(!todoLists || todoLists.length === 0) && (
          <Card className="p-12 text-center">
            <ListTodo className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No to-do lists yet. Create one to get started!</p>
          </Card>
        )}
      </div>

      <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add To-Do Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div>
              <Label htmlFor="item-title">Item</Label>
              <Input id="item-title" name="title" required placeholder="What needs to be done?" />
            </div>
            <div>
              <Label htmlFor="item-description">Notes (optional)</Label>
              <Textarea id="item-description" name="description" rows={2} />
            </div>
            <Button type="submit" className="w-full">Add Item</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
