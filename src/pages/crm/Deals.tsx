import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { DealKanbanBoard } from "@/components/crm/DealKanbanBoard";
import { FloatingActionButton } from "@/components/crm/FloatingActionButton";
import { MobileOptimizedForm, MobileFormField, MobileFormInput, MobileFormButton } from "@/components/crm/MobileOptimizedForm";

export default function Deals() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    value: "",
    stage: "lead",
    probability: "50",
    expectedCloseDate: "",
  });
  const currentOrgId = localStorage.getItem("currentOrgId");

  const { refetch } = useQuery({
    queryKey: ["deals", currentOrgId],
    enabled: false,
  });

  const handleAddDeal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !currentOrgId) {
      toast.error("Please select an organization first");
      return;
    }

    const { error } = await supabase.from("deals").insert([{
      organization_id: currentOrgId,
      title: formData.title,
      value: parseFloat(formData.value) || null,
      stage: formData.stage as any,
      probability: parseInt(formData.probability) || 50,
      expected_close_date: formData.expectedCloseDate || null,
      created_by: user.id,
    }]);

    if (error) {
      toast.error("Failed to add deal");
      console.error(error);
    } else {
      toast.success("Deal added successfully");
      setIsAddDialogOpen(false);
      setFormData({ title: "", value: "", stage: "lead", probability: "50", expectedCloseDate: "" });
      refetch();
    }
  };

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
    <div className="p-4 md:p-8 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-gobold uppercase tracking-tight mb-1">Deals Pipeline</h1>
          <p className="text-sm text-muted-foreground">Drag and drop to move deals</p>
        </div>
      </div>

      <DealKanbanBoard organizationId={currentOrgId} />

      <FloatingActionButton
        onClick={() => setIsAddDialogOpen(true)}
        label="New Deal"
      />

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Deal</DialogTitle>
          </DialogHeader>
          <MobileOptimizedForm onSubmit={handleAddDeal}>
            <MobileFormField label="Deal Title" required>
              <MobileFormInput
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enterprise software license"
                required
              />
            </MobileFormField>

            <div className="grid grid-cols-2 gap-4">
              <MobileFormField label="Deal Value">
                <MobileFormInput
                  type="number"
                  step="0.01"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="50000"
                />
              </MobileFormField>

              <MobileFormField label="Probability">
                <MobileFormInput
                  type="number"
                  min="0"
                  max="100"
                  value={formData.probability}
                  onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
                  placeholder="50"
                />
              </MobileFormField>
            </div>

            <MobileFormField label="Expected Close Date">
              <MobileFormInput
                type="date"
                value={formData.expectedCloseDate}
                onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
              />
            </MobileFormField>

            <MobileFormField label="Stage">
              <Select
                value={formData.stage}
                onValueChange={(value) => setFormData({ ...formData, stage: value })}
              >
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                </SelectContent>
              </Select>
            </MobileFormField>

            <MobileFormButton type="submit">
              <Plus className="h-5 w-5" />
              Add Deal
            </MobileFormButton>
          </MobileOptimizedForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}
