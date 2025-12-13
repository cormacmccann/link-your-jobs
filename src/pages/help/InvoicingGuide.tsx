import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Receipt, CreditCard, Send, CheckCircle } from "lucide-react";
import kamrokLogo from "@/assets/kamrok-logo.png";

export default function InvoicingGuide() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/help" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Help Center
          </Link>
          <Link to="/">
            <img src={kamrokLogo} alt="KAMROK" className="h-8" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-acc-violet/10">
            <Receipt className="h-8 w-8 text-acc-violet" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Invoicing & Payments</h1>
            <p className="text-muted-foreground">Get paid faster with Stripe integration</p>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <p className="text-lg">
            KAMROK integrates with Stripe to let you create professional invoices, accept payments online, and track payment status - all from within the CRM.
          </p>
        </div>

        {/* How It Works */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="border rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-acc-violet/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-acc-violet font-bold">1</span>
            </div>
            <h3 className="font-medium mb-1">Create</h3>
            <p className="text-xs text-muted-foreground">Add line items and customer details</p>
          </div>
          <div className="border rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-acc-violet/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-acc-violet font-bold">2</span>
            </div>
            <h3 className="font-medium mb-1">Send</h3>
            <p className="text-xs text-muted-foreground">Email invoice with payment link</p>
          </div>
          <div className="border rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-acc-violet/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-acc-violet font-bold">3</span>
            </div>
            <h3 className="font-medium mb-1">Pay</h3>
            <p className="text-xs text-muted-foreground">Customer pays via Stripe</p>
          </div>
          <div className="border rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="font-medium mb-1">Done</h3>
            <p className="text-xs text-muted-foreground">Invoice marked paid automatically</p>
          </div>
        </div>

        {/* Creating an Invoice */}
        <div className="border rounded-xl p-6 mb-8" id="create">
          <h2 className="text-xl font-semibold mb-4">Creating an Invoice</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">1</span>
              <div>
                <p className="font-medium">Go to Mission Control → Invoices</p>
                <p className="text-sm text-muted-foreground">Access invoicing from the Mission Control menu.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">2</span>
              <div>
                <p className="font-medium">Click "New Invoice"</p>
                <p className="text-sm text-muted-foreground">An invoice number is auto-generated (e.g., INV-24-0001).</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">3</span>
              <div>
                <p className="font-medium">Add customer details</p>
                <p className="text-sm text-muted-foreground">Select from existing contacts or enter new customer info.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">4</span>
              <div>
                <p className="font-medium">Add line items</p>
                <p className="text-sm text-muted-foreground">Add products/services with quantities and prices. Tax is calculated automatically.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">5</span>
              <div>
                <p className="font-medium">Send or save as draft</p>
                <p className="text-sm text-muted-foreground">Send immediately or save to send later.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Invoice Statuses */}
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Invoice Statuses</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm font-medium">Draft</span>
              <span className="text-sm text-muted-foreground">Not yet sent to customer</span>
            </div>
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <span className="px-3 py-1 bg-blue-200 dark:bg-blue-900 rounded-full text-sm font-medium">Sent</span>
              <span className="text-sm text-muted-foreground">Emailed to customer, awaiting payment</span>
            </div>
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <span className="px-3 py-1 bg-yellow-200 dark:bg-yellow-900 rounded-full text-sm font-medium">Overdue</span>
              <span className="text-sm text-muted-foreground">Past due date, not yet paid</span>
            </div>
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <span className="px-3 py-1 bg-green-200 dark:bg-green-900 rounded-full text-sm font-medium">Paid</span>
              <span className="text-sm text-muted-foreground">Payment received via Stripe</span>
            </div>
          </div>
        </div>

        {/* Stripe Setup */}
        <div className="border rounded-xl p-6 mb-8 bg-gradient-to-r from-acc-violet/5 to-acc-cyan/5">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="h-6 w-6 text-acc-violet" />
            <h2 className="text-xl font-semibold">Setting Up Stripe</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            To accept payments, you need to connect your Stripe account in Settings. KAMROK uses Stripe to securely process credit card payments.
          </p>
          <ol className="space-y-2 text-sm">
            <li>1. Go to Settings → Integrations</li>
            <li>2. Click "Connect Stripe"</li>
            <li>3. Log in to your Stripe account (or create one)</li>
            <li>4. Authorize KAMROK to create invoices</li>
          </ol>
        </div>

        <div className="border rounded-xl p-6 bg-muted/30">
          <h3 className="font-semibold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/help/deals" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Deals</h4>
              <p className="text-sm text-muted-foreground">Convert deals to invoices</p>
            </Link>
            <Link to="/help/settings" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Settings</h4>
              <p className="text-sm text-muted-foreground">Configure Stripe integration</p>
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center border-t pt-8">
          <p className="text-muted-foreground mb-4">Was this article helpful?</p>
          <div className="flex justify-center gap-4">
            <Button variant="outline">👍 Yes</Button>
            <Button variant="outline">👎 No</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
