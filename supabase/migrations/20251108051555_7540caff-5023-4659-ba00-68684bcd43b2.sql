-- Drop the existing insert policy for organizations
DROP POLICY IF EXISTS "Users can create organizations" ON public.organizations;

-- Create a new insert policy that explicitly checks for authenticated users
CREATE POLICY "Users can create organizations"
  ON public.organizations FOR INSERT
  TO authenticated
  WITH CHECK (true);