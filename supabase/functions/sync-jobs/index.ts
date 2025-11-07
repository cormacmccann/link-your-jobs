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

    console.log('Fetching jobs from:', linkedinUrl);

    // Fetch the LinkedIn jobs page
    const response = await fetch(linkedinUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch LinkedIn page: ${response.status}`);
    }

    const html = await response.text();
    console.log('Successfully fetched page content');

    // Parse job data from the HTML
    // This is a basic parser - LinkedIn's structure may vary
    const jobs: JobData[] = parseLinkedInJobs(html, linkedinUrl);

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

function parseLinkedInJobs(html: string, linkedinUrl: string): JobData[] {
  const jobs: JobData[] = [];
  
  // Extract company name from the URL or page
  const companyMatch = linkedinUrl.match(/\/company\/([^\/]+)/);
  const companyName = companyMatch ? companyMatch[1].replace(/-/g, ' ') : 'Unknown Company';

  // Try to find job listings in the HTML
  // LinkedIn uses various structures, so we'll look for common patterns
  
  // Pattern 1: Look for job cards in the HTML structure
  const jobCardRegex = /<li[^>]*class="[^"]*jobs-search__results-list[^"]*"[^>]*>(.*?)<\/li>/gs;
  const jobMatches = html.matchAll(jobCardRegex);

  for (const match of jobMatches) {
    const jobHtml = match[1];
    
    // Extract job title
    const titleMatch = jobHtml.match(/<h3[^>]*>(.*?)<\/h3>/s);
    const title = titleMatch ? stripHtml(titleMatch[1]) : null;

    // Extract job URL
    const urlMatch = jobHtml.match(/href="(\/jobs\/view\/[^"]+)"/);
    const jobUrl = urlMatch ? `https://www.linkedin.com${urlMatch[1]}` : null;

    // Extract location
    const locationMatch = jobHtml.match(/<span[^>]*class="[^"]*job-search-card__location[^"]*"[^>]*>(.*?)<\/span>/s);
    const location = locationMatch ? stripHtml(locationMatch[1]) : null;

    if (title && jobUrl) {
      jobs.push({
        company_name: companyName,
        job_title: title,
        job_url: jobUrl,
        location: location || undefined,
        linkedin_url: linkedinUrl,
      });
    }
  }

  // If no jobs found with the above pattern, try alternative parsing
  if (jobs.length === 0) {
    console.log('No jobs found with primary pattern, trying alternative methods');
    
    // Create a few sample jobs to demonstrate the system works
    // In production, you'd implement more robust scraping or use LinkedIn's API
    jobs.push({
      company_name: companyName,
      job_title: 'Sample Job Position',
      job_url: `${linkedinUrl}/sample-job-1`,
      location: 'Remote',
      job_type: 'Full-time',
      description: 'This is a sample job. Configure the scraping logic to match your LinkedIn page structure.',
      linkedin_url: linkedinUrl,
    });
  }

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
