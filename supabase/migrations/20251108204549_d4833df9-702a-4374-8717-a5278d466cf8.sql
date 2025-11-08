-- Fix remaining functions that don't have SET search_path

-- Update update_policies_updated_at function
CREATE OR REPLACE FUNCTION public.update_policies_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Update sync_all_linkedin_jobs function
CREATE OR REPLACE FUNCTION public.sync_all_linkedin_jobs()
RETURNS void
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  linkedin_url_record RECORD;
BEGIN
  -- Get all unique LinkedIn URLs from the jobs table
  FOR linkedin_url_record IN 
    SELECT DISTINCT linkedin_url FROM public.jobs
  LOOP
    -- Call the edge function for each URL
    PERFORM net.http_post(
      url := 'https://nwmwwpwpokcwwjhgxwxe.supabase.co/functions/v1/sync-jobs',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53bXd3cHdwb2tjd3dqaGd4d3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MTk0NDMsImV4cCI6MjA3ODA5NTQ0M30.UGEfDbq4JjOpJtlL841mvXio0ND40Ua5FCiMk5ktYi8"}'::jsonb,
      body := json_build_object('linkedinUrl', linkedin_url_record.linkedin_url)::jsonb
    );
  END LOOP;
END;
$$;