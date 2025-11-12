-- Add new fields to portfolio_items table for technologies, services, and preliminary gallery
ALTER TABLE portfolio_items 
ADD COLUMN IF NOT EXISTS technologies text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS services text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS preliminary_gallery text[] DEFAULT '{}';