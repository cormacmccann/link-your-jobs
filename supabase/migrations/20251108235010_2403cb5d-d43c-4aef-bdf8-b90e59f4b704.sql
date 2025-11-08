-- Create card_comments table for collaboration
CREATE TABLE IF NOT EXISTS public.card_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id UUID NOT NULL REFERENCES public.cards(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create card_activities table for tracking all changes
CREATE TABLE IF NOT EXISTS public.card_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id UUID NOT NULL REFERENCES public.cards(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  activity_type TEXT NOT NULL,
  activity_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create card_attachments table for file uploads
CREATE TABLE IF NOT EXISTS public.card_attachments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id UUID NOT NULL REFERENCES public.cards(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  uploaded_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.card_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_attachments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for card_comments (organization-scoped)
CREATE POLICY "Users can view comments in their organization"
ON public.card_comments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.cards
    WHERE cards.id = card_comments.card_id
    AND is_org_member(auth.uid(), cards.organization_id)
  )
);

CREATE POLICY "Users can create comments in their organization"
ON public.card_comments FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.cards
    WHERE cards.id = card_comments.card_id
    AND is_org_member(auth.uid(), cards.organization_id)
  )
  AND auth.uid() = user_id
);

CREATE POLICY "Users can update their own comments"
ON public.card_comments FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
ON public.card_comments FOR DELETE
USING (auth.uid() = user_id);

-- RLS Policies for card_activities (organization-scoped, read-only for users)
CREATE POLICY "Users can view activities in their organization"
ON public.card_activities FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.cards
    WHERE cards.id = card_activities.card_id
    AND is_org_member(auth.uid(), cards.organization_id)
  )
);

-- RLS Policies for card_attachments (organization-scoped)
CREATE POLICY "Users can view attachments in their organization"
ON public.card_attachments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.cards
    WHERE cards.id = card_attachments.card_id
    AND is_org_member(auth.uid(), cards.organization_id)
  )
);

CREATE POLICY "Users can upload attachments in their organization"
ON public.card_attachments FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.cards
    WHERE cards.id = card_attachments.card_id
    AND is_org_member(auth.uid(), cards.organization_id)
  )
  AND auth.uid() = uploaded_by
);

CREATE POLICY "Users can delete their own attachments"
ON public.card_attachments FOR DELETE
USING (auth.uid() = uploaded_by);

-- Create indexes for performance
CREATE INDEX idx_card_comments_card ON public.card_comments(card_id);
CREATE INDEX idx_card_comments_user ON public.card_comments(user_id);
CREATE INDEX idx_card_activities_card ON public.card_activities(card_id);
CREATE INDEX idx_card_activities_user ON public.card_activities(user_id);
CREATE INDEX idx_card_attachments_card ON public.card_attachments(card_id);
CREATE INDEX idx_card_attachments_user ON public.card_attachments(uploaded_by);

-- Trigger for updating card_comments.updated_at
CREATE TRIGGER update_card_comments_updated_at
BEFORE UPDATE ON public.card_comments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Realtime for all three tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.card_comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.card_activities;
ALTER PUBLICATION supabase_realtime ADD TABLE public.card_attachments;