import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const stages = [
  { value: "lead", label: "Lead", color: "bg-gray-500" },
  { value: "qualified", label: "Qualified", color: "bg-blue-500" },
  { value: "proposal", label: "Proposal", color: "bg-yellow-500" },
  { value: "negotiation", label: "Negotiation", color: "bg-orange-500" },
  { value: "won", label: "Won", color: "bg-green-500" },
  { value: "lost", label: "Lost", color: "bg-red-500" },
];

export default function Deals() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const currentOrgId = localStorage.getItem("currentOrgId");

  const { data: deals, refetch } = useQuery({
    queryKey: ["deals", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return [];
      
      const { data, error } = await supabase
        .from("deals")
        .select(`
          *,
          contacts (
            id,
            first_name,
            last_name
          ),
          companies (
            id,
            name
          )
        `)
        .eq("organization_id", currentOrgId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!currentOrgId,
  });

  const handleAddDeal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !currentOrgId) {
      toast.error("Please select an organization first");
      return;
    }

    const { error } = await supabase.from("deals").insert([{
      organization_id: currentOrgId,
      title: formData.get("title") as string,
      value: parseFloat(formData.get("value") as string) || null,
      stage: formData.get("stage") as any,
      created_by: user.id,
    }]);

    if (error) {
      toast.error("Failed to add deal");
      console.error(error);
    } else {
      toast.success("Deal added successfully");
      setIsAddDialogOpen(false);
      refetch();
    }
  };

  const dealsByStage = stages.map(stage => ({
    ...stage,
    deals: deals?.filter(deal => deal.stage === stage.value) || [],
  }));

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
          <h1 className="text-3xl font-gobold uppercase tracking-tight mb-1">Deals Pipeline</h1>
          <p className="text-muted-foreground">Track your sales opportunities</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Deal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Deal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddDeal} className="space-y-4">
              <div>
                <Label htmlFor="title">Deal Title</Label>
                <Input id="title" name="title" required />
              </div>
              <div>
                <Label htmlFor="value">Deal Value ($)</Label>
                <Input id="value" name="value" type="number" step="0.01" />
              </div>
              <div>
                <Label htmlFor="stage">Stage</Label>
                <Select name="stage" defaultValue="lead">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map(stage => (
                      <SelectItem key={stage.value} value={stage.value}>
                        {stage.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Add Deal</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {dealsByStage.map((stage) => (
          <div key={stage.value} className="flex flex-col">
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                <h3 className="font-semibold">{stage.label}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{stage.deals.length} deals</p>
            </div>
            <div className="space-y-2 flex-1">
              {stage.deals.map((deal: any) => (
                <Card key={deal.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <h4 className="font-medium mb-2 line-clamp-2">{deal.title}</h4>
                  {deal.value && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                      <DollarSign className="h-3 w-3" />
                      <span>{deal.value.toLocaleString()}</span>
                    </div>
                  )}
                  {deal.contacts && (
                    <Badge variant="secondary" className="text-xs">
                      {deal.contacts.first_name} {deal.contacts.last_name}
                    </Badge>
                  )}
                  {deal.companies && (
                    <p className="text-xs text-muted-foreground mt-1">{deal.companies.name}</p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
