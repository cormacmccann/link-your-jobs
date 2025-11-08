-- Fix search_path security issue for get_user_organizations function
DROP FUNCTION IF EXISTS get_user_organizations(uuid);

CREATE OR REPLACE FUNCTION get_user_organizations(_user_id uuid)
RETURNS TABLE (
  id uuid,
  name text,
  role app_role,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    o.name,
    ur.role,
    o.created_at
  FROM organizations o
  INNER JOIN user_roles ur ON ur.organization_id = o.id
  WHERE ur.user_id = _user_id
  ORDER BY o.created_at DESC;
END;
$$;