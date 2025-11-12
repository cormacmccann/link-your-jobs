import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { to, subject, body, threadId, replyTo } = await req.json();

    console.log('Sending support reply to:', to);
    console.log('Subject:', subject);
    console.log('Body:', body);

    // TODO: Implement actual email sending with preferred provider
    // For now, just log the email details
    
    return new Response(
      JSON.stringify({ success: true, message: 'Email logged successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error processing email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
