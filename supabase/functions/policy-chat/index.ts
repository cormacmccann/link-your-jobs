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
    const { conversationId, message, policyType } = await req.json();
    console.log('Policy chat request:', { conversationId, policyType });

    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch conversation history
    const { data: conversation, error: fetchError } = await supabase
      .from('policy_conversations')
      .select('*, policies(*)')
      .eq('id', conversationId)
      .single();

    if (fetchError || !conversation) {
      throw new Error('Conversation not found');
    }

    const messages = conversation.messages || [];
    const answers = conversation.answers || {};

    // Build system prompt based on policy type
    const systemPrompts = {
      privacy: "You are a privacy policy expert. Ask targeted questions one at a time to gather information needed for a comprehensive privacy policy. Ask about: data collection, data usage, data sharing, user rights, data retention, cookies, third-party services, contact information. Keep questions clear and conversational.",
      cookie: "You are a cookie policy expert. Ask questions one at a time about: types of cookies used, cookie purposes, third-party cookies, cookie duration, user consent mechanisms, how to disable cookies. Be thorough but conversational.",
      terms: "You are a terms of service expert. Ask questions one at a time about: service description, user obligations, intellectual property, liability limitations, dispute resolution, termination conditions, modifications to terms. Keep it clear and professional.",
      gdpr: "You are a GDPR compliance expert. Ask questions one at a time about: data processing lawful basis, data subject rights, data transfers, DPO contact, breach notifications, data retention periods. Focus on EU compliance requirements.",
      ccpa: "You are a CCPA compliance expert. Ask questions one at a time about: personal information categories collected, sale/sharing of personal information, consumer rights, opt-out mechanisms, financial incentives. Focus on California compliance."
    };

    const systemPrompt = systemPrompts[policyType as keyof typeof systemPrompts] || systemPrompts.privacy;

    // Add user message to history
    messages.push({
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    });

    // Call Lovable AI
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((m: any) => ({ role: m.role, content: m.content }))
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const assistantMessage = aiData.choices[0].message.content;

    // Add assistant response to history
    messages.push({
      role: 'assistant',
      content: assistantMessage,
      timestamp: new Date().toISOString()
    });

    // Update conversation in database
    const { error: updateError } = await supabase
      .from('policy_conversations')
      .update({ 
        messages,
        updated_at: new Date().toISOString()
      })
      .eq('id', conversationId);

    if (updateError) {
      console.error('Error updating conversation:', updateError);
    }

    return new Response(
      JSON.stringify({ 
        message: assistantMessage,
        conversationId 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error in policy chat:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});