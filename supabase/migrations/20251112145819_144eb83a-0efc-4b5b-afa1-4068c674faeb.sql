-- Enable RLS on portfolio_items if not already enabled
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Members can create portfolio items in their org" ON portfolio_items;
DROP POLICY IF EXISTS "Members can view portfolio items in their org" ON portfolio_items;
DROP POLICY IF EXISTS "Members can update portfolio items in their org" ON portfolio_items;
DROP POLICY IF EXISTS "Members can delete portfolio items in their org" ON portfolio_items;
DROP POLICY IF EXISTS "Public can view published portfolio items" ON portfolio_items;

-- Allow org members to create portfolio items
CREATE POLICY "Members can create portfolio items in their org"
ON portfolio_items
FOR INSERT
TO authenticated
WITH CHECK (is_org_member(auth.uid(), organization_id));

-- Allow org members to view portfolio items in their org
CREATE POLICY "Members can view portfolio items in their org"
ON portfolio_items
FOR SELECT
TO authenticated
USING (is_org_member(auth.uid(), organization_id));

-- Allow public to view published portfolio items (for public galleries)
CREATE POLICY "Public can view published portfolio items"
ON portfolio_items
FOR SELECT
TO anon
USING (is_published = true);

-- Allow org members to update portfolio items in their org
CREATE POLICY "Members can update portfolio items in their org"
ON portfolio_items
FOR UPDATE
TO authenticated
USING (is_org_member(auth.uid(), organization_id));

-- Allow org members to delete portfolio items in their org
CREATE POLICY "Members can delete portfolio items in their org"
ON portfolio_items
FOR DELETE
TO authenticated
USING (is_org_member(auth.uid(), organization_id));