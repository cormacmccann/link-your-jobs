import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calendar, TrendingUp } from "lucide-react";
import { DndContext, DragEndEvent, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const stages = [
  { value: "lead", label: "Lead", color: "bg-gray-500" },
  { value: "qualified", label: "Qualified", color: "bg-blue-500" },
  { value: "proposal", label: "Proposal", color: "bg-yellow-500" },
  { value: "negotiation", label: "Negotiation", color: "bg-orange-500" },
  { value: "won", label: "Won", color: "bg-green-500" },
  { value: "lost", label: "Lost", color: "bg-red-500" },
];

interface Deal {
  id: string;
  title: string;
  value: number | null;
  stage: string;
  probability: number | null;
  expected_close_date: string | null;
  contacts?: { first_name: string; last_name: string };
  companies?: { name: string };
}

interface DealCardProps {
  deal: Deal;
  isDragging?: boolean;
}

function DealCard({ deal, isDragging }: DealCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: deal.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card 
        className={cn(
          "p-4 cursor-grab active:cursor-grabbing touch-manipulation",
          "hover:shadow-lg transition-all duration-200",
          "bg-card border-border",
          isDragging && "opacity-50 shadow-2xl scale-105"
        )}
      >
        <h4 className="font-semibold mb-2 line-clamp-2 text-base">{deal.title}</h4>
        
        <div className="space-y-2">
          {deal.value && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              <span className="font-medium">{deal.value.toLocaleString()}</span>
              {deal.probability && (
                <span className="ml-auto text-xs">
                  {deal.probability}% likely
                </span>
              )}
            </div>
          )}
          
          {deal.expected_close_date && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{new Date(deal.expected_close_date).toLocaleDateString()}</span>
            </div>
          )}
          
          {deal.contacts && (
            <Badge variant="secondary" className="text-xs">
              {deal.contacts.first_name} {deal.contacts.last_name}
            </Badge>
          )}
          
          {deal.companies && (
            <p className="text-xs text-muted-foreground truncate">{deal.companies.name}</p>
          )}
        </div>
      </Card>
    </div>
  );
}

interface DealKanbanBoardProps {
  organizationId: string;
}

export function DealKanbanBoard({ organizationId }: DealKanbanBoardProps) {
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);
  const queryClient = useQueryClient();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const { data: deals, isLoading } = useQuery({
    queryKey: ["deals", organizationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deals")
        .select(`
          *,
          contacts (first_name, last_name),
          companies (name)
        `)
        .eq("organization_id", organizationId)
        .order("position", { ascending: true });

      if (error) throw error;
      return data as Deal[];
    },
  });

  const updateDealMutation = useMutation({
    mutationFn: async ({ dealId, stage }: { dealId: string; stage: any }) => {
      const { error } = await supabase
        .from("deals")
        .update({ stage: stage as any })
        .eq("id", dealId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals", organizationId] });
      toast.success("Deal moved successfully");
    },
    onError: () => {
      toast.error("Failed to move deal");
    },
  });

  const handleDragStart = (event: any) => {
    const deal = deals?.find((d) => d.id === event.active.id);
    setActiveDeal(deal || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDeal(null);

    if (!over) return;

    const dealId = active.id as string;
    const newStage = over.id as string;

    const deal = deals?.find((d) => d.id === dealId);
    if (deal && deal.stage !== newStage) {
      updateDealMutation.mutate({ dealId, stage: newStage });
    }
  };

  const dealsByStage = stages.map((stage) => ({
    ...stage,
    deals: deals?.filter((deal) => deal.stage === stage.value) || [],
    totalValue: deals
      ?.filter((deal) => deal.stage === stage.value)
      .reduce((sum, deal) => sum + (deal.value || 0), 0) || 0,
  }));

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stages.map((stage) => (
          <div key={stage.value} className="animate-pulse">
            <div className="h-24 bg-muted rounded-lg mb-3" />
            <div className="space-y-2">
              <div className="h-32 bg-muted rounded-lg" />
              <div className="h-32 bg-muted rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 pb-24">
        {dealsByStage.map((stage) => (
          <SortableContext
            key={stage.value}
            id={stage.value}
            items={stage.deals.map((d) => d.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col min-h-[400px]">
              <div className="mb-4 p-4 bg-card rounded-xl border border-border shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className={cn("w-3 h-3 rounded-full", stage.color)} />
                  <h3 className="font-bold text-lg">{stage.label}</h3>
                  <Badge variant="outline" className="ml-auto">
                    {stage.deals.length}
                  </Badge>
                </div>
                {stage.totalValue > 0 && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    <span className="font-medium">${stage.totalValue.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 flex-1">
                {stage.deals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
                {stage.deals.length === 0 && (
                  <div className="p-8 text-center text-sm text-muted-foreground border-2 border-dashed border-muted rounded-xl">
                    Drop deals here
                  </div>
                )}
              </div>
            </div>
          </SortableContext>
        ))}
      </div>

      <DragOverlay>
        {activeDeal && <DealCard deal={activeDeal} isDragging />}
      </DragOverlay>
    </DndContext>
  );
}