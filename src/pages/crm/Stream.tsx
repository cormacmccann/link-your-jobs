import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CardStream } from "@/components/crm/CardStream";
import { CardFormDialog } from "@/components/crm/CardFormDialog";
import { FloatingActionButton } from "@/components/crm/FloatingActionButton";
import { CardDetailPanel } from "@/components/crm/CardDetailPanel";
import { MobileBottomNav } from "@/components/crm/MobileBottomNav";

type CardType = "project" | "deal" | "task" | "support" | "milestone" | "note";

export default function Stream() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedCardType, setSelectedCardType] = useState<CardType>("project");
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const { data: userOrgs } = useQuery({
    queryKey: ["user-organizations"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("user_roles")
        .select("organization_id, organizations(id, name)")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      return data;
    }
  });

  const organizationId = userOrgs?.organization_id;

  const handleCreateCard = (type: CardType) => {
    setSelectedCardType(type);
    setCreateDialogOpen(true);
  };

  const handleCardClick = async (cardId: string) => {
    const { data } = await supabase
      .from("cards")
      .select("*")
      .eq("id", cardId)
      .single();
    
    if (data) {
      setSelectedCard({
        id: data.id,
        cardType: data.card_type,
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        assignedTo: data.assigned_to,
        dueDate: data.due_date,
        relatedContact: data.related_contact_id,
        relatedContactId: data.related_contact_id,
        relatedCompanyId: data.related_company_id,
        organizationId: organizationId
      });
      setDetailPanelOpen(true);
    }
  };

  if (!organizationId) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-full relative pb-16 md:pb-0">
      <CardStream
        organizationId={organizationId}
        onCreateCard={handleCreateCard}
        onCardClick={handleCardClick}
      />

      <FloatingActionButton onCreateCard={handleCreateCard} />

      <CardFormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        organizationId={organizationId}
        defaultType={selectedCardType}
      />

      <CardDetailPanel
        open={detailPanelOpen}
        onOpenChange={setDetailPanelOpen}
        card={selectedCard}
      />

      <MobileBottomNav />
    </div>
  );
}