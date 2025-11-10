import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { invoiceId } = await req.json();

    console.log('Creating Stripe invoice for:', invoiceId);

    // Get invoice from database
    const { data: invoice, error } = await supabase
      .from('invoices')
      .select('*, invoice_items(*)')
      .eq('id', invoiceId)
      .single();

    if (error) throw error;

    // Create or retrieve Stripe customer
    const customers = await stripe.customers.list({
      email: invoice.customer_email,
      limit: 1
    });

    let customer;
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: invoice.customer_email,
        name: invoice.customer_name,
      });
    }

    // Create Stripe invoice
    const stripeInvoice = await stripe.invoices.create({
      customer: customer.id,
      auto_advance: false,
      collection_method: 'send_invoice',
      days_until_due: Math.max(1, Math.ceil(
        (new Date(invoice.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      )),
      metadata: {
        kamrok_invoice_id: invoiceId,
        organization_id: invoice.organization_id,
      }
    });

    // Add line items
    for (const item of invoice.invoice_items) {
      await stripe.invoiceItems.create({
        customer: customer.id,
        invoice: stripeInvoice.id,
        description: item.description,
        quantity: parseFloat(item.quantity),
        unit_amount: Math.round(parseFloat(item.unit_price) * 100),
      });
    }

    // Finalize the invoice to create payment intent
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(stripeInvoice.id);

    // Update database with Stripe info
    await supabase
      .from('invoices')
      .update({
        stripe_invoice_id: finalizedInvoice.id,
        payment_link: finalizedInvoice.hosted_invoice_url,
        status: 'sent',
        updated_at: new Date().toISOString(),
      })
      .eq('id', invoiceId);

    console.log('Stripe invoice created successfully:', finalizedInvoice.id);

    return new Response(
      JSON.stringify({ 
        success: true,
        invoiceUrl: finalizedInvoice.hosted_invoice_url,
        stripeInvoiceId: finalizedInvoice.id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error creating Stripe invoice:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
