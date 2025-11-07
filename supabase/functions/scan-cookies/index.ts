import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { websiteUrl, policyId } = await req.json();
    console.log('Scanning cookies for:', websiteUrl);

    const scrapingBeeApiKey = Deno.env.get('SCRAPINGBEE_API_KEY');
    if (!scrapingBeeApiKey) {
      throw new Error('SCRAPINGBEE_API_KEY not configured');
    }

    // Use ScrapingBee to fetch the website and extract cookies
    const scrapingBeeUrl = `https://app.scrapingbee.com/api/v1/?api_key=${scrapingBeeApiKey}&url=${encodeURIComponent(websiteUrl)}&render_js=true&premium_proxy=true&return_page_source=true`;
    
    const response = await fetch(scrapingBeeUrl);
    const html = await response.text();

    // Extract cookies from response headers
    const setCookieHeaders = response.headers.get('set-cookie');
    
    // Parse common tracking scripts and cookies from HTML
    const detectedCookies = [];
    
    // Check for Google Analytics
    if (html.includes('google-analytics.com') || html.includes('gtag')) {
      detectedCookies.push({
        cookie_name: '_ga',
        domain: websiteUrl,
        purpose: 'Used to distinguish users for analytics',
        cookie_type: 'Analytics',
        duration: '2 years'
      });
      detectedCookies.push({
        cookie_name: '_gid',
        domain: websiteUrl,
        purpose: 'Used to distinguish users for analytics',
        cookie_type: 'Analytics',
        duration: '24 hours'
      });
    }

    // Check for Facebook Pixel
    if (html.includes('facebook.com/tr') || html.includes('fbq(')) {
      detectedCookies.push({
        cookie_name: '_fbp',
        domain: websiteUrl,
        purpose: 'Used by Facebook for advertising and analytics',
        cookie_type: 'Marketing',
        duration: '3 months'
      });
    }

    // Check for common advertising cookies
    if (html.includes('doubleclick.net') || html.includes('googlesyndication')) {
      detectedCookies.push({
        cookie_name: 'IDE',
        domain: 'doubleclick.net',
        purpose: 'Used by Google DoubleClick for advertising',
        cookie_type: 'Marketing',
        duration: '1 year'
      });
    }

    // Check for session cookies
    if (html.includes('PHPSESSID') || html.includes('session')) {
      detectedCookies.push({
        cookie_name: 'PHPSESSID',
        domain: websiteUrl,
        purpose: 'Preserves user session state',
        cookie_type: 'Necessary',
        duration: 'Session'
      });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save detected cookies to database
    if (detectedCookies.length > 0) {
      const cookiesWithPolicyId = detectedCookies.map(cookie => ({
        ...cookie,
        policy_id: policyId
      }));

      const { error: insertError } = await supabase
        .from('detected_cookies')
        .insert(cookiesWithPolicyId);

      if (insertError) {
        console.error('Error inserting cookies:', insertError);
      }
    }

    console.log(`Detected ${detectedCookies.length} cookies`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        cookies: detectedCookies,
        count: detectedCookies.length 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error scanning cookies:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});