import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UnifiedCard } from "./UnifiedCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type CardType = "project" | "deal" | "task" | "support" | "milestone" | "note";
type FilterType = "all" | CardType | "assigned-to-me" | "due-today" | "urgent" | "my-projects";

const typeFilterOptions: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "project", label: "Projects" },
  { value: "deal", label: "Deals" },
  { value: "task", label: "Tasks" },
  { value: "support", label: "Support" },
  { value: "milestone", label: "Milestones" },
  { value: "note", label: "Notes" }
];

const smartFilterOptions: { value: FilterType; label: string }[] = [
  { value: "assigned-to-me", label: "Assigned to Me" },
  { value: "due-today", label: "Due Today" },
  { value: "urgent", label: "Urgent" },
  { value: "my-projects", label: "My Projects" }
];

interface CardStreamProps {
  organizationId: string;
  onCreateCard?: (type: CardType) => void;
  onCardClick?: (cardId: string) => void;
}

export function CardStream({ organizationId, onCardClick }: CardStreamProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      return data;
    }
  });

  const user = userData?.user;

  const { data: cards = [], isLoading } = useQuery({
    queryKey: ["cards", organizationId, activeFilter, searchQuery, user?.id],
    queryFn: async () => {
      let query = supabase
        .from("cards")
        .select("*")
        .eq("organization_id", organizationId)
        .order("created_at", { ascending: false });

      // Handle smart filters
      if (activeFilter === "assigned-to-me" && user) {
        query = query.eq("assigned_to", user.id);
      } else if (activeFilter === "due-today") {
        const today = new Date().toISOString().split('T')[0];
        query = query.gte("due_date", today).lt("due_date", `${today}T23:59:59`);
      } else if (activeFilter === "urgent") {
        query = query.eq("priority", "urgent");
      } else if (activeFilter === "my-projects") {
        query = query.eq("card_type", "project").eq("created_by", user?.id);
      } else if (activeFilter !== "all" && !activeFilter.includes("-")) {
        // Type filters (only if not a smart filter)
        query = query.eq("card_type", activeFilter as CardType);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  const filteredCards = cards;

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="sticky top-0 z-10 bg-background border-b p-4 space-y-4">
        {/* Smart Filters */}
        <div className="flex gap-2 flex-wrap">
          {smartFilterOptions.map((filter) => (
            <Badge
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              className="cursor-pointer font-medium"
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </Badge>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search everything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-9"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        {/* Type Filter Pills */}
        <div className="flex gap-2 flex-wrap">
          {typeFilterOptions.map((filter) => (
            <Badge
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Card Stream */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3 max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Loading...</p>
            </div>
          ) : filteredCards.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No items found</p>
            </div>
          ) : (
            filteredCards.map((card) => (
              <UnifiedCard 
                key={card.id} 
                id={card.id}
                cardType={card.card_type as CardType}
                title={card.title}
                description={card.description || undefined}
                status={card.status as any}
                priority={card.priority as any}
                assignedTo={card.assigned_to || undefined}
                dueDate={card.due_date || undefined}
                relatedContact={card.related_contact_id || undefined}
                onClick={() => onCardClick?.(card.id)}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
