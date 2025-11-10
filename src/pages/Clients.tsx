import { Building2, Star, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import kamrokLogo from "@/assets/kamrok-logo.png";

const Clients = () => {
  const testimonials = [
    {
      company: "TechCorp Inc",
      quote: "KAMROK transformed how we manage client relationships. The chat widget alone increased our lead capture by 40%.",
      author: "Sarah Johnson",
      role: "CEO"
    },
    {
      company: "Growth Labs",
      quote: "Best CRM we've used. Simple, fast, and actually helps us close deals faster. The invoicing integration is perfect.",
      author: "Mike Chen",
      role: "Founder"
    },
    {
      company: "Design Studio",
      quote: "Finally a tool that doesn't get in our way. We switched from three separate tools to just KAMROK.",
      author: "Emma Martinez",
      role: "Creative Director"
    }
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Happy Clients" },
    { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" },
    { icon: Star, value: "4.9/5", label: "Average Rating" }
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
              Become a Client
            </Button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-gobold uppercase tracking-tight mb-6">
              Trusted by Agencies
            </h1>
            <p className="text-xl text-text-2 max-w-3xl mx-auto">
              Marketing agencies and creative studios choose KAMROK to manage clients and close deals faster
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <GlowCard key={index} glowColor="purple" customSize className="p-8 text-center">
                  <Icon className="w-8 h-8 text-accent-violet mx-auto mb-4" />
                  <div className="text-4xl font-gobold text-text-1 mb-2">{stat.value}</div>
                  <div className="text-text-2">{stat.label}</div>
                </GlowCard>
              );
            })}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <GlowCard key={index} glowColor="blue" customSize className="p-6">
                <div className="mb-4">
                  <Building2 className="w-8 h-8 text-accent-cyan" />
                </div>
                <p className="text-text-2 mb-4 italic">"{item.quote}"</p>
                <div className="border-t border-white/10 pt-4">
                  <div className="font-gobold text-text-1">{item.author}</div>
                  <div className="text-sm text-text-2">{item.role}, {item.company}</div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clients;
