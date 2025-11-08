-- Fix security warnings for database functions by adding SET search_path = public
-- Use CREATE OR REPLACE to avoid dropping functions that have dependencies

-- Update is_org_member function
CREATE OR REPLACE FUNCTION public.is_org_member(_user_id uuid, _organization_id uuid)
RETURNS boolean
LANGUAGE sql
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

-- Update has_role_in_org function
CREATE OR REPLACE FUNCTION public.has_role_in_org(_user_id uuid, _organization_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
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

-- Update handle_new_user trigger to automatically create a workspace (organization) for each new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  new_org_id uuid;
BEGIN
  -- Create profile
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)));
  
  -- Create personal workspace (organization) for the user
  INSERT INTO public.organizations (name)
  VALUES (COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)) || '''s Workspace')
  RETURNING id INTO new_org_id;
  
  -- Make the user an owner of their workspace
  INSERT INTO public.user_roles (user_id, organization_id, role)
  VALUES (new.id, new_org_id, 'owner');
  
  RETURN new;
END;
$$;