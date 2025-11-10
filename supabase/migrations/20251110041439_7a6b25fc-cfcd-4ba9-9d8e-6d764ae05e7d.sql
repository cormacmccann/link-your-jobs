-- ============================================
-- MISSION CONTROL DATABASE SCHEMA
-- ============================================

-- ============================================
-- INVOICES SYSTEM
-- ============================================

-- Invoices table
CREATE TABLE invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  invoice_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  related_contact_id uuid REFERENCES contacts(id) ON DELETE SET NULL,
  related_company_id uuid REFERENCES companies(id) ON DELETE SET NULL,
  related_deal_id uuid REFERENCES deals(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'draft', -- draft, sent, paid, overdue, cancelled
  total_amount decimal(12,2) NOT NULL,
  tax_amount decimal(12,2) DEFAULT 0,
  discount_amount decimal(12,2) DEFAULT 0,
  currency text DEFAULT 'USD',
  due_date timestamp with time zone,
  issue_date timestamp with time zone DEFAULT now(),
  paid_at timestamp with time zone,
  stripe_invoice_id text,
  stripe_payment_intent_id text,
  payment_link text,
  notes text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_by uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Invoice line items
CREATE TABLE invoice_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid REFERENCES invoices(id) ON DELETE CASCADE NOT NULL,
  description text NOT NULL,
  quantity decimal(10,2) NOT NULL DEFAULT 1,
  unit_price decimal(12,2) NOT NULL,
  amount decimal(12,2) NOT NULL,
  tax_rate decimal(5,2) DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- Indexes for invoices
CREATE INDEX idx_invoices_org ON invoices(organization_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_customer_email ON invoices(customer_email);
CREATE INDEX idx_invoices_stripe ON invoices(stripe_invoice_id);
CREATE INDEX idx_invoice_items_invoice ON invoice_items(invoice_id);

-- RLS for invoices
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view org invoices" ON invoices FOR SELECT USING (is_org_member(auth.uid(), organization_id));
CREATE POLICY "Users can create org invoices" ON invoices FOR INSERT WITH CHECK (is_org_member(auth.uid(), organization_id));
CREATE POLICY "Users can update org invoices" ON invoices FOR UPDATE USING (is_org_member(auth.uid(), organization_id));
CREATE POLICY "Users can delete org invoices" ON invoices FOR DELETE USING (is_org_member(auth.uid(), organization_id));

ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view invoice items" ON invoice_items FOR SELECT 
  USING (EXISTS (SELECT 1 FROM invoices WHERE id = invoice_items.invoice_id AND is_org_member(auth.uid(), organization_id)));
CREATE POLICY "Users can create invoice items" ON invoice_items FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM invoices WHERE id = invoice_items.invoice_id AND is_org_member(auth.uid(), organization_id)));
CREATE POLICY "Users can update invoice items" ON invoice_items FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM invoices WHERE id = invoice_items.invoice_id AND is_org_member(auth.uid(), organization_id)));
CREATE POLICY "Users can delete invoice items" ON invoice_items FOR DELETE 
  USING (EXISTS (SELECT 1 FROM invoices WHERE id = invoice_items.invoice_id AND is_org_member(auth.uid(), organization_id)));

-- Invoice number generator function
CREATE OR REPLACE FUNCTION generate_invoice_number(org_id uuid)
RETURNS text AS $$
DECLARE
  year_suffix text;
  sequence_num integer;
  invoice_num text;
BEGIN
  year_suffix := TO_CHAR(CURRENT_DATE, 'YY');
  
  SELECT COALESCE(MAX(
    CAST(SUBSTRING(invoice_number FROM '\d+$') AS integer)
  ), 0) + 1
  INTO sequence_num
  FROM invoices
  WHERE organization_id = org_id
  AND invoice_number LIKE 'INV-' || year_suffix || '-%';
  
  invoice_num := 'INV-' || year_suffix || '-' || LPAD(sequence_num::text, 4, '0');
  RETURN invoice_num;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- CHAT SYSTEM
-- ============================================

-- Chat conversations
CREATE TABLE chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  visitor_id text NOT NULL,
  contact_id uuid REFERENCES contacts(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'active', -- active, resolved, archived
  assigned_to uuid REFERENCES profiles(id) ON DELETE SET NULL,
  first_message_at timestamp with time zone,
  last_message_at timestamp with time zone,
  visitor_email text,
  visitor_name text,
  visitor_metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Chat messages
CREATE TABLE chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES chat_conversations(id) ON DELETE CASCADE NOT NULL,
  message_type text NOT NULL DEFAULT 'text', -- text, file, system
  message_content text NOT NULL,
  sender_type text NOT NULL, -- visitor, agent, system
  sender_id uuid,
  file_url text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable realtime for chat
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_conversations;

-- Indexes for chat
CREATE INDEX idx_chat_conv_org ON chat_conversations(organization_id);
CREATE INDEX idx_chat_conv_status ON chat_conversations(status);
CREATE INDEX idx_chat_conv_visitor ON chat_conversations(visitor_id);
CREATE INDEX idx_chat_messages_conv ON chat_messages(conversation_id);
CREATE INDEX idx_chat_messages_created ON chat_messages(created_at);

-- RLS for chat
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view org chats" ON chat_conversations FOR SELECT USING (is_org_member(auth.uid(), organization_id));
CREATE POLICY "Users can create org chats" ON chat_conversations FOR INSERT WITH CHECK (is_org_member(auth.uid(), organization_id));
CREATE POLICY "Users can update org chats" ON chat_conversations FOR UPDATE USING (is_org_member(auth.uid(), organization_id));
CREATE POLICY "Public can create chats" ON chat_conversations FOR INSERT WITH CHECK (true);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view messages in org chats" ON chat_messages FOR SELECT 
  USING (EXISTS (SELECT 1 FROM chat_conversations WHERE id = conversation_id AND is_org_member(auth.uid(), organization_id)));
CREATE POLICY "Users can create messages" ON chat_messages FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM chat_conversations WHERE id = conversation_id));
CREATE POLICY "Public can create messages" ON chat_messages FOR INSERT WITH CHECK (true);

