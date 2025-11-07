-- Add embed configuration to job_sources table
ALTER TABLE job_sources 
ADD COLUMN embed_config jsonb DEFAULT '{
  "showLogo": true,
  "showLocation": true,
  "showJobType": true,
  "showDescription": true,
  "primaryColor": "hsl(221.2, 83.2%, 53.3%)",
  "backgroundColor": "hsl(0, 0%, 100%)",
  "textColor": "hsl(222.2, 84%, 4.9%)",
  "buttonStyle": "filled"
}'::jsonb;