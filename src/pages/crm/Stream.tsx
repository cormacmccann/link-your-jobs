import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CardStream } from "@/components/crm/CardStream";
import { CardFormDialog } from "@/components/crm/CardFormDialog";
import { FloatingActionButton } from "@/components/crm/FloatingActionButton";
import { Plus } from "lucide-react";

type CardType = "project" | "deal" | "task" | "support" | "milestone" | "note";

export default function Stream() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedCardType, setSelectedCardType] = useState<CardType>("project");

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

  const handleCardClick = (cardId: string) => {
    console.log("Card clicked:", cardId);
    // TODO: Navigate to card detail view
  };

  if (!organizationId) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      <CardStream
        organizationId={organizationId}
        onCreateCard={handleCreateCard}
        onCardClick={handleCardClick}
      />

      <FloatingActionButton
        icon={<Plus className="w-5 h-5" />}
        onClick={() => handleCreateCard("project")}
        label="New Card"
      />

      <CardFormDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        organizationId={organizationId}
        defaultType={selectedCardType}
      />
    </div>
  );
}