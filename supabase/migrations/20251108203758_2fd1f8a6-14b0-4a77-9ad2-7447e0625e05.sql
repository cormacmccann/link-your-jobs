-- Create RPC function to get user organizations with their roles
CREATE OR REPLACE FUNCTION get_user_organizations(_user_id uuid)
RETURNS TABLE (
  id uuid,
  name text,
  role app_role,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
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