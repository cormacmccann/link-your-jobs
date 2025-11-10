import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface SupportTicketFormProps {
  organizationId: string;
  onSuccess?: () => void;
}

type Severity = "critical" | "high" | "medium" | "low";
type Category = "bug" | "feature" | "question" | "issue";

export function SupportTicketForm({ organizationId, onSuccess }: SupportTicketFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "medium" as Severity,
    category: "question" as Category,
    slaHours: 24,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Generate ticket number
      const year = new Date().getFullYear();
      const { count } = await supabase
        .from("cards")
        .select("*", { count: "exact", head: true })
        .eq("card_type", "support")
        .eq("organization_id", organizationId);

      const ticketNumber = `SUPP-${year}-${String((count || 0) + 1).padStart(4, "0")}`;

      // Calculate SLA deadline
      const slaDeadline = new Date();
      slaDeadline.setHours(slaDeadline.getHours() + formData.slaHours);

      const { error } = await supabase.from("cards").insert({
        organization_id: organizationId,
        card_type: "support",
        title: formData.title,
        description: formData.description,
        status: "active",
        priority: formData.severity === "critical" || formData.severity === "high" ? "urgent" : "normal",
        created_by: user.id,
        metadata: {
          ticket_number: ticketNumber,
          category: formData.category,
          severity: formData.severity,
          sla_hours: formData.slaHours,
          sla_deadline: slaDeadline.toISOString(),
          source: "form",
        },
      });

      if (error) throw error;

      toast({
        title: "Support ticket created",
        description: `Ticket ${ticketNumber} has been created successfully.`,
      });

      setFormData({
        title: "",
        description: "",
        severity: "medium",
        category: "question",
        slaHours: 24,
      });

      onSuccess?.();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Brief description of the issue"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Detailed description of the issue"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="severity">Severity</Label>
          <Select
            value={formData.severity}
            onValueChange={(value: Severity) => setFormData({ ...formData, severity: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value: Category) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bug">Bug</SelectItem>
              <SelectItem value="feature">Feature Request</SelectItem>
              <SelectItem value="question">Question</SelectItem>
              <SelectItem value="issue">Issue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sla">SLA (hours)</Label>
        <Input
          id="sla"
          type="number"
          min="1"
          value={formData.slaHours}
          onChange={(e) => setFormData({ ...formData, slaHours: parseInt(e.target.value) })}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Support Ticket
      </Button>
    </form>
  );
}
