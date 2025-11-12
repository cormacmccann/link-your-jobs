-- Create portfolio_items table for managing client work showcase
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  client_url TEXT,
  industry TEXT,
  logo_url TEXT,
  screenshot_url TEXT,
  description TEXT,
  project_type TEXT,
  completion_date DATE,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create contact_submissions table for website contact form
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  source_page TEXT,
  ip_address TEXT,
  user_agent TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'archived')),
  assigned_to UUID,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Portfolio items policies (super admin and org members)
CREATE POLICY "Super admins can do everything with portfolio"
ON public.portfolio_items FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
    AND role = 'owner'
    AND organization_id = 'd14f947b-b3bb-4d9a-a4b1-9aaaafdb6b84'
  )
);

CREATE POLICY "Public can view published portfolio items"
ON public.portfolio_items FOR SELECT
USING (is_published = true);

-- Contact submissions policies (super admin only)
CREATE POLICY "Super admins can do everything with contacts"
ON public.contact_submissions FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
    AND role = 'owner'
    AND organization_id = 'd14f947b-b3bb-4d9a-a4b1-9aaaafdb6b84'
  )
);

CREATE POLICY "Public can create contact submissions"
ON public.contact_submissions FOR INSERT
WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_portfolio_items_org ON public.portfolio_items(organization_id);
CREATE INDEX idx_portfolio_items_published ON public.portfolio_items(is_published);
CREATE INDEX idx_portfolio_items_order ON public.portfolio_items(display_order);
CREATE INDEX idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX idx_contact_submissions_created ON public.contact_submissions(created_at DESC);

-- Create trigger for updated_at
CREATE TRIGGER update_portfolio_items_updated_at
  BEFORE UPDATE ON public.portfolio_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();