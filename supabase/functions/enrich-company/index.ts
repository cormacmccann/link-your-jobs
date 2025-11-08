import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { companyId, domain } = await req.json();
    
    if (!domain) {
      return new Response(JSON.stringify({ error: "Domain is required" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Basic enrichment using public data (in production, use Clearbit or similar API)
    const enrichedData: any = {
      company_id: companyId,
      domain: domain,
      enriched_at: new Date().toISOString(),
    };

    // Try to fetch from various sources
    try {
      // Fetch from company website
      const websiteResponse = await fetch(`https://${domain}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(5000),
      });
      
      if (websiteResponse.ok) {
        const html = await websiteResponse.text();
        
        // Extract description from meta tags
        const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i);
        if (descMatch) enrichedData.description = descMatch[1];
        
        // Extract LinkedIn
        const linkedinMatch = html.match(/https?:\/\/(www\.)?linkedin\.com\/company\/[^"'\s]+/i);
        if (linkedinMatch) enrichedData.linkedin_url = linkedinMatch[0];
        
        // Extract Twitter
        const twitterMatch = html.match(/https?:\/\/(www\.)?twitter\.com\/[^"'\s]+/i);
        if (twitterMatch) enrichedData.twitter_url = twitterMatch[0];
        
        // Extract Facebook
        const facebookMatch = html.match(/https?:\/\/(www\.)?facebook\.com\/[^"'\s]+/i);
        if (facebookMatch) enrichedData.facebook_url = facebookMatch[0];
      }
    } catch (error) {
      console.log('Website fetch error:', error instanceof Error ? error.message : 'Unknown error');
    }

    // Save to database
    const { error: upsertError } = await supabaseClient
      .from('company_enrichment')
      .upsert(enrichedData);

    if (upsertError) throw upsertError;

    return new Response(JSON.stringify({ 
      success: true, 
      data: enrichedData 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in enrich-company:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});