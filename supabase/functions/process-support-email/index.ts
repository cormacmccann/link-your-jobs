import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { from, to, subject, body, messageId, threadId, organizationId } = await req.json();

    console.log('Processing support email from:', from);

    // Check if email is for a specific thread
    const { data: supportEmail } = await supabase
      .from('support_email_addresses')
      .select('*, email_threads(*)')
      .eq('email_address', to)
      .single();

    let thread;
    
    if (supportEmail && supportEmail.thread_id) {
      // Email is for existing thread
      thread = supportEmail.email_threads;
      
      console.log('Adding to existing thread:', thread.id);
    } else {
      // Create new thread
      const { data: newThread } = await supabase
        .from('email_threads')
        .insert({
          organization_id: organizationId,
          thread_id: threadId || messageId,
          subject: subject,
          last_message_at: new Date().toISOString(),
        })
        .select()
        .single();
      
      thread = newThread;
      
      console.log('Created new thread:', thread.id);
    }

    // Store email message
    await supabase
      .from('email_messages')
      .insert({
        organization_id: organizationId,
        thread_id: thread.id,
        message_id: messageId,
        from_email: from,
        to_emails: [to],
        subject: subject,
        body_text: body,
        sent_at: new Date().toISOString(),
        is_outbound: false,
      });

    // Find or create contact
    let { data: contact } = await supabase
      .from('contacts')
      .select('id')
      .eq('email', from)
      .eq('organization_id', organizationId)
      .single();

    if (!contact) {
      const nameParts = from.split('@')[0].split('.');
      const { data: newContact } = await supabase
        .from('contacts')
        .insert({
          organization_id: organizationId,
          email: from,
          first_name: nameParts[0] || from.split('@')[0],
          last_name: nameParts[1] || '',
        })
        .select()
        .single();
      contact = newContact;
    }

    // Generate ticket number
    const { count } = await supabase
      .from('cards')
      .select('id', { count: 'exact', head: true })
      .eq('organization_id', organizationId)
      .eq('card_type', 'support');

    const ticketNumber = `SUPP-${new Date().getFullYear()}-${String((count || 0) + 1).padStart(4, '0')}`;

    // Create support ticket card
    const { data: card } = await supabase
      .from('cards')
      .insert({
        organization_id: organizationId,
        card_type: 'support',
        title: subject,
        description: body,
        status: 'active',
        priority: 'normal',
        related_contact_id: contact.id,
        created_by: contact.id,
        metadata: {
          ticket_number: ticketNumber,
          category: 'email',
          source: 'email',
          email_thread_id: thread.id,
          severity: 'medium',
          sla_hours: 24,
          sla_deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        }
      })
      .select()
      .single();

    // Get unique thread email
    const { data: threadEmail } = await supabase
      .from('support_email_addresses')
      .select('email_address')
      .eq('thread_id', thread.id)
      .single();

    // Send auto-reply with thread email
    await supabase.functions.invoke('send-support-reply', {
      body: {
        to: from,
        subject: `Re: ${subject} [${ticketNumber}]`,
        body: `Thank you for contacting support. Your ticket ${ticketNumber} has been created.

Our team will respond shortly.

To continue this conversation, please reply to this email or send future messages to: ${threadEmail?.email_address}

Ticket Details:
- Ticket #: ${ticketNumber}
- Status: Open
- Priority: Normal
- SLA: 24 hours`,
        threadId: thread.id,
        replyTo: threadEmail?.email_address,
      }
    });

    console.log('Support ticket created:', ticketNumber);

    return new Response(
      JSON.stringify({ 
        success: true, 
        ticketNumber, 
        cardId: card.id,
        threadEmail: threadEmail?.email_address 
      }),
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
