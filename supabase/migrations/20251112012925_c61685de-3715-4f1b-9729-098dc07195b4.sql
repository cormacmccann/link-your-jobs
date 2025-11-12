-- Add super_admin role to app_role enum
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'super_admin';

-- Make cormac@kamrok.com a super admin
DO $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Get the user_id for cormac@kamrok.com from auth.users
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = 'cormac@kamrok.com'
  LIMIT 1;

  -- If user exists, add super_admin role
  IF target_user_id IS NOT NULL THEN
    INSERT INTO user_roles (user_id, organization_id, role)
    SELECT target_user_id, id, 'super_admin'::app_role
    FROM organizations
    LIMIT 1
    ON CONFLICT (user_id, organization_id) 
    DO UPDATE SET role = 'super_admin'::app_role;
  END IF;
END $$;

-- Add branding fields to organizations table
ALTER TABLE organizations 
ADD COLUMN IF NOT EXISTS logo_url text,
ADD COLUMN IF NOT EXISTS primary_color text DEFAULT '#3b82f6',
ADD COLUMN IF NOT EXISTS secondary_color text DEFAULT '#8b5cf6',
ADD COLUMN IF NOT EXISTS company_description text,
ADD COLUMN IF NOT EXISTS website_url text;

-- Enhance client_portals table with branding and features
ALTER TABLE client_portals
ADD COLUMN IF NOT EXISTS logo_url text,
ADD COLUMN IF NOT EXISTS primary_color text,
ADD COLUMN IF NOT EXISTS secondary_color text,
ADD COLUMN IF NOT EXISTS custom_domain text,
ADD COLUMN IF NOT EXISTS support_ticket_limit integer DEFAULT -1, -- -1 means unlimited
ADD COLUMN IF NOT EXISTS support_tickets_used integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS show_products boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS show_services boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS allow_support_tickets boolean DEFAULT true;

-- Create portal_products table for showcasing products in portals
CREATE TABLE IF NOT EXISTS portal_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portal_id uuid REFERENCES client_portals(id) ON DELETE CASCADE NOT NULL,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  product_name text NOT NULL,
  product_description text,
  price numeric,
  currency text DEFAULT 'USD',
  image_url text,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create portal_services table for showcasing services
CREATE TABLE IF NOT EXISTS portal_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portal_id uuid REFERENCES client_portals(id) ON DELETE CASCADE NOT NULL,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  service_name text NOT NULL,
  service_description text,
  price numeric,
  currency text DEFAULT 'USD',
  duration text, -- e.g., "1 hour", "per month"
  image_url text,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create portal_questionnaires table for onboarding forms
CREATE TABLE IF NOT EXISTS portal_questionnaires (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  portal_id uuid REFERENCES client_portals(id) ON DELETE CASCADE NOT NULL,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  questions jsonb DEFAULT '[]'::jsonb, -- Array of question objects
  is_required boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create portal_questionnaire_responses table
CREATE TABLE IF NOT EXISTS portal_questionnaire_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  questionnaire_id uuid REFERENCES portal_questionnaires(id) ON DELETE CASCADE NOT NULL,
  portal_id uuid REFERENCES client_portals(id) ON DELETE CASCADE NOT NULL,
  client_contact_id uuid REFERENCES contacts(id) ON DELETE SET NULL,
  responses jsonb DEFAULT '{}'::jsonb, -- Key-value pairs of question_id: answer
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE portal_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_questionnaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_questionnaire_responses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for portal_products
CREATE POLICY "Members can view org portal products"
ON portal_products FOR SELECT
USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can create org portal products"
ON portal_products FOR INSERT
WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can update org portal products"
ON portal_products FOR UPDATE
USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can delete org portal products"
ON portal_products FOR DELETE
USING (is_org_member(auth.uid(), organization_id));

-- RLS Policies for portal_services
CREATE POLICY "Members can view org portal services"
ON portal_services FOR SELECT
USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can create org portal services"
ON portal_services FOR INSERT
WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can update org portal services"
ON portal_services FOR UPDATE
USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can delete org portal services"
ON portal_services FOR DELETE
USING (is_org_member(auth.uid(), organization_id));

-- RLS Policies for portal_questionnaires
CREATE POLICY "Members can view org questionnaires"
ON portal_questionnaires FOR SELECT
USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can create org questionnaires"
ON portal_questionnaires FOR INSERT
WITH CHECK (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can update org questionnaires"
ON portal_questionnaires FOR UPDATE
USING (is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can delete org questionnaires"
ON portal_questionnaires FOR DELETE
USING (is_org_member(auth.uid(), organization_id));

-- RLS Policies for portal_questionnaire_responses
CREATE POLICY "Members can view org questionnaire responses"
ON portal_questionnaire_responses FOR SELECT
USING (EXISTS (
  SELECT 1 FROM portal_questionnaires pq
  WHERE pq.id = portal_questionnaire_responses.questionnaire_id
  AND is_org_member(auth.uid(), pq.organization_id)
));

CREATE POLICY "Members can create questionnaire responses"
ON portal_questionnaire_responses FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM portal_questionnaires pq
  WHERE pq.id = portal_questionnaire_responses.questionnaire_id
  AND is_org_member(auth.uid(), pq.organization_id)
));

CREATE POLICY "Members can update questionnaire responses"
ON portal_questionnaire_responses FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM portal_questionnaires pq
  WHERE pq.id = portal_questionnaire_responses.questionnaire_id
  AND is_org_member(auth.uid(), pq.organization_id)
));

-- Create storage bucket for portal logos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portal-assets', 'portal-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for portal assets
CREATE POLICY "Portal assets are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'portal-assets');

CREATE POLICY "Authenticated users can upload portal assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portal-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own portal assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portal-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own portal assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'portal-assets' AND auth.role() = 'authenticated');