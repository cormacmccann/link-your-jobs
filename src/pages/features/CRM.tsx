import { Users, Building2, Tag, Clock, Filter, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import kamrokLogo from "@/assets/kamrok-logo.png";

const CRM = () => {
  const capabilities = [
    {
      icon: Users,
      title: "Contact Management",
      description: "Store and organize all your contacts with custom fields, tags, and notes"
    },
    {
      icon: Building2,
      title: "Company Profiles",
      description: "Link contacts to companies with enriched data and relationship tracking"
    },
    {
      icon: Tag,
      title: "Smart Tagging",
      description: "Organize with tags, segments, and custom categories for easy filtering"
    },
    {
      icon: Clock,
      title: "Activity Timeline",
      description: "See all interactions, emails, calls, and notes in one chronological view"
    },
    {
      icon: Filter,
      title: "Advanced Filters",
      description: "Create saved views with complex filters to find exactly what you need"
    },
    {
      icon: Star,
      title: "Lead Scoring",
      description: "AI-powered lead scoring to prioritize your hottest prospects"
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
              Try CRM
            </Button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-gobold uppercase tracking-tight mb-6">
              CRM That Works
            </h1>
            <p className="text-xl text-text-2 max-w-3xl mx-auto">
              Manage contacts, companies, and relationships in one clean interface. No bloat, just what you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <GlowCard key={index} glowColor="purple" customSize className="p-6">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center">
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

export default CRM;
