-- Email integration and tracking tables
CREATE TABLE public.email_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  email_address TEXT NOT NULL,
  provider TEXT NOT NULL, -- 'gmail' or 'outlook'
  access_token TEXT,
  refresh_token TEXT,
  is_active BOOLEAN DEFAULT true,
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.email_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_account_id UUID NOT NULL REFERENCES public.email_accounts(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  deal_id UUID REFERENCES public.deals(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  thread_id TEXT NOT NULL,
  last_message_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.email_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES public.email_threads(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  message_id TEXT NOT NULL,
  from_email TEXT NOT NULL,
  to_emails TEXT[] NOT NULL,
  cc_emails TEXT[],
  subject TEXT NOT NULL,
  body_text TEXT,
  body_html TEXT,
  is_outbound BOOLEAN DEFAULT false,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  replied_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Lead scoring and enrichment
CREATE TABLE public.contact_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID NOT NULL REFERENCES public.contacts(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  total_score INTEGER NOT NULL DEFAULT 0,
  engagement_score INTEGER DEFAULT 0,
  fit_score INTEGER DEFAULT 0,
  activity_score INTEGER DEFAULT 0,
  last_calculated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(contact_id)
);

CREATE TABLE public.company_enrichment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  domain TEXT,
  employee_count TEXT,
  revenue TEXT,
  founded_year INTEGER,
  description TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  facebook_url TEXT,
  technologies TEXT[],
  enriched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(company_id)
);

-- Deal pipeline improvements
ALTER TABLE public.deals 
ADD COLUMN IF NOT EXISTS probability INTEGER DEFAULT 50,
ADD COLUMN IF NOT EXISTS expected_close_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS lost_reason TEXT,
ADD COLUMN IF NOT EXISTS position INTEGER DEFAULT 0;

-- Email campaigns
CREATE TABLE public.email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'scheduled', 'sending', 'sent', 'paused'
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  recipient_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  replied_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.campaign_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.email_campaigns(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES public.contacts(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'sent', 'opened', 'clicked', 'replied', 'bounced'
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_enrichment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_recipients ENABLE ROW LEVEL SECURITY;

-- RLS Policies for email_accounts
CREATE POLICY "Users can view email accounts in their org"
  ON public.email_accounts FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Users can create email accounts in their org"
  ON public.email_accounts FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Users can update their own email accounts"
  ON public.email_accounts FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own email accounts"
  ON public.email_accounts FOR DELETE
  USING (user_id = auth.uid());

-- RLS Policies for email_threads
CREATE POLICY "Members can view email threads in their org"
  ON public.email_threads FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "System can create email threads"
  ON public.email_threads FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can update email threads in their org"
  ON public.email_threads FOR UPDATE
  USING (is_org_member(auth.uid(), organization_id));

-- RLS Policies for email_messages
CREATE POLICY "Members can view email messages in their org"
  ON public.email_messages FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "System can create email messages"
  ON public.email_messages FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

-- RLS Policies for email_templates
CREATE POLICY "Members can view templates in their org"
  ON public.email_templates FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can create templates in their org"
  ON public.email_templates FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can update templates in their org"
  ON public.email_templates FOR UPDATE
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can delete templates in their org"
  ON public.email_templates FOR DELETE
  USING (is_org_member(auth.uid(), organization_id));

-- RLS Policies for contact_scores
CREATE POLICY "Members can view contact scores in their org"
  ON public.contact_scores FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "System can create contact scores"
  ON public.contact_scores FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "System can update contact scores"
  ON public.contact_scores FOR UPDATE
  USING (is_org_member(auth.uid(), organization_id));

-- RLS Policies for company_enrichment
CREATE POLICY "Members can view company enrichment in their org"
  ON public.company_enrichment FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.companies c
    WHERE c.id = company_enrichment.company_id
    AND is_org_member(auth.uid(), c.organization_id)
  ));

CREATE POLICY "System can create company enrichment"
  ON public.company_enrichment FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System can update company enrichment"
  ON public.company_enrichment FOR UPDATE
  USING (true);

-- RLS Policies for email_campaigns
CREATE POLICY "Members can view campaigns in their org"
  ON public.email_campaigns FOR SELECT
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can create campaigns in their org"
  ON public.email_campaigns FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can update campaigns in their org"
  ON public.email_campaigns FOR UPDATE
  USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can delete campaigns in their org"
  ON public.email_campaigns FOR DELETE
  USING (is_org_member(auth.uid(), organization_id));

-- RLS Policies for campaign_recipients
CREATE POLICY "Members can view campaign recipients in their org"
  ON public.campaign_recipients FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.email_campaigns ec
    WHERE ec.id = campaign_recipients.campaign_id
    AND is_org_member(auth.uid(), ec.organization_id)
  ));

CREATE POLICY "System can create campaign recipients"
  ON public.campaign_recipients FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System can update campaign recipients"
  ON public.campaign_recipients FOR UPDATE
  USING (true);

-- Triggers for updated_at
CREATE TRIGGER update_email_accounts_updated_at
  BEFORE UPDATE ON public.email_accounts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_email_threads_updated_at
  BEFORE UPDATE ON public.email_threads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at
  BEFORE UPDATE ON public.email_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_scores_updated_at
  BEFORE UPDATE ON public.contact_scores
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_email_campaigns_updated_at
  BEFORE UPDATE ON public.email_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for performance
CREATE INDEX idx_email_threads_contact ON public.email_threads(contact_id);
CREATE INDEX idx_email_threads_company ON public.email_threads(company_id);
CREATE INDEX idx_email_threads_deal ON public.email_threads(deal_id);
CREATE INDEX idx_email_threads_org ON public.email_threads(organization_id);
CREATE INDEX idx_email_messages_thread ON public.email_messages(thread_id);
CREATE INDEX idx_contact_scores_contact ON public.contact_scores(contact_id);
CREATE INDEX idx_company_enrichment_company ON public.company_enrichment(company_id);