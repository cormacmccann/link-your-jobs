import { Zap, BarChart3, Calendar, Bell, Cookie, Shield, Gauge, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import kamrokLogo from "@/assets/kamrok-logo.png";

const Tools = () => {
  const tools = [
    {
      icon: Zap,
      title: "Automations",
      description: "Create workflow automations with triggers and actions. Save hours of manual work."
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Track pipeline value, revenue, conversion rates, and team performance."
    },
    {
      icon: Calendar,
      title: "Calendar & Bookings",
      description: "Schedule meetings, accept bookings, and sync with your calendar."
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Real-time alerts for important events and customer interactions."
    },
    {
      icon: Cookie,
      title: "Cookie Consent",
      description: "GDPR-compliant cookie banner with consent management built-in."
    },
    {
      icon: Shield,
      title: "Privacy Builder",
      description: "Generate privacy policies and terms of service automatically."
    },
    {
      icon: Gauge,
      title: "Performance Tools",
      description: "Site speed monitoring and optimization recommendations."
    },
    {
      icon: Star,
      title: "Review Widget",
      description: "Collect and display customer reviews on your website."
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
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-gobold uppercase tracking-tight mb-6">
              All Tools & Extras
            </h1>
            <p className="text-xl text-text-2 max-w-3xl mx-auto">
              Powerful tools to automate, analyze, and optimize your business. All included, no extra fees.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((item, index) => {
              const Icon = item.icon;
              return (
                <GlowCard key={index} glowColor="blue" customSize className="p-6">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center">
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

export default Tools;
