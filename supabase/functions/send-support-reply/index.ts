import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from 'npm:resend@2.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { to, subject, body, threadId, replyTo } = await req.json();

    console.log('Sending support reply to:', to);

    const emailOptions: any = {
      from: 'Support <support@kamrok.app>',
      to: [to],
      subject: subject,
      text: body,
      headers: {
        'In-Reply-To': threadId,
        'References': threadId,
      }
    };

    if (replyTo) {
      emailOptions.replyTo = replyTo;
    }

    const { data, error } = await resend.emails.send(emailOptions);

    if (error) throw error;

    console.log('Email sent successfully:', data);

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
