-- Add screenshots array to portfolio_items
ALTER TABLE portfolio_items
ADD COLUMN screenshots text[] DEFAULT '{}';

-- Add comment
COMMENT ON COLUMN portfolio_items.screenshots IS 'Array of screenshot URLs for the portfolio item';