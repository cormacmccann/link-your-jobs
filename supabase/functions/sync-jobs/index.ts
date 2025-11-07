import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface JobData {
  company_name: string;
  job_title: string;
  job_url: string;
  location?: string;
  job_type?: string;
  description?: string;
  posted_date?: string;
  linkedin_url: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting AI-powered job sync process...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the job board URL from the request body
    const { linkedinUrl } = await req.json();

    if (!linkedinUrl) {
      return new Response(
        JSON.stringify({ error: 'Job board URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching page content from:', linkedinUrl);

    // Fetch the job board page with realistic browser headers
    let html: string;
    try {
      const response = await fetch(linkedinUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Cache-Control': 'max-age=0',
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch page:', response.status, response.statusText);
        throw new Error(`HTTP ${response.status}: Could not fetch page content`);
      }

      html = await response.text();
      console.log(`Successfully fetched page content (${html.length} characters)`);
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      throw new Error(`Failed to fetch page: ${fetchError instanceof Error ? fetchError.message : 'Network error'}`);
    }

    // Truncate HTML if too long (to stay within AI token limits)
    const maxHtmlLength = 50000;
    const truncatedHtml = html.length > maxHtmlLength 
      ? html.substring(0, maxHtmlLength) + '\n\n[Content truncated due to length...]'
      : html;

    console.log('Using AI to extract job listings...');

    // Use AI to extract job listings from the HTML
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a job listing extraction expert. Extract ALL job listings from the provided HTML content.
For each job, extract:
- job_title (required): The job title/position name
- company_name (required): The company name
- job_url (required): The full URL to view the job (must be a complete, valid URL)
- location (optional): Job location (city, country, or "Remote")
- job_type (optional): Employment type (Full-time, Part-time, Contract, etc.)
- description (optional): Brief job description or requirements
- posted_date (optional): When the job was posted (in ISO format if possible)

Return ONLY a JSON array of job objects. No other text or markdown.
If no jobs are found, return an empty array: []`
          },
          {
            role: 'user',
            content: `Extract all job listings from this ${linkedinUrl.includes('indeed') ? 'Indeed' : linkedinUrl.includes('linkedin') ? 'LinkedIn' : 'job board'} page:\n\n${truncatedHtml}`
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      throw new Error(`AI extraction failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices?.[0]?.message?.content || '[]';
    
    console.log('AI response:', aiContent);

    // Parse the AI response
    let jobs: JobData[] = [];
    try {
      // Remove markdown code blocks if present
      const jsonContent = aiContent
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      const extractedJobs = JSON.parse(jsonContent);
      
      // Validate and format jobs
      jobs = extractedJobs
        .filter((job: any) => job.job_title && job.company_name && job.job_url)
        .map((job: any) => ({
          company_name: job.company_name,
          job_title: job.job_title,
          job_url: job.job_url,
          location: job.location || undefined,
          job_type: job.job_type || undefined,
          description: job.description || undefined,
          posted_date: job.posted_date || undefined,
          linkedin_url: linkedinUrl,
        }));

      console.log(`AI extracted ${jobs.length} valid job listings`);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('AI content was:', aiContent);
      throw new Error('AI returned invalid job data format. Try again or use manual entry.');
    }

    if (jobs.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No job listings found on this page. The page may require login or have no active postings.',
          total: 0,
          errors: 0,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Upsert jobs into database
    let successCount = 0;
    let errorCount = 0;

    for (const job of jobs) {
      try {
        const { error } = await supabase
          .from('jobs')
          .upsert(
            {
              ...job,
              last_synced_at: new Date().toISOString(),
            },
            {
              onConflict: 'job_url,linkedin_url',
            }
          );

        if (error) {
          console.error('Error upserting job:', error);
          errorCount++;
        } else {
          successCount++;
        }
      } catch (err) {
        console.error('Exception upserting job:', err);
        errorCount++;
      }
    }

    console.log(`Sync complete: ${successCount} successful, ${errorCount} errors`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully synced ${successCount} job${successCount !== 1 ? 's' : ''}`,
        total: jobs.length,
        synced: successCount,
        errors: errorCount,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in sync-jobs function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: 'Failed to sync jobs. The website may be blocking access, or there may be no jobs listed.'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
