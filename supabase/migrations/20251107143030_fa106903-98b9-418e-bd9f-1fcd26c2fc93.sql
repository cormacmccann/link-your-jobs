-- Add public read access policy for job_sources (for embeds)
CREATE POLICY "Public can view job sources for embeds"
ON public.job_sources
FOR SELECT
USING (true);

-- Add public read access policy for jobs (for embeds)
CREATE POLICY "Public can view jobs for embeds"
ON public.jobs
FOR SELECT
USING (true);