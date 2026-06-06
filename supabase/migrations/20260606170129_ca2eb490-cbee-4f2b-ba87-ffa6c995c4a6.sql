
-- 1. Fix broken RLS policies (replace tautological subqueries with is_org_member)

-- activity_log
DROP POLICY IF EXISTS "Users can view activity log in their organization" ON public.activity_log;
DROP POLICY IF EXISTS "Users can insert activity log in their organization" ON public.activity_log;
CREATE POLICY "Users can view activity log in their organization"
  ON public.activity_log FOR SELECT TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Users can insert activity log in their organization"
  ON public.activity_log FOR INSERT TO authenticated
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));

-- booking_slots
DROP POLICY IF EXISTS "Users can manage booking slots in their organization" ON public.booking_slots;
DROP POLICY IF EXISTS "Users can view booking slots in their organization" ON public.booking_slots;
CREATE POLICY "Users can view booking slots in their organization"
  ON public.booking_slots FOR SELECT TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Users can manage booking slots in their organization"
  ON public.booking_slots FOR ALL TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id))
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));

-- calendar_events
DROP POLICY IF EXISTS "Users can manage calendar events in their organization" ON public.calendar_events;
DROP POLICY IF EXISTS "Users can view calendar events in their organization" ON public.calendar_events;
CREATE POLICY "Users can view calendar events in their organization"
  ON public.calendar_events FOR SELECT TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Users can manage calendar events in their organization"
  ON public.calendar_events FOR ALL TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id))
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));

-- contracts
DROP POLICY IF EXISTS "Users can manage contracts in their organization" ON public.contracts;
DROP POLICY IF EXISTS "Users can view contracts in their organization" ON public.contracts;
CREATE POLICY "Users can view contracts in their organization"
  ON public.contracts FOR SELECT TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Users can manage contracts in their organization"
  ON public.contracts FOR ALL TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id))
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));

-- quotes
DROP POLICY IF EXISTS "Users can manage quotes in their organization" ON public.quotes;
DROP POLICY IF EXISTS "Users can view quotes in their organization" ON public.quotes;
CREATE POLICY "Users can view quotes in their organization"
  ON public.quotes FOR SELECT TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Users can manage quotes in their organization"
  ON public.quotes FOR ALL TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id))
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));

-- quote_items (scoped via parent quote)
DROP POLICY IF EXISTS "Users can manage quote items" ON public.quote_items;
DROP POLICY IF EXISTS "Users can view quote items" ON public.quote_items;
CREATE POLICY "Users can view quote items"
  ON public.quote_items FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.quotes q
    WHERE q.id = quote_items.quote_id
      AND public.is_org_member(auth.uid(), q.organization_id)
  ));
CREATE POLICY "Users can manage quote items"
  ON public.quote_items FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.quotes q
    WHERE q.id = quote_items.quote_id
      AND public.is_org_member(auth.uid(), q.organization_id)
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.quotes q
    WHERE q.id = quote_items.quote_id
      AND public.is_org_member(auth.uid(), q.organization_id)
  ));

-- time_entries
DROP POLICY IF EXISTS "Users can manage time entries in their organization" ON public.time_entries;
DROP POLICY IF EXISTS "Users can view time entries in their organization" ON public.time_entries;
CREATE POLICY "Users can view time entries in their organization"
  ON public.time_entries FOR SELECT TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Users can manage time entries in their organization"
  ON public.time_entries FOR ALL TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id))
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));

-- 2. Restrict OAuth tokens in email_accounts to the owning user only
DROP POLICY IF EXISTS "Users can view email accounts in their org" ON public.email_accounts;
CREATE POLICY "Users can view their own email accounts"
  ON public.email_accounts FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- 3. Remove unrestricted write policies on campaign_recipients
DROP POLICY IF EXISTS "System can create campaign recipients" ON public.campaign_recipients;
DROP POLICY IF EXISTS "System can update campaign recipients" ON public.campaign_recipients;
CREATE POLICY "Org members can insert campaign recipients"
  ON public.campaign_recipients FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.email_campaigns ec
    WHERE ec.id = campaign_recipients.campaign_id
      AND public.is_org_member(auth.uid(), ec.organization_id)
  ));
CREATE POLICY "Org members can update campaign recipients"
  ON public.campaign_recipients FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.email_campaigns ec
    WHERE ec.id = campaign_recipients.campaign_id
      AND public.is_org_member(auth.uid(), ec.organization_id)
  ));

-- 4. Drop public job_sources policy (exposed user_id)
DROP POLICY IF EXISTS "Public can view job sources for embeds" ON public.job_sources;

-- 5. Drop unrestricted insert on support_email_addresses
DROP POLICY IF EXISTS "System can create support emails" ON public.support_email_addresses;

-- 6. Tighten portal-assets storage policies (require ownership via first folder = uid)
DROP POLICY IF EXISTS "Users can delete their own portal assets" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own portal assets" ON storage.objects;
CREATE POLICY "Users can delete their own portal assets"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'portal-assets'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
CREATE POLICY "Users can update their own portal assets"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'portal-assets'
    AND (storage.foldername(name))[1] = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'portal-assets'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- 7. Set fixed search_path on existing functions to satisfy linter
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
ALTER FUNCTION public.log_invoice_activity() SET search_path = public;
ALTER FUNCTION public.log_calendar_activity() SET search_path = public;
ALTER FUNCTION public.log_card_activity() SET search_path = public;
ALTER FUNCTION public.log_quote_activity() SET search_path = public;
ALTER FUNCTION public.log_contract_activity() SET search_path = public;
ALTER FUNCTION public.log_time_entry_activity() SET search_path = public;
ALTER FUNCTION public.create_thread_email() SET search_path = public;
ALTER FUNCTION public.generate_invoice_number(uuid) SET search_path = public;
ALTER FUNCTION public.generate_thread_email(uuid, uuid, text) SET search_path = public;
ALTER FUNCTION public.sync_all_linkedin_jobs() SET search_path = public;
