-- Update embed_config default to include header and font settings
ALTER TABLE job_sources 
ALTER COLUMN embed_config SET DEFAULT '{
  "showLogo": true,
  "showLocation": true,
  "showJobType": true,
  "showDescription": true,
  "primaryColor": "#3b82f6",
  "backgroundColor": "#ffffff",
  "textColor": "#1e293b",
  "buttonStyle": "filled",
  "headerText": "Latest Job Openings",
  "fontFamily": "Inter"
}'::jsonb;