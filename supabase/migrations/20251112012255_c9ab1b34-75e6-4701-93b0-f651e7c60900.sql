-- Create reviews table for Trustpilot integration
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id),
  reviewer_name TEXT NOT NULL,
  reviewer_avatar TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT NOT NULL,
  review_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source TEXT NOT NULL DEFAULT 'trustpilot',
  source_url TEXT,
  verified BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Public can view reviews
CREATE POLICY "Anyone can view reviews"
  ON public.reviews
  FOR SELECT
  USING (true);

-- Members can create reviews in their org
CREATE POLICY "Members can create reviews in their org"
  ON public.reviews
  FOR INSERT
  WITH CHECK (is_org_member(auth.uid(), organization_id));

-- Members can update reviews in their org
CREATE POLICY "Members can update reviews in their org"
  ON public.reviews
  FOR UPDATE
  USING (is_org_member(auth.uid(), organization_id));

-- Members can delete reviews in their org
CREATE POLICY "Members can delete reviews in their org"
  ON public.reviews
  FOR DELETE
  USING (is_org_member(auth.uid(), organization_id));

-- Create updated_at trigger
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes
CREATE INDEX idx_reviews_organization ON public.reviews(organization_id);
CREATE INDEX idx_reviews_rating ON public.reviews(rating);
CREATE INDEX idx_reviews_date ON public.reviews(review_date DESC);