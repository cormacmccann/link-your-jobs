-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create job_sources table (career widgets)
CREATE TABLE public.job_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_sources ENABLE ROW LEVEL SECURITY;

-- Job sources policies
CREATE POLICY "Users can view own job sources"
ON public.job_sources FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own job sources"
ON public.job_sources FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own job sources"
ON public.job_sources FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own job sources"
ON public.job_sources FOR DELETE
USING (auth.uid() = user_id);

-- Add trigger for job_sources
CREATE TRIGGER update_job_sources_updated_at
BEFORE UPDATE ON public.job_sources
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update jobs table to link to job_sources
ALTER TABLE public.jobs ADD COLUMN job_source_id UUID REFERENCES public.job_sources(id) ON DELETE CASCADE;
CREATE INDEX idx_jobs_job_source_id ON public.jobs(job_source_id);

-- Update jobs RLS to be user-specific through job_sources
DROP POLICY IF EXISTS "Jobs are viewable by everyone" ON public.jobs;

CREATE POLICY "Users can view jobs from their sources"
ON public.jobs FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.job_sources
    WHERE job_sources.id = jobs.job_source_id
    AND job_sources.user_id = auth.uid()
  )
);

CREATE POLICY "System can insert jobs"
ON public.jobs FOR INSERT
WITH CHECK (true);

CREATE POLICY "System can update jobs"
ON public.jobs FOR UPDATE
USING (true);