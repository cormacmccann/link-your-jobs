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

    // Fetch contact and related activity
    const { data: contact } = await supabaseClient
      .from('contacts')
      .select(`
        *,
        companies (name, industry, website, employee_count, revenue),
        deals (stage, value, created_at),
        tasks (status, created_at)
      `)
      .eq('id', contactId)
      .single();

    // Email activity
    const { data: emailThreads } = await supabaseClient
      .from('email_threads')
      .select('id, last_message_at, email_messages (opened_at, clicked_at, replied_at)')
      .eq('contact_id', contactId);

    // Calculate scores
    const emailCount = emailThreads?.length || 0;
    const recentEmails = emailThreads?.filter(t => {
      const daysSince = (Date.now() - new Date(t.last_message_at).getTime()) / (1000 * 60 * 60 * 24);
      return daysSince <= 30;
    }).length || 0;

    const openRate = emailThreads?.reduce((acc, t) => 
      acc + (t.email_messages?.filter((m: any) => m.opened_at).length || 0), 0
    ) || 0;
    
    const clickRate = emailThreads?.reduce((acc, t) => 
      acc + (t.email_messages?.filter((m: any) => m.clicked_at).length || 0), 0
    ) || 0;

    const replyRate = emailThreads?.reduce((acc, t) => 
      acc + (t.email_messages?.filter((m: any) => m.replied_at).length || 0), 0
    ) || 0;

    // Engagement score (0-100)
    let engagementScore = 0;
    engagementScore += Math.min(recentEmails * 5, 30); // Up to 30 points for recent emails
    engagementScore += Math.min(openRate * 3, 25); // Up to 25 for opens
    engagementScore += Math.min(clickRate * 5, 25); // Up to 25 for clicks
    engagementScore += Math.min(replyRate * 10, 20); // Up to 20 for replies

    // Fit score (0-100) - based on company data
    let fitScore = 50; // Base score
    const company = contact?.companies;
    if (company?.employee_count) {
      const empCount = parseInt(company.employee_count);
      if (empCount > 100) fitScore += 20;
      else if (empCount > 50) fitScore += 10;
    }
    if (company?.revenue) {
      const revenue = parseInt(company.revenue.replace(/\D/g, ''));
      if (revenue > 10000000) fitScore += 20;
      else if (revenue > 1000000) fitScore += 10;
    }
    if (contact?.title?.toLowerCase().includes('director') || 
        contact?.title?.toLowerCase().includes('vp') ||
        contact?.title?.toLowerCase().includes('chief')) {
      fitScore += 10;
    }

    // Activity score (0-100)
    const openDeals = contact?.deals?.filter((d: any) => d.stage !== 'won' && d.stage !== 'lost').length || 0;
    const completedTasks = contact?.tasks?.filter((t: any) => t.status === 'completed').length || 0;
    let activityScore = 0;
    activityScore += Math.min(openDeals * 20, 40);
    activityScore += Math.min(completedTasks * 5, 30);
    activityScore += Math.min(emailCount * 2, 30);

    const totalScore = Math.round((engagementScore + fitScore + activityScore) / 3);

    // Update database
    await supabaseClient
      .from('contact_scores')
      .upsert({
        contact_id: contactId,
        organization_id: organizationId,
        total_score: totalScore,
        engagement_score: Math.round(engagementScore),
        fit_score: Math.round(fitScore),
        activity_score: Math.round(activityScore),
        last_calculated_at: new Date().toISOString(),
      });

    return new Response(JSON.stringify({
      totalScore,
      engagementScore: Math.round(engagementScore),
      fitScore: Math.round(fitScore),
      activityScore: Math.round(activityScore),
      grade: totalScore >= 80 ? 'A' : totalScore >= 60 ? 'B' : totalScore >= 40 ? 'C' : 'D'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-lead-scoring:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});