import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UnifiedCard } from "./UnifiedCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type CardType = "project" | "deal" | "task" | "support" | "milestone" | "note";
type CardStatus = "active" | "completed" | "archived";

interface CardStreamProps {
  organizationId: string;
  onCreateCard: (type: CardType) => void;
  onCardClick: (cardId: string) => void;
}

const cardTypeFilters: { value: CardType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "project", label: "Projects" },
  { value: "deal", label: "Deals" },
  { value: "task", label: "Tasks" },
  { value: "support", label: "Support" },
  { value: "milestone", label: "Milestones" },
  { value: "note", label: "Notes" }
];

const statusFilters: { value: CardStatus | "all"; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" }
];

export function CardStream({ organizationId, onCreateCard, onCardClick }: CardStreamProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<CardType | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<CardStatus | "all">("active");
  const [showFilters, setShowFilters] = useState(false);

  const { data: cards, isLoading } = useQuery({
    queryKey: ["cards", organizationId, selectedType, selectedStatus, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from("cards")
        .select("*")
        .eq("organization_id", organizationId)
        .order("created_at", { ascending: false });

      if (selectedType !== "all") {
        query = query.eq("card_type", selectedType);
      }

      if (selectedStatus !== "all") {
        query = query.eq("status", selectedStatus);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-4 border-b">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search all cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Filter Pills */}
        {showFilters && (
          <div className="mt-4 space-y-3">
            <div className="flex gap-2 flex-wrap">
              {cardTypeFilters.map((filter) => (
                <Badge
                  key={filter.value}
                  variant={selectedType === filter.value ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer",
                    selectedType === filter.value && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => setSelectedType(filter.value)}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {statusFilters.map((filter) => (
                <Badge
                  key={filter.value}
                  variant={selectedStatus === filter.value ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer",
                    selectedStatus === filter.value && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => setSelectedStatus(filter.value)}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cards Stream */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Loading cards...</p>
          </div>
        ) : cards && cards.length > 0 ? (
          <div className="space-y-2">
            {cards.map((card) => (
              <UnifiedCard
                key={card.id}
                id={card.id}
                cardType={card.card_type}
                title={card.title}
                description={card.description || undefined}
                status={card.status}
                priority={card.priority}
                dueDate={card.due_date ? new Date(card.due_date) : undefined}
                createdAt={new Date(card.created_at)}
                updatedAt={new Date(card.updated_at)}
                metadata={typeof card.metadata === 'object' && card.metadata !== null ? card.metadata as Record<string, any> : undefined}
                onClick={() => onCardClick(card.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">
              {searchQuery || selectedType !== "all" || selectedStatus !== "active"
                ? "No cards found matching your filters"
                : "No cards yet. Create your first card to get started!"}
            </p>
            <Button onClick={() => onCreateCard("project")}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Card
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}