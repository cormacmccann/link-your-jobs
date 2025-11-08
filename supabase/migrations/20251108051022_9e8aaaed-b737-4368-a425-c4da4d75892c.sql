-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('owner', 'admin', 'member', 'guest');

-- Create enum for deal stages
CREATE TYPE public.deal_stage AS ENUM ('lead', 'qualified', 'proposal', 'negotiation', 'won', 'lost');

-- Create enum for task status
CREATE TYPE public.task_status AS ENUM ('todo', 'in_progress', 'review', 'done');

-- Create enum for task priority
CREATE TYPE public.task_priority AS ENUM ('low', 'medium', 'high', 'urgent');

-- Create organizations table
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'member',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, organization_id)
);

-- Update profiles table to add full_name
ALTER TABLE public.profiles ADD COLUMN full_name TEXT;

-- Create companies table
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  website TEXT,
  industry TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create contacts table
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  title TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create deals table
CREATE TABLE public.deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  value DECIMAL(12,2),
  stage public.deal_stage NOT NULL DEFAULT 'lead',
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create tasks table
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status public.task_status NOT NULL DEFAULT 'todo',
  priority public.task_priority NOT NULL DEFAULT 'medium',
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  due_date TIMESTAMPTZ,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create message_boards table
CREATE TABLE public.message_boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_board_id UUID NOT NULL REFERENCES public.message_boards(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create security definer function to check user role in organization
CREATE OR REPLACE FUNCTION public.has_role_in_org(_user_id UUID, _organization_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND organization_id = _organization_id
      AND role = _role
  );
$$;

-- Create security definer function to check if user is member of organization
CREATE OR REPLACE FUNCTION public.is_org_member(_user_id UUID, _organization_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND organization_id = _organization_id
  );
$$;

-- Create security definer function to get user organizations
CREATE OR REPLACE FUNCTION public.get_user_organizations(_user_id UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  role public.app_role,
  created_at TIMESTAMPTZ
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT o.id, o.name, ur.role, o.created_at
  FROM public.organizations o
  INNER JOIN public.user_roles ur ON ur.organization_id = o.id
  WHERE ur.user_id = _user_id
  ORDER BY o.created_at DESC;
$$;

-- Enable RLS on all tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for organizations
CREATE POLICY "Users can view their organizations"
  ON public.organizations FOR SELECT
  USING (public.is_org_member(auth.uid(), id));

CREATE POLICY "Users can create organizations"
  ON public.organizations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update their organizations"
  ON public.organizations FOR UPDATE
  USING (public.has_role_in_org(auth.uid(), id, 'admin') OR public.has_role_in_org(auth.uid(), id, 'owner'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view roles in their organizations"
  ON public.user_roles FOR SELECT
  USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Users can create roles when creating org"
  ON public.user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role_in_org(auth.uid(), organization_id, 'admin') OR public.has_role_in_org(auth.uid(), organization_id, 'owner'));

-- RLS Policies for companies
CREATE POLICY "Members can view companies in their org"
  ON public.companies FOR SELECT
  USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can create companies in their org"
  ON public.companies FOR INSERT
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can update companies in their org"
  ON public.companies FOR UPDATE
  USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Admins can delete companies"
  ON public.companies FOR DELETE
  USING (public.has_role_in_org(auth.uid(), organization_id, 'admin') OR public.has_role_in_org(auth.uid(), organization_id, 'owner'));

-- RLS Policies for contacts
CREATE POLICY "Members can view contacts in their org"
  ON public.contacts FOR SELECT
  USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can create contacts in their org"
  ON public.contacts FOR INSERT
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can update contacts in their org"
  ON public.contacts FOR UPDATE
  USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can delete contacts in their org"
  ON public.contacts FOR DELETE
  USING (public.is_org_member(auth.uid(), organization_id));

-- RLS Policies for deals
CREATE POLICY "Members can view deals in their org"
  ON public.deals FOR SELECT
  USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can create deals in their org"
  ON public.deals FOR INSERT
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can update deals in their org"
  ON public.deals FOR UPDATE
  USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can delete deals in their org"
  ON public.deals FOR DELETE
  USING (public.is_org_member(auth.uid(), organization_id));

-- RLS Policies for projects
CREATE POLICY "Members can view projects in their org"
  ON public.projects FOR SELECT
  USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can create projects in their org"
  ON public.projects FOR INSERT
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can update projects in their org"
  ON public.projects FOR UPDATE
  USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Admins can delete projects"
  ON public.projects FOR DELETE
  USING (public.has_role_in_org(auth.uid(), organization_id, 'admin') OR public.has_role_in_org(auth.uid(), organization_id, 'owner'));

-- RLS Policies for tasks
CREATE POLICY "Members can view tasks in their org"
  ON public.tasks FOR SELECT
  USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can create tasks in their org"
  ON public.tasks FOR INSERT
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can update tasks in their org"
  ON public.tasks FOR UPDATE
  USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can delete tasks in their org"
  ON public.tasks FOR DELETE
  USING (public.is_org_member(auth.uid(), organization_id));

-- RLS Policies for message_boards
CREATE POLICY "Members can view message boards in their org"
  ON public.message_boards FOR SELECT
  USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can create message boards in their org"
  ON public.message_boards FOR INSERT
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Members can update message boards in their org"
  ON public.message_boards FOR UPDATE
  USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Admins can delete message boards"
  ON public.message_boards FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.message_boards mb
    WHERE mb.id = message_boards.id
    AND (public.has_role_in_org(auth.uid(), mb.organization_id, 'admin') OR public.has_role_in_org(auth.uid(), mb.organization_id, 'owner'))
  ));

-- RLS Policies for messages
CREATE POLICY "Members can view messages in their org"
  ON public.messages FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.message_boards mb
    WHERE mb.id = messages.message_board_id
    AND public.is_org_member(auth.uid(), mb.organization_id)
  ));

CREATE POLICY "Members can create messages in their org"
  ON public.messages FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.message_boards mb
    WHERE mb.id = message_board_id
    AND public.is_org_member(auth.uid(), mb.organization_id)
  ));

CREATE POLICY "Users can update their own messages"
  ON public.messages FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own messages"
  ON public.messages FOR DELETE
  USING (auth.uid() = created_by);

-- Create triggers for updated_at
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_deals_updated_at
  BEFORE UPDATE ON public.deals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_message_boards_updated_at
  BEFORE UPDATE ON public.message_boards
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON public.messages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();