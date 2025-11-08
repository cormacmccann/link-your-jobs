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

async function fetchPageContent(url: string): Promise<string> {
  const scrapingBeeKey = Deno.env.get('SCRAPINGBEE_API_KEY');

  async function fetchWithBee(params: Record<string, string | number | boolean>) {
    const qp = new URLSearchParams({
      api_key: scrapingBeeKey!,
      url,
      // sensible defaults
      render_js: 'true',
      block_resources: 'false',
      wait: '3000',
      ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
    });
    const apiUrl = `https://app.scrapingbee.com/api/v1/?${qp.toString()}`;
    const res = await fetch(apiUrl, { method: 'GET' });
    const body = await res.text();
    if (!res.ok) {
      throw new Error(`ScrapingBee failed: HTTP ${res.status} ${body}`);
    }
    return body;
  }

  // If a ScrapingBee key is configured, use it to bypass bot protection
  if (scrapingBeeKey) {
    const isIndeed = /indeed\./i.test(url);
    const isUk = /\.co\.uk|uk\./i.test(url);
    const country = isUk ? 'gb' : 'us';

    try {
      // Attempt 1: premium proxy (cheaper, often enough), JS rendering, proper country
      console.log('ScrapingBee attempt 1: premium_proxy');
      return await fetchWithBee({ premium_proxy: true, country_code: country });
    } catch (e1) {
      // Attempt 2: stealth proxy for heavy bot protection (Indeed often needs it)
      console.warn('ScrapingBee attempt 1 failed, trying stealth_proxy...', e1 instanceof Error ? e1.message : e1);
      try {
        return await fetchWithBee({ premium_proxy: true, stealth_proxy: true, country_code: country });
      } catch (e2) {
        console.error('ScrapingBee stealth attempt failed:', e2);
        throw e2;
      }
    }
  }

  // Fallback: direct fetch (may be blocked by some sites)
  const response = await fetch(url, {
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
    throw new Error(`HTTP ${response.status}: Could not fetch page content`);
  }

  return await response.text();
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

// Update the sync function to use job_source_id
const { linkedinUrl, jobSourceId } = await req.json();

if (!linkedinUrl) {
  return new Response(
    JSON.stringify({ error: 'Job board URL is required' }),
    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

    console.log('Fetching page content from:', linkedinUrl);

    // Fetch content (uses ScrapingBee if configured)
    let html: string;
    try {
      html = await fetchPageContent(linkedinUrl);
      console.log(`Successfully fetched page content (${html.length} characters)`);
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      const hint = Deno.env.get('SCRAPINGBEE_API_KEY') ? '' : ' Tip: add a SCRAPINGBEE_API_KEY secret to bypass anti-bot protections.';
      throw new Error(`Failed to fetch page: ${fetchError instanceof Error ? fetchError.message : 'Network error'}.${hint}`);
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
            content: `You are a job listing extraction expert. Extract ALL VALID job listings from the provided HTML content.

CRITICAL: Filter out invalid, test, or placeholder jobs. Only extract jobs that meet ALL these criteria:
- Have a real company name (not "Test Company", "Example Corp", etc.)
- Have a complete, valid job URL (not placeholder URLs with "1234567890" or "abcdef")
- Have a posted date after 2024-05-01 (ignore old/expired jobs)
- Have real job titles (not "Test Job", "Example Position")

For each VALID job, extract:
- job_title (required): The actual job title/position name
- company_name (required): The real company name
- job_url (required): The complete, valid URL to view the job
- location (optional): Job location (city, country, or "Remote")
- job_type (optional): Employment type (Full-time, Part-time, Contract, etc.)
- description (optional): Brief job description or requirements
- posted_date (optional): When the job was posted (in ISO format YYYY-MM-DD)

Return ONLY a JSON array of valid job objects. No other text or markdown.
If no VALID jobs are found, return an empty array: []`
          },
          {
            role: 'user',
            content: `Extract all VALID job listings from this ${linkedinUrl.includes('indeed') ? 'Indeed' : linkedinUrl.includes('linkedin') ? 'LinkedIn' : 'job board'} page:\n\n${truncatedHtml}`
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
      
      // Validate and filter jobs with comprehensive checks
      jobs = extractedJobs
        .filter((job: any) => {
          // Basic required fields
          if (!job.job_title || !job.company_name || !job.job_url) return false;
          
          // Filter out test/placeholder data
          const lowerTitle = job.job_title.toLowerCase();
          const lowerCompany = job.company_name.toLowerCase();
          const lowerUrl = job.job_url.toLowerCase();
          
          if (lowerTitle.includes('test') || lowerTitle.includes('example')) return false;
          if (lowerCompany.includes('test') || lowerCompany.includes('example')) return false;
          if (lowerUrl.includes('1234567890') || lowerUrl.includes('abcdef')) return false;
          
          // Filter out invalid URLs
          try {
            const url = new URL(job.job_url);
            if (!url.protocol.startsWith('http')) return false;
          } catch {
            return false;
          }
          
          // Filter out old jobs (before May 2024)
          if (job.posted_date) {
            try {
              const postedDate = new Date(job.posted_date);
              const cutoffDate = new Date('2024-05-01');
              if (postedDate < cutoffDate) return false;
            } catch {
              // Invalid date format, keep job but without date
            }
          }
          
          return true;
        })
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

      console.log(`AI extracted ${jobs.length} valid job listings after filtering`);

      // Deduplicate by job_url to avoid repeats
      const seenUrls = new Set<string>();
      jobs = jobs.filter((j) => {
        const key = j.job_url.trim();
        if (seenUrls.has(key)) return false;
        seenUrls.add(key);
        return true;
      });
      console.log(`After deduplication: ${jobs.length} job(s)`);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('AI content was:', aiContent);
      throw new Error('AI returned invalid job data format. Try again or use manual entry.');
    }

    if (jobs.length === 0) {
      // No jobs on the source page: clear any previously stored jobs for this source
      try {
        if (jobSourceId) {
          const { data: deletedRows, error: delErr } = await supabase
            .from('jobs')
            .delete()
            .eq('job_source_id', jobSourceId)
            .select('id');
          if (delErr) console.error('Error clearing previous jobs by job_source_id:', delErr);
          else console.log(`Cleared ${deletedRows?.length ?? 0} previous job(s) for source ${jobSourceId}`);
        } else {
          const { data: deletedRows, error: delErr } = await supabase
            .from('jobs')
            .delete()
            .eq('linkedin_url', linkedinUrl)
            .select('id');
          if (delErr) console.error('Error clearing previous jobs by linkedin_url:', delErr);
          else console.log(`Cleared ${deletedRows?.length ?? 0} previous job(s) for ${linkedinUrl}`);
        }
      } catch (clearErr) {
        console.error('Exception while clearing previous jobs:', clearErr);
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: 'No active postings detected; cleared previous jobs for this source.',
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
            job_source_id: jobSourceId || null,
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

    // Remove stale jobs that are no longer present on the source page
    let removedStale = 0;
    try {
      const currentUrls = Array.from(new Set(jobs.map((j) => j.job_url.trim())));
      if (currentUrls.length > 0) {
        if (jobSourceId) {
          const { data: deletedRows, error: delErr } = await supabase
            .from('jobs')
            .delete()
            .eq('job_source_id', jobSourceId)
            .not('job_url', 'in', currentUrls)
            .select('id');
          if (delErr) console.error('Error deleting stale jobs by job_source_id:', delErr);
          else removedStale = deletedRows?.length ?? 0;
        } else {
          const { data: deletedRows, error: delErr } = await supabase
            .from('jobs')
            .delete()
            .eq('linkedin_url', linkedinUrl)
            .not('job_url', 'in', currentUrls)
            .select('id');
          if (delErr) console.error('Error deleting stale jobs by linkedin_url:', delErr);
          else removedStale = deletedRows?.length ?? 0;
        }
      }
    } catch (staleErr) {
      console.error('Exception while deleting stale jobs:', staleErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Synced ${successCount} job${successCount !== 1 ? 's' : ''}${removedStale ? `, removed ${removedStale} stale` : ''}.`,
        total: jobs.length,
        synced: successCount,
        removed_stale: removedStale,
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
