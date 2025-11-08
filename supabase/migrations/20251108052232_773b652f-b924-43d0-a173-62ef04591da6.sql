-- Add project_members table for tracking team
CREATE TABLE IF NOT EXISTS public.project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- Add project_documents table for docs & files
CREATE TABLE IF NOT EXISTS public.project_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  doc_type TEXT DEFAULT 'doc',
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add project_milestones table for schedule
CREATE TABLE IF NOT EXISTS public.project_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  completed BOOLEAN DEFAULT false,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add to-do lists table (Basecamp style checklist groups)
CREATE TABLE IF NOT EXISTS public.todo_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add to-do items table (individual checklist items)
CREATE TABLE IF NOT EXISTS public.todo_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  todo_list_id UUID NOT NULL REFERENCES public.todo_lists(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  due_date TIMESTAMPTZ,
  position INTEGER DEFAULT 0,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.todo_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.todo_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for project_members
CREATE POLICY "Users can view project members if they're org members"
  ON public.project_members FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = project_id
    AND public.is_org_member(auth.uid(), p.organization_id)
  ));

CREATE POLICY "Users can add project members if they're org members"
  ON public.project_members FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = project_id
    AND public.is_org_member(auth.uid(), p.organization_id)
  ));

-- RLS Policies for project_documents
CREATE POLICY "Project members can view docs"
  ON public.project_documents FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = project_id
    AND public.is_org_member(auth.uid(), p.organization_id)
  ));

CREATE POLICY "Project members can create docs"
  ON public.project_documents FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = project_id
    AND public.is_org_member(auth.uid(), p.organization_id)
  ));

CREATE POLICY "Project members can update docs"
  ON public.project_documents FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = project_id
    AND public.is_org_member(auth.uid(), p.organization_id)
  ));

-- RLS Policies for project_milestones
CREATE POLICY "Project members can view milestones"
  ON public.project_milestones FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = project_id
    AND public.is_org_member(auth.uid(), p.organization_id)
  ));

CREATE POLICY "Project members can create milestones"
  ON public.project_milestones FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = project_id
    AND public.is_org_member(auth.uid(), p.organization_id)
  ));

CREATE POLICY "Project members can update milestones"
  ON public.project_milestones FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = project_id
    AND public.is_org_member(auth.uid(), p.organization_id)
  ));

-- RLS Policies for todo_lists
CREATE POLICY "Project members can view todo lists"
  ON public.todo_lists FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = project_id
    AND public.is_org_member(auth.uid(), p.organization_id)
  ));

CREATE POLICY "Project members can create todo lists"
  ON public.todo_lists FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = project_id
    AND public.is_org_member(auth.uid(), p.organization_id)
  ));

CREATE POLICY "Project members can update todo lists"
  ON public.todo_lists FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = project_id
    AND public.is_org_member(auth.uid(), p.organization_id)
  ));

-- RLS Policies for todo_items
CREATE POLICY "Project members can view todo items"
  ON public.todo_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.todo_lists tl
    JOIN public.projects p ON p.id = tl.project_id
    WHERE tl.id = todo_list_id
    AND public.is_org_member(auth.uid(), p.organization_id)
  ));

CREATE POLICY "Project members can create todo items"
  ON public.todo_items FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.todo_lists tl
    JOIN public.projects p ON p.id = tl.project_id
    WHERE tl.id = todo_list_id
    AND public.is_org_member(auth.uid(), p.organization_id)
  ));

CREATE POLICY "Project members can update todo items"
  ON public.todo_items FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.todo_lists tl
    JOIN public.projects p ON p.id = tl.project_id
    WHERE tl.id = todo_list_id
    AND public.is_org_member(auth.uid(), p.organization_id)
  ));

CREATE POLICY "Project members can delete todo items"
  ON public.todo_items FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.todo_lists tl
    JOIN public.projects p ON p.id = tl.project_id
    WHERE tl.id = todo_list_id
    AND public.is_org_member(auth.uid(), p.organization_id)
  ));

-- Add triggers for updated_at
CREATE TRIGGER update_project_documents_updated_at
  BEFORE UPDATE ON public.project_documents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_milestones_updated_at
  BEFORE UPDATE ON public.project_milestones
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_todo_lists_updated_at
  BEFORE UPDATE ON public.todo_lists
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_todo_items_updated_at
  BEFORE UPDATE ON public.todo_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();