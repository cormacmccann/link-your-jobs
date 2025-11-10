import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
    );

    console.log('Received Stripe webhook:', event.type);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    if (event.type === 'invoice.paid') {
      const invoice = event.data.object as Stripe.Invoice;
      
      console.log('Invoice paid:', invoice.id);
      
      await supabase
        .from('invoices')
        .update({
          status: 'paid',
          paid_at: new Date().toISOString(),
          stripe_payment_intent_id: invoice.payment_intent as string,
        })
        .eq('stripe_invoice_id', invoice.id);
    }

    if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object as Stripe.Invoice;
      
      console.log('Invoice payment failed:', invoice.id);
      
      await supabase
        .from('invoices')
        .update({
          status: 'overdue',
        })
        .eq('stripe_invoice_id', invoice.id);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
