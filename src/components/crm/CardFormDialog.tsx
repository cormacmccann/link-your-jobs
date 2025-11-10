import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type CardType = "project" | "deal" | "task" | "support" | "milestone" | "note";

const cardTypeLabels: Record<CardType, string> = {
  project: "Project",
  deal: "Deal",
  task: "Task",
  support: "Support Ticket",
  milestone: "Milestone",
  note: "Note",
};
type CardPriority = "urgent" | "high" | "normal" | "low";

interface CardFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId: string;
  defaultType?: CardType;
  card?: {
    id: string;
    card_type: CardType;
    title: string;
    description?: string | null;
    priority: CardPriority;
    due_date?: string | null;
    related_contact_id?: string | null;
    related_company_id?: string | null;
    assigned_to?: string | null;
  };
}

interface CardFormData {
  card_type: CardType;
  title: string;
  description?: string;
  priority: CardPriority;
  due_date?: Date;
  related_contact_id?: string;
  related_company_id?: string;
  assigned_to?: string;
}

export function CardFormDialog({
  open,
  onOpenChange,
  organizationId,
  defaultType = "project",
  card
}: CardFormDialogProps) {
  const queryClient = useQueryClient();
  const isEditing = !!card;

  const form = useForm<CardFormData>({
    defaultValues: {
      card_type: card?.card_type || defaultType,
      title: card?.title || "",
      description: card?.description || "",
      priority: card?.priority || "normal",
      due_date: card?.due_date ? new Date(card.due_date) : undefined,
      related_contact_id: card?.related_contact_id || undefined,
      related_company_id: card?.related_company_id || undefined,
      assigned_to: card?.assigned_to || undefined,
    }
  });

  const { data: contacts } = useQuery({
    queryKey: ["contacts", organizationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contacts")
        .select("id, first_name, last_name")
        .eq("organization_id", organizationId);
      if (error) throw error;
      return data;
    },
    enabled: open
  });

  const { data: companies } = useQuery({
    queryKey: ["companies", organizationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("id, name")
        .eq("organization_id", organizationId);
      if (error) throw error;
      return data;
    },
    enabled: open
  });

  const { data: users } = useQuery({
    queryKey: ["org-users", organizationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("user_id, profiles(id, full_name, email)")
        .eq("organization_id", organizationId);
      
      if (error) throw error;
      return data.map((ur: any) => ({
        id: ur.user_id,
        full_name: ur.profiles?.full_name,
        email: ur.profiles?.email,
      }));
    },
    enabled: open
  });

  const saveCardMutation = useMutation({
    mutationFn: async (data: CardFormData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      if (isEditing && card) {
        const { error } = await supabase
          .from("cards")
          .update({
            card_type: data.card_type,
            title: data.title,
            description: data.description,
            priority: data.priority,
            due_date: data.due_date?.toISOString(),
            related_company_id: data.related_company_id,
            related_contact_id: data.related_contact_id,
            assigned_to: data.assigned_to,
          })
          .eq("id", card.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("cards").insert([{
          organization_id: organizationId,
          created_by: user.id,
          card_type: data.card_type,
          title: data.title,
          description: data.description,
          priority: data.priority,
          due_date: data.due_date?.toISOString(),
          related_contact_id: data.related_contact_id,
          related_company_id: data.related_company_id,
          assigned_to: data.assigned_to,
          status: "active"
        }]);

        if (error) throw error;
      }
    },
    onMutate: async (data) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["cards"] });

      // Snapshot previous value
      const previousCards = queryClient.getQueryData(["cards"]);

      // Optimistically update UI if creating
      if (!isEditing) {
        queryClient.setQueryData(
          ["cards"],
          (old: any) => {
            if (!old) return old;
            return [
              {
                id: `temp-${Date.now()}`,
                organization_id: organizationId,
                card_type: data.card_type,
                title: data.title,
                description: data.description,
                priority: data.priority,
                status: "active",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
              ...old,
            ];
          }
        );
      }

      return { previousCards };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      toast.success(isEditing ? "Card updated" : "Card created");
      onOpenChange(false);
      form.reset();
    },
    onError: (error: any, data, context) => {
      // Rollback on error
      queryClient.setQueryData(["cards"], context?.previousCards);
      toast.error("Error", {
        description: error.message
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    }
  });

  const safeCompanies = Array.isArray(companies) ? companies : [];
  const safeContacts = Array.isArray(contacts) ? contacts : [];
  const safeUsers = Array.isArray(users) ? users : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Card' : 'Create New Card'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => saveCardMutation.mutate(data))} className="space-y-4">
            <FormField
              control={form.control}
              name="card_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="deal">Deal</SelectItem>
                      <SelectItem value="task">Task</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="milestone">Milestone</SelectItem>
                      <SelectItem value="note">Note</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter card title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} placeholder="Add details..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : "Pick a date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="assigned_to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned To</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {safeUsers.length === 0 ? (
                        <div className="p-2 text-sm text-muted-foreground">No users available</div>
                      ) : (
                        safeUsers.map((user: any) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.full_name || user.email}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="related_company_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {safeCompanies.length === 0 ? (
                          <div className="p-2 text-sm text-muted-foreground">No companies available</div>
                        ) : (
                          safeCompanies.map((company) => (
                            <SelectItem key={company.id} value={company.id}>
                              {company.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="related_contact_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select contact" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {safeContacts.length === 0 ? (
                          <div className="p-2 text-sm text-muted-foreground">No contacts available</div>
                        ) : (
                          safeContacts.map((contact) => (
                            <SelectItem key={contact.id} value={contact.id}>
                              {contact.first_name} {contact.last_name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saveCardMutation.isPending}>
                {saveCardMutation.isPending ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Card" : "Create Card")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}