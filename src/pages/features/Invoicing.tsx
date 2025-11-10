import { FileText, DollarSign, CreditCard, Mail, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import kamrokLogo from "@/assets/kamrok-logo.png";

const Invoicing = () => {
  const capabilities = [
    {
      icon: FileText,
      title: "Professional Quotes",
      description: "Create beautiful quotes with line items, taxes, and custom branding"
    },
    {
      icon: DollarSign,
      title: "Invoice Generation",
      description: "Convert quotes to invoices instantly with one click"
    },
    {
      icon: CreditCard,
      title: "Stripe Integration",
      description: "Accept payments directly with secure Stripe payment links"
    },
    {
      icon: Mail,
      title: "Automated Reminders",
      description: "Send payment reminders automatically for overdue invoices"
    },
    {
      icon: Clock,
      title: "Payment Tracking",
      description: "Track payment status, history, and outstanding balances"
    },
    {
      icon: CheckCircle,
      title: "Quick Templates",
      description: "Save time with reusable invoice templates and recurring billing"
    }
  ];

  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
      <header className="border-b border-white/10 bg-bg-0/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/">
              <img src={kamrokLogo} alt="KAMROK" className="h-10" />
            </a>
            <Button size="sm" className="bg-acc-violet hover:bg-acc-violet/90 text-white rounded-full px-6" onClick={() => window.location.href = '/auth'}>
              Try Invoicing
            </Button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-gobold uppercase tracking-tight mb-6">
              Invoicing & Payments
            </h1>
            <p className="text-xl text-text-2 max-w-3xl mx-auto">
              Create quotes, send invoices, and get paid faster. Stripe integration makes payments seamless.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <GlowCard key={index} glowColor="purple" customSize className="p-6">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-violet to-accent-pink flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-gobold uppercase mb-2 text-text-1">
                    {item.title}
                  </h3>
                  <p className="text-text-2">
                    {item.description}
                  </p>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Invoicing;
