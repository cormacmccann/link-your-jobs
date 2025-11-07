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
    console.log('Starting job sync process...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the LinkedIn URL from the request body
    const { linkedinUrl } = await req.json();

    if (!linkedinUrl) {
      return new Response(
        JSON.stringify({ error: 'LinkedIn URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Attempting to sync jobs from:', linkedinUrl);

    // Check if this is a LinkedIn or Indeed URL
    const isLinkedIn = linkedinUrl.includes('linkedin.com');
    const isIndeed = linkedinUrl.includes('indeed.com');

    let jobs: JobData[] = [];

    if (isLinkedIn) {
      // LinkedIn requires OAuth and official API access
      // For now, return helpful error message
      console.log('LinkedIn detected - requires official API');
      throw new Error(
        'LinkedIn scraping is not supported due to their Terms of Service. ' +
        'Please use LinkedIn\'s official Jobs API with proper authentication, ' +
        'or manually add jobs using the admin interface.'
      );
    } else if (isIndeed) {
      // Indeed has a Publisher API that requires an API key
      console.log('Indeed detected - requires Publisher API');
      throw new Error(
        'Indeed scraping is not supported. Please use Indeed\'s Publisher API ' +
        'with an API key, or manually add jobs using the admin interface.'
      );
    } else {
      // For other URLs, attempt basic fetch
      console.log('Attempting to fetch from custom URL');
      try {
        const response = await fetch(linkedinUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Website blocks automated access`);
        }

        const html = await response.text();
        jobs = parseGenericJobs(html, linkedinUrl);
      } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        throw new Error(
          'Unable to fetch jobs from this URL. The website may block automated access. ' +
          'Please use the manual job entry feature instead.'
        );
      }
    }

    console.log(`Parsed ${jobs.length} jobs from the page`);

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
        message: `Synced ${successCount} jobs successfully`,
        errors: errorCount,
        total: jobs.length,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in sync-jobs function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: 'Failed to sync jobs from LinkedIn'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function parseGenericJobs(html: string, sourceUrl: string): JobData[] {
  const jobs: JobData[] = [];
  
  // Extract company name from the URL
  const urlParts = sourceUrl.split('/');
  const companyName = urlParts.find(part => part.includes('cmp') || part.includes('company'))
    ?.replace(/-/g, ' ') || 'Company';

  // Basic HTML parsing - this is a simple example
  // In production, you'd need more sophisticated parsing based on the specific site structure
  
  console.log('Parsing HTML for job listings...');
  
  // This is intentionally basic - most job sites will block this anyway
  // The real solution is to use official APIs or manual entry
  
  return jobs;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
}
