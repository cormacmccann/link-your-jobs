DROP POLICY IF EXISTS "System can create policy versions" ON public.policy_versions;
DROP POLICY IF EXISTS "System can update company enrichment" ON public.company_enrichment;
DROP POLICY IF EXISTS "System can create company enrichment" ON public.company_enrichment;
DROP POLICY IF EXISTS "System can insert detected cookies" ON public.detected_cookies;
DROP POLICY IF EXISTS "Public can create messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Public can create chats" ON public.chat_conversations;
DROP POLICY IF EXISTS "Public can create contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Users can create organizations" ON public.organizations;
DROP POLICY IF EXISTS "Authenticated users can upload portal assets" ON storage.objects;
CREATE POLICY "Users upload portal assets to own folder" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'portal-assets' AND (storage.foldername(name))[1] = (select auth.uid()::text));