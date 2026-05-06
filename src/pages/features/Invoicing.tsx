import { FileText, DollarSign, CreditCard, Mail, Clock, CheckCircle } from "lucide-react";
import FeaturePageLayout from "@/components/FeaturePageLayout";

const Invoicing = () => (
  <FeaturePageLayout
    eyebrow="Get Paid"
    titlePrefix="Invoicing &"
    titleAccent="Payments"
    description="Create quotes, send invoices, and get paid faster. Stripe integration makes payments seamless."
    glowColor="purple"
    ctaLabel="Try Invoicing"
    capabilities={[
      { icon: FileText, title: "Professional Quotes", description: "Create beautiful quotes with line items, taxes, and custom branding" },
      { icon: DollarSign, title: "Invoice Generation", description: "Convert quotes to invoices instantly with one click" },
      { icon: CreditCard, title: "Stripe Integration", description: "Accept payments directly with secure Stripe payment links" },
      { icon: Mail, title: "Automated Reminders", description: "Send payment reminders automatically for overdue invoices" },
      { icon: Clock, title: "Payment Tracking", description: "Track payment status, history, and outstanding balances" },
      { icon: CheckCircle, title: "Quick Templates", description: "Save time with reusable invoice templates and recurring billing" },
    ]}
  />
);

export default Invoicing;
