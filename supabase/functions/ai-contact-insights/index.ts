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
    const { contactId, organizationId } = await req.json();
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch contact data with related info
    const { data: contact, error: contactError } = await supabaseClient
      .from('contacts')
      .select(`
        *,
        companies (name, industry, website),
        deals (title, value, stage),
        tasks (title, status, priority)
      `)
      .eq('id', contactId)
      .eq('organization_id', organizationId)
      .single();

    if (contactError) throw contactError;

    // Fetch email interactions
    const { data: emails } = await supabaseClient
      .from('email_threads')
      .select('*, email_messages (*)')
      .eq('contact_id', contactId)
      .order('last_message_at', { ascending: false })
      .limit(10);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const contextData = {
      contact: {
        name: `${contact.first_name} ${contact.last_name}`,
        title: contact.title,
        company: contact.companies?.name,
        industry: contact.companies?.industry,
      },
      deals: contact.deals?.map((d: any) => ({ title: d.title, value: d.value, stage: d.stage })) || [],
      tasks: contact.tasks?.map((t: any) => ({ title: t.title, status: t.status })) || [],
      recentEmails: emails?.length || 0,
      lastInteraction: emails?.[0]?.last_message_at,
    };

    const systemPrompt = `You are a sales intelligence AI. Analyze contact data and provide actionable insights.
Focus on: engagement level, deal status, recommended next actions, and potential risks.
Be concise and specific. Provide 3-5 key insights.`;

    const userPrompt = `Analyze this contact:
${JSON.stringify(contextData, null, 2)}

Provide:
1. Engagement Level (Hot/Warm/Cold)
2. Key Insights (3-5 points)
3. Recommended Next Actions (2-3 specific actions)
4. Risk Factors (if any)

Format as JSON with fields: engagementLevel, insights (array), nextActions (array), risks (array)`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      if (response.status === 429 || response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable" }), {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const insights = JSON.parse(data.choices[0].message.content);

    return new Response(JSON.stringify(insights), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-contact-insights:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});