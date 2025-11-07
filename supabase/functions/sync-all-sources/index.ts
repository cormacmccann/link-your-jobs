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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get all active job sources
    const { data: sources, error: sourcesError } = await supabase
      .from('job_sources')
      .select('id, source_url')
      .eq('is_active', true);

    if (sourcesError) throw sourcesError;

    console.log(`Starting auto-sync for ${sources?.length || 0} job sources`);

    // Sync each source
    const syncPromises = sources?.map(async (source) => {
      try {
        const response = await fetch(`${supabaseUrl}/functions/v1/sync-jobs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
          },
          body: JSON.stringify({
            jobSourceId: source.id,
            linkedinUrl: source.source_url,
          }),
        });

        if (!response.ok) {
          console.error(`Failed to sync source ${source.id}:`, await response.text());
        } else {
          console.log(`Successfully synced source ${source.id}`);
        }
      } catch (error) {
        console.error(`Error syncing source ${source.id}:`, error);
      }
    }) || [];

    await Promise.all(syncPromises);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Synced ${sources?.length || 0} sources` 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Auto-sync error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});