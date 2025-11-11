-- Add super admin role to enum
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'super_admin';

-- Create client onboarding tables
CREATE TABLE IF NOT EXISTS public.client_portals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  client_company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  client_contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE,
  portal_name TEXT NOT NULL,
  welcome_message TEXT,
  is_active BOOLEAN DEFAULT true,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.portal_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portal_id UUID NOT NULL REFERENCES public.client_portals(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL, -- 'questionnaire', 'howto', 'products', 'service_plans', 'documents'
  title TEXT NOT NULL,
  description TEXT,
  content JSONB DEFAULT '{}',
  position INTEGER DEFAULT 0,
  is_required BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.portal_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portal_id UUID NOT NULL REFERENCES public.client_portals(id) ON DELETE CASCADE,
  section_id UUID NOT NULL REFERENCES public.portal_sections(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES public.contacts(id),
  response_data JSONB DEFAULT '{}',
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create project activity feed table
CREATE TABLE IF NOT EXISTS public.project_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.cards(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  assigned_to UUID REFERENCES auth.users(id),
  post_type TEXT DEFAULT 'update', -- 'update', 'question', 'decision', 'milestone'
  parent_post_id UUID REFERENCES public.project_posts(id) ON DELETE CASCADE,
  attachments JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.client_portals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portal_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portal_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for client_portals
CREATE POLICY "Members can view org portals"
  ON public.client_portals FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can create org portals"
  ON public.client_portals FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can update org portals"
  ON public.client_portals FOR UPDATE
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can delete org portals"
  ON public.client_portals FOR DELETE
  USING (is_org_member(auth.uid(), organization_id));

-- RLS Policies for portal_sections
CREATE POLICY "Members can view portal sections"
  ON public.portal_sections FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.client_portals cp
    WHERE cp.id = portal_sections.portal_id
    AND is_org_member(auth.uid(), cp.organization_id)
  ));

CREATE POLICY "Members can create portal sections"
  ON public.portal_sections FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.client_portals cp
    WHERE cp.id = portal_sections.portal_id
    AND is_org_member(auth.uid(), cp.organization_id)
  ));

CREATE POLICY "Members can update portal sections"
  ON public.portal_sections FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.client_portals cp
    WHERE cp.id = portal_sections.portal_id
    AND is_org_member(auth.uid(), cp.organization_id)
  ));

CREATE POLICY "Members can delete portal sections"
  ON public.portal_sections FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.client_portals cp
    WHERE cp.id = portal_sections.portal_id
    AND is_org_member(auth.uid(), cp.organization_id)
  ));

-- RLS Policies for portal_responses
CREATE POLICY "Members can view portal responses"
  ON public.portal_responses FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.client_portals cp
    WHERE cp.id = portal_responses.portal_id
    AND is_org_member(auth.uid(), cp.organization_id)
  ));

CREATE POLICY "Contacts can create their responses"
  ON public.portal_responses FOR INSERT
  WITH CHECK (auth.uid() = contact_id OR EXISTS (
    SELECT 1 FROM public.client_portals cp
    WHERE cp.id = portal_responses.portal_id
    AND is_org_member(auth.uid(), cp.organization_id)
  ));

CREATE POLICY "Members can update portal responses"
  ON public.portal_responses FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.client_portals cp
    WHERE cp.id = portal_responses.portal_id
    AND is_org_member(auth.uid(), cp.organization_id)
  ));

-- RLS Policies for project_posts
CREATE POLICY "Members can view project posts"
  ON public.project_posts FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can create project posts"
  ON public.project_posts FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Users can update their own posts"
  ON public.project_posts FOR UPDATE
  USING (created_by = auth.uid());

CREATE POLICY "Users can delete their own posts"
  ON public.project_posts FOR DELETE
  USING (created_by = auth.uid());

-- Create updated_at triggers
CREATE TRIGGER update_client_portals_updated_at
  BEFORE UPDATE ON public.client_portals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portal_sections_updated_at
  BEFORE UPDATE ON public.portal_sections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portal_responses_updated_at
  BEFORE UPDATE ON public.portal_responses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_posts_updated_at
  BEFORE UPDATE ON public.project_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();