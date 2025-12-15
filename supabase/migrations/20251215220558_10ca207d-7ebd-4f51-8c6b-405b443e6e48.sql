
-- =============================================
-- KAMROK SUPER APP: Phase 1 Database Migration
-- =============================================

-- 1. QUOTES TABLE
CREATE TABLE public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  related_contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  related_company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  related_deal_id UUID REFERENCES public.deals(id) ON DELETE SET NULL,
  
  quote_number TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  
  subtotal NUMERIC NOT NULL DEFAULT 0,
  tax_amount NUMERIC DEFAULT 0,
  discount_amount NUMERIC DEFAULT 0,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'EUR',
  
  status TEXT NOT NULL DEFAULT 'draft',
  
  valid_until TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  viewed_at TIMESTAMP WITH TIME ZONE,
  accepted_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE,
  
  client_signature TEXT,
  client_notes TEXT,
  
  converted_to_invoice_id UUID REFERENCES public.invoices(id) ON DELETE SET NULL,
  converted_to_project_id UUID REFERENCES public.cards(id) ON DELETE SET NULL,
  
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. QUOTE ITEMS TABLE
CREATE TABLE public.quote_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity NUMERIC NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL,
  amount NUMERIC NOT NULL,
  tax_rate NUMERIC DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. CONTRACTS TABLE
CREATE TABLE public.contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  related_contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  related_company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  related_deal_id UUID REFERENCES public.deals(id) ON DELETE SET NULL,
  related_quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
  
  contract_number TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  
  status TEXT NOT NULL DEFAULT 'draft',
  
  requires_signature BOOLEAN DEFAULT true,
  signature_type TEXT DEFAULT 'typed',
  signer_name TEXT,
  signer_email TEXT,
  signer_ip TEXT,
  signed_at TIMESTAMP WITH TIME ZONE,
  signature_data TEXT,
  
  sent_at TIMESTAMP WITH TIME ZONE,
  viewed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  
  pdf_url TEXT,
  signed_pdf_url TEXT,
  
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. CALENDAR EVENTS TABLE
CREATE TABLE public.calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  related_contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  related_company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  related_deal_id UUID REFERENCES public.deals(id) ON DELETE SET NULL,
  related_card_id UUID REFERENCES public.cards(id) ON DELETE SET NULL,
  
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  
  starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
  all_day BOOLEAN DEFAULT false,
  timezone TEXT DEFAULT 'Europe/Dublin',
  
  event_type TEXT DEFAULT 'meeting',
  status TEXT DEFAULT 'scheduled',
  
  attendees JSONB DEFAULT '[]',
  
  external_calendar_id TEXT,
  external_event_id TEXT,
  
  is_recurring BOOLEAN DEFAULT false,
  recurrence_rule TEXT,
  
  reminders JSONB DEFAULT '[{"minutes_before": 30, "type": "email"}]',
  
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. BOOKING SLOTS TABLE
CREATE TABLE public.booking_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  
  title TEXT NOT NULL DEFAULT 'Meeting',
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  
  availability JSONB NOT NULL DEFAULT '{}',
  
  buffer_before_minutes INTEGER DEFAULT 0,
  buffer_after_minutes INTEGER DEFAULT 0,
  
  max_bookings_per_day INTEGER,
  advance_booking_days INTEGER DEFAULT 30,
  
  slug TEXT UNIQUE,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 6. TIME ENTRIES TABLE
CREATE TABLE public.time_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  
  related_contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  related_company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  related_card_id UUID REFERENCES public.cards(id) ON DELETE SET NULL,
  related_deal_id UUID REFERENCES public.deals(id) ON DELETE SET NULL,
  related_invoice_id UUID REFERENCES public.invoices(id) ON DELETE SET NULL,
  
  description TEXT NOT NULL,
  
  started_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  
  is_billable BOOLEAN DEFAULT true,
  hourly_rate NUMERIC,
  total_amount NUMERIC,
  is_invoiced BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 7. ACTIVITY LOG TABLE (The Unifier)
CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  
  contact_id UUID REFERENCES public.contacts(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  
  activity_type TEXT NOT NULL,
  activity_title TEXT NOT NULL,
  activity_description TEXT,
  activity_metadata JSONB DEFAULT '{}',
  
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  
  performed_by UUID,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- INDEXES
CREATE INDEX idx_quotes_organization ON public.quotes(organization_id);
CREATE INDEX idx_quotes_contact ON public.quotes(related_contact_id);
CREATE INDEX idx_quotes_company ON public.quotes(related_company_id);
CREATE INDEX idx_quotes_status ON public.quotes(status);

CREATE INDEX idx_contracts_organization ON public.contracts(organization_id);
CREATE INDEX idx_contracts_contact ON public.contracts(related_contact_id);
CREATE INDEX idx_contracts_company ON public.contracts(related_company_id);
CREATE INDEX idx_contracts_status ON public.contracts(status);

CREATE INDEX idx_calendar_events_organization ON public.calendar_events(organization_id);
CREATE INDEX idx_calendar_events_contact ON public.calendar_events(related_contact_id);
CREATE INDEX idx_calendar_events_starts_at ON public.calendar_events(starts_at);

CREATE INDEX idx_time_entries_organization ON public.time_entries(organization_id);
CREATE INDEX idx_time_entries_user ON public.time_entries(user_id);
CREATE INDEX idx_time_entries_contact ON public.time_entries(related_contact_id);

CREATE INDEX idx_activity_log_contact ON public.activity_log(contact_id, created_at DESC);
CREATE INDEX idx_activity_log_company ON public.activity_log(company_id, created_at DESC);
CREATE INDEX idx_activity_log_organization ON public.activity_log(organization_id, created_at DESC);

-- ENABLE RLS
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES
CREATE POLICY "Users can view quotes in their organization" ON public.quotes
  FOR SELECT USING (organization_id IN (
    SELECT organization_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can manage quotes in their organization" ON public.quotes
  FOR ALL USING (organization_id IN (
    SELECT organization_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can view quote items" ON public.quote_items
  FOR SELECT USING (quote_id IN (
    SELECT id FROM public.quotes WHERE organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid()
    )
  ));

CREATE POLICY "Users can manage quote items" ON public.quote_items
  FOR ALL USING (quote_id IN (
    SELECT id FROM public.quotes WHERE organization_id IN (
      SELECT organization_id FROM public.profiles WHERE id = auth.uid()
    )
  ));

CREATE POLICY "Users can view contracts in their organization" ON public.contracts
  FOR SELECT USING (organization_id IN (
    SELECT organization_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can manage contracts in their organization" ON public.contracts
  FOR ALL USING (organization_id IN (
    SELECT organization_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can view calendar events in their organization" ON public.calendar_events
  FOR SELECT USING (organization_id IN (
    SELECT organization_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can manage calendar events in their organization" ON public.calendar_events
  FOR ALL USING (organization_id IN (
    SELECT organization_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can view booking slots in their organization" ON public.booking_slots
  FOR SELECT USING (organization_id IN (
    SELECT organization_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can manage booking slots in their organization" ON public.booking_slots
  FOR ALL USING (organization_id IN (
    SELECT organization_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Public can view active booking slots" ON public.booking_slots
  FOR SELECT USING (is_active = true AND slug IS NOT NULL);

CREATE POLICY "Users can view time entries in their organization" ON public.time_entries
  FOR SELECT USING (organization_id IN (
    SELECT organization_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can manage time entries in their organization" ON public.time_entries
  FOR ALL USING (organization_id IN (
    SELECT organization_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can view activity log in their organization" ON public.activity_log
  FOR SELECT USING (organization_id IN (
    SELECT organization_id FROM public.profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can insert activity log in their organization" ON public.activity_log
  FOR INSERT WITH CHECK (organization_id IN (
    SELECT organization_id FROM public.profiles WHERE id = auth.uid()
  ));

-- ENABLE REALTIME
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_log;

-- ACTIVITY LOG TRIGGERS

-- Trigger function for quotes
CREATE OR REPLACE FUNCTION log_quote_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.activity_log (
    organization_id, contact_id, company_id, activity_type, activity_title,
    activity_metadata, entity_type, entity_id, performed_by
  ) VALUES (
    NEW.organization_id,
    NEW.related_contact_id,
    NEW.related_company_id,
    CASE 
      WHEN TG_OP = 'INSERT' THEN 'quote_created'
      WHEN NEW.status = 'sent' AND (OLD.status IS NULL OR OLD.status = 'draft') THEN 'quote_sent'
      WHEN NEW.status = 'viewed' AND OLD.status != 'viewed' THEN 'quote_viewed'
      WHEN NEW.status = 'accepted' AND OLD.status != 'accepted' THEN 'quote_accepted'
      WHEN NEW.status = 'rejected' AND OLD.status != 'rejected' THEN 'quote_rejected'
      ELSE 'quote_updated'
    END,
    CASE 
      WHEN TG_OP = 'INSERT' THEN 'Quote ' || NEW.quote_number || ' created - €' || NEW.total_amount
      WHEN NEW.status = 'sent' THEN 'Quote ' || NEW.quote_number || ' sent - €' || NEW.total_amount
      WHEN NEW.status = 'viewed' THEN 'Quote ' || NEW.quote_number || ' viewed by client'
      WHEN NEW.status = 'accepted' THEN 'Quote ' || NEW.quote_number || ' accepted - €' || NEW.total_amount
      WHEN NEW.status = 'rejected' THEN 'Quote ' || NEW.quote_number || ' rejected'
      ELSE 'Quote ' || NEW.quote_number || ' updated'
    END,
    jsonb_build_object('amount', NEW.total_amount, 'status', NEW.status, 'quote_number', NEW.quote_number),
    'quote',
    NEW.id,
    CASE WHEN TG_OP = 'INSERT' THEN NEW.created_by ELSE NULL END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER quote_activity_trigger
  AFTER INSERT OR UPDATE ON public.quotes
  FOR EACH ROW EXECUTE FUNCTION log_quote_activity();

-- Trigger function for contracts
CREATE OR REPLACE FUNCTION log_contract_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.activity_log (
    organization_id, contact_id, company_id, activity_type, activity_title,
    activity_metadata, entity_type, entity_id, performed_by
  ) VALUES (
    NEW.organization_id,
    NEW.related_contact_id,
    NEW.related_company_id,
    CASE 
      WHEN TG_OP = 'INSERT' THEN 'contract_created'
      WHEN NEW.status = 'sent' AND (OLD.status IS NULL OR OLD.status = 'draft') THEN 'contract_sent'
      WHEN NEW.status = 'viewed' AND OLD.status != 'viewed' THEN 'contract_viewed'
      WHEN NEW.status = 'signed' AND OLD.status != 'signed' THEN 'contract_signed'
      ELSE 'contract_updated'
    END,
    CASE 
      WHEN TG_OP = 'INSERT' THEN 'Contract "' || NEW.title || '" created'
      WHEN NEW.status = 'sent' THEN 'Contract "' || NEW.title || '" sent for signature'
      WHEN NEW.status = 'viewed' THEN 'Contract "' || NEW.title || '" viewed by client'
      WHEN NEW.status = 'signed' THEN 'Contract "' || NEW.title || '" signed by ' || COALESCE(NEW.signer_name, 'client')
      ELSE 'Contract "' || NEW.title || '" updated'
    END,
    jsonb_build_object('status', NEW.status, 'contract_number', NEW.contract_number),
    'contract',
    NEW.id,
    CASE WHEN TG_OP = 'INSERT' THEN NEW.created_by ELSE NULL END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER contract_activity_trigger
  AFTER INSERT OR UPDATE ON public.contracts
  FOR EACH ROW EXECUTE FUNCTION log_contract_activity();

-- Trigger function for calendar events
CREATE OR REPLACE FUNCTION log_calendar_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.activity_log (
    organization_id, contact_id, company_id, activity_type, activity_title,
    activity_metadata, entity_type, entity_id, performed_by
  ) VALUES (
    NEW.organization_id,
    NEW.related_contact_id,
    NEW.related_company_id,
    CASE 
      WHEN TG_OP = 'INSERT' THEN 'meeting_scheduled'
      WHEN NEW.status = 'completed' AND OLD.status != 'completed' THEN 'meeting_completed'
      WHEN NEW.status = 'cancelled' AND OLD.status != 'cancelled' THEN 'meeting_cancelled'
      ELSE 'meeting_updated'
    END,
    CASE 
      WHEN TG_OP = 'INSERT' THEN NEW.event_type || ' scheduled: ' || NEW.title
      WHEN NEW.status = 'completed' THEN NEW.event_type || ' completed: ' || NEW.title
      WHEN NEW.status = 'cancelled' THEN NEW.event_type || ' cancelled: ' || NEW.title
      ELSE NEW.event_type || ' updated: ' || NEW.title
    END,
    jsonb_build_object('event_type', NEW.event_type, 'starts_at', NEW.starts_at, 'ends_at', NEW.ends_at),
    'calendar_event',
    NEW.id,
    NEW.created_by
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER calendar_activity_trigger
  AFTER INSERT OR UPDATE ON public.calendar_events
  FOR EACH ROW EXECUTE FUNCTION log_calendar_activity();

-- Trigger function for time entries
CREATE OR REPLACE FUNCTION log_time_entry_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.ended_at IS NOT NULL AND OLD.ended_at IS NULL) THEN
    INSERT INTO public.activity_log (
      organization_id, contact_id, company_id, activity_type, activity_title,
      activity_metadata, entity_type, entity_id, performed_by
    ) VALUES (
      NEW.organization_id,
      NEW.related_contact_id,
      NEW.related_company_id,
      CASE WHEN NEW.ended_at IS NOT NULL THEN 'time_logged' ELSE 'time_started' END,
      CASE 
        WHEN NEW.ended_at IS NOT NULL THEN 'Time logged: ' || COALESCE(NEW.duration_minutes, 0) || ' minutes - ' || NEW.description
        ELSE 'Timer started: ' || NEW.description
      END,
      jsonb_build_object(
        'duration_minutes', NEW.duration_minutes,
        'is_billable', NEW.is_billable,
        'hourly_rate', NEW.hourly_rate,
        'total_amount', NEW.total_amount
      ),
      'time_entry',
      NEW.id,
      NEW.user_id
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER time_entry_activity_trigger
  AFTER INSERT OR UPDATE ON public.time_entries
  FOR EACH ROW EXECUTE FUNCTION log_time_entry_activity();

-- Trigger for invoices (add to existing)
CREATE OR REPLACE FUNCTION log_invoice_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.activity_log (
    organization_id, contact_id, company_id, activity_type, activity_title,
    activity_metadata, entity_type, entity_id, performed_by
  ) VALUES (
    NEW.organization_id,
    NEW.related_contact_id,
    NEW.related_company_id,
    CASE 
      WHEN TG_OP = 'INSERT' THEN 'invoice_created'
      WHEN NEW.status = 'sent' AND (OLD.status IS NULL OR OLD.status = 'draft') THEN 'invoice_sent'
      WHEN NEW.status = 'paid' AND OLD.status != 'paid' THEN 'invoice_paid'
      ELSE 'invoice_updated'
    END,
    CASE 
      WHEN TG_OP = 'INSERT' THEN 'Invoice ' || NEW.invoice_number || ' created - €' || NEW.total_amount
      WHEN NEW.status = 'sent' THEN 'Invoice ' || NEW.invoice_number || ' sent - €' || NEW.total_amount
      WHEN NEW.status = 'paid' THEN 'Invoice ' || NEW.invoice_number || ' paid - €' || NEW.total_amount
      ELSE 'Invoice ' || NEW.invoice_number || ' updated'
    END,
    jsonb_build_object('amount', NEW.total_amount, 'status', NEW.status, 'invoice_number', NEW.invoice_number),
    'invoice',
    NEW.id,
    NEW.created_by
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER invoice_activity_trigger
  AFTER INSERT OR UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION log_invoice_activity();

-- Trigger for cards (projects, tasks, support)
CREATE OR REPLACE FUNCTION log_card_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.activity_log (
    organization_id, contact_id, company_id, activity_type, activity_title,
    activity_metadata, entity_type, entity_id, performed_by
  ) VALUES (
    NEW.organization_id,
    NEW.related_contact_id,
    NEW.related_company_id,
    CASE 
      WHEN TG_OP = 'INSERT' THEN NEW.card_type || '_created'
      WHEN NEW.status = 'completed' AND OLD.status != 'completed' THEN NEW.card_type || '_completed'
      ELSE NEW.card_type || '_updated'
    END,
    CASE 
      WHEN TG_OP = 'INSERT' THEN initcap(NEW.card_type::text) || ' created: ' || NEW.title
      WHEN NEW.status = 'completed' THEN initcap(NEW.card_type::text) || ' completed: ' || NEW.title
      ELSE initcap(NEW.card_type::text) || ' updated: ' || NEW.title
    END,
    jsonb_build_object('card_type', NEW.card_type, 'status', NEW.status, 'priority', NEW.priority),
    'card',
    NEW.id,
    NEW.created_by
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER card_activity_trigger
  AFTER INSERT OR UPDATE ON public.cards
  FOR EACH ROW EXECUTE FUNCTION log_card_activity();

-- Update timestamp triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON public.quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON public.contracts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_calendar_events_updated_at BEFORE UPDATE ON public.calendar_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_booking_slots_updated_at BEFORE UPDATE ON public.booking_slots FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_time_entries_updated_at BEFORE UPDATE ON public.time_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