-- ============================================
-- AUTOMATION SYSTEM
-- ============================================

-- Automation workflows
CREATE TABLE automation_workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  trigger_type text NOT NULL, -- card_created, card_updated, card_status_changed, email_received, time_based
  trigger_config jsonb NOT NULL DEFAULT '{}'::jsonb,
  actions jsonb NOT NULL DEFAULT '[]'::jsonb,
  conditions jsonb DEFAULT '[]'::jsonb,
  enabled boolean DEFAULT true,
  run_count integer DEFAULT 0,
  last_run_at timestamp with time zone,
  created_by uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Automation execution logs
CREATE TABLE automation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id uuid REFERENCES automation_workflows(id) ON DELETE CASCADE NOT NULL,
  trigger_data jsonb,
  status text NOT NULL, -- success, failed, partial
  error_message text,
  actions_executed jsonb DEFAULT '[]'::jsonb,
  execution_time_ms integer,
  created_at timestamp with time zone DEFAULT now()
);

-- Indexes for automations
CREATE INDEX idx_automation_workflows_org ON automation_workflows(organization_id);
CREATE INDEX idx_automation_workflows_enabled ON automation_workflows(enabled);
CREATE INDEX idx_automation_workflows_trigger ON automation_workflows(trigger_type);
CREATE INDEX idx_automation_logs_workflow ON automation_logs(workflow_id);
CREATE INDEX idx_automation_logs_created ON automation_logs(created_at);

-- RLS for automations
ALTER TABLE automation_workflows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view org automations" ON automation_workflows FOR SELECT USING (is_org_member(auth.uid(), organization_id));
CREATE POLICY "Users can create org automations" ON automation_workflows FOR INSERT WITH CHECK (is_org_member(auth.uid(), organization_id));
CREATE POLICY "Users can update org automations" ON automation_workflows FOR UPDATE USING (is_org_member(auth.uid(), organization_id));
CREATE POLICY "Users can delete org automations" ON automation_workflows FOR DELETE USING (is_org_member(auth.uid(), organization_id));

ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view automation logs" ON automation_logs FOR SELECT 
  USING (EXISTS (SELECT 1 FROM automation_workflows WHERE id = workflow_id AND is_org_member(auth.uid(), organization_id)));

-- ============================================
-- SUPPORT EMAIL ADDRESSES
-- ============================================

-- Unique email addresses for threads and support
CREATE TABLE support_email_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  email_address text UNIQUE NOT NULL, -- e.g., thread-abc123@support.yourdomain.com
  address_type text NOT NULL, -- 'thread' or 'support_general'
  thread_id uuid REFERENCES email_threads(id) ON DELETE CASCADE,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  last_used_at timestamp with time zone
);

CREATE INDEX idx_support_emails_org ON support_email_addresses(organization_id);
CREATE INDEX idx_support_emails_address ON support_email_addresses(email_address);
CREATE INDEX idx_support_emails_thread ON support_email_addresses(thread_id);

ALTER TABLE support_email_addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view org support emails" ON support_email_addresses FOR SELECT USING (is_org_member(auth.uid(), organization_id));
CREATE POLICY "Users can create org support emails" ON support_email_addresses FOR INSERT WITH CHECK (is_org_member(auth.uid(), organization_id));
CREATE POLICY "System can create support emails" ON support_email_addresses FOR INSERT WITH CHECK (true);

-- Function to generate unique email address for thread
CREATE OR REPLACE FUNCTION generate_thread_email(thread_uuid uuid, org_id uuid, base_domain text)
RETURNS text AS $$
DECLARE
  short_id text;
  email_addr text;
BEGIN
  -- Generate short unique identifier from UUID
  short_id := SUBSTRING(MD5(thread_uuid::text) FROM 1 FOR 12);
  email_addr := 'thread-' || short_id || '@' || base_domain;
  
  -- Store in support_email_addresses table
  INSERT INTO support_email_addresses (organization_id, email_address, address_type, thread_id, is_active)
  VALUES (org_id, email_addr, 'thread', thread_uuid, true)
  ON CONFLICT (email_address) DO NOTHING;
  
  RETURN email_addr;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-create email address when thread is created
CREATE OR REPLACE FUNCTION create_thread_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Auto-generate email address for new threads
  -- Base domain should come from organization settings
  PERFORM generate_thread_email(NEW.id, NEW.organization_id, 'support.kamrok.app');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER thread_email_trigger
AFTER INSERT ON email_threads
FOR EACH ROW
EXECUTE FUNCTION create_thread_email();