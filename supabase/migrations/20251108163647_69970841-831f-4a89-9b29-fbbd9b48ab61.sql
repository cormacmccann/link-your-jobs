-- Create enums for card system
CREATE TYPE card_type_enum AS ENUM ('project', 'deal', 'task', 'support', 'milestone', 'note');
CREATE TYPE card_status_enum AS ENUM ('active', 'completed', 'archived', 'cancelled');
CREATE TYPE card_priority_enum AS ENUM ('urgent', 'high', 'normal', 'low');

-- Create unified cards table
CREATE TABLE IF NOT EXISTS public.cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  card_type card_type_enum NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status card_status_enum NOT NULL DEFAULT 'active',
  priority card_priority_enum NOT NULL DEFAULT 'normal',
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  related_contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  related_company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  position INTEGER NOT NULL DEFAULT 0,
  parent_card_id UUID REFERENCES public.cards(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_cards_org ON public.cards(organization_id);
CREATE INDEX idx_cards_type ON public.cards(card_type);
CREATE INDEX idx_cards_status ON public.cards(status);
CREATE INDEX idx_cards_assigned ON public.cards(assigned_to);
CREATE INDEX idx_cards_created ON public.cards(created_at DESC);
CREATE INDEX idx_cards_position ON public.cards(position);
CREATE INDEX idx_cards_parent ON public.cards(parent_card_id);

-- Full-text search index
CREATE INDEX idx_cards_search ON public.cards USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- Enable RLS
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Members can view cards in their org"
  ON public.cards FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can create cards in their org"
  ON public.cards FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can update cards in their org"
  ON public.cards FOR UPDATE
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can delete cards in their org"
  ON public.cards FOR DELETE
  USING (is_org_member(auth.uid(), organization_id));

-- Trigger for updated_at
CREATE TRIGGER update_cards_updated_at
  BEFORE UPDATE ON public.cards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();