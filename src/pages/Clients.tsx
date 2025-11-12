import { Building2, Star, TrendingUp, Users, ExternalLink, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import kamrokLogo from "@/assets/kamrok-logo.png";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { PortfolioPlaceholder } from "@/components/PortfolioPlaceholder";
import { ScreenshotCarousel } from "@/components/ScreenshotCarousel";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const Clients = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<string>("all");

  const { data: portfolioItems } = useQuery({
    queryKey: ["published-portfolio"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("is_published", true)
        .order("is_featured", { ascending: false })
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

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
    { icon: Users, value: portfolioItems?.length || "16+", label: "Happy Clients" },
    { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" },
    { icon: Star, value: "4.9/5", label: "Average Rating" }
  ];

  // Get unique industries for filtering
  const industries = ["all", ...new Set(portfolioItems?.map(item => item.industry).filter(Boolean) || [])];
  
  // Available services
  const services = ["all", "DESIGN", "WEB_DESIGN", "DEVELOPMENT", "BRANDING", "APP_DEVELOPMENT"];

  // Filter portfolio items by industry and service
  const filteredPortfolio = portfolioItems?.filter(item => {
    const matchesIndustry = selectedIndustry === "all" || item.industry === selectedIndustry;
    const matchesService = selectedService === "all" || (item as any).services?.includes(selectedService);
    return matchesIndustry && matchesService;
  });

  // Prepare products for HeroParallax with featured items first
  const parallaxProducts = (portfolioItems || [])
    .map(item => ({
      title: item.client_name,
      link: item.client_url,
      thumbnail: item.screenshots?.[0] || null,
      isFeatured: item.is_featured,
      clientName: item.client_name,
    }))
    .slice(0, 15); // Limit to 15 for parallax

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

      {/* Hero Parallax */}
      {parallaxProducts.length >= 15 && (
        <HeroParallax products={parallaxProducts} />
      )}

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-gobold uppercase tracking-tight mb-6">
              Trusted by Businesses Worldwide
            </h1>
            <p className="text-xl text-text-2 max-w-3xl mx-auto">
              From startups to established enterprises, our clients choose KAMROK for results that matter
            </p>
          </div>

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

          {/* Service Filter */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2 text-text-2">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter by Service:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <Button
                  key={service}
                  variant={selectedService === service ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedService(service)}
                  className={selectedService === service 
                    ? "bg-acc-violet hover:bg-acc-violet/90 text-white" 
                    : "text-text-2 hover:text-text-1 hover:border-accent-violet/50"
                  }
                >
                  {service === "all" ? "All Services" : service.replace(/_/g, " ")}
                </Button>
              ))}
            </div>
          </div>

          {/* Industry Filter */}
          <div className="flex items-center gap-4 mb-8 flex-wrap">
            <div className="flex items-center gap-2 text-text-2">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter by Industry:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <Button
                  key={industry}
                  variant={selectedIndustry === industry ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedIndustry(industry)}
                  className={selectedIndustry === industry 
                    ? "bg-acc-violet hover:bg-acc-violet/90 text-white" 
                    : "text-text-2 hover:text-text-1 hover:border-accent-violet/50"
                  }
                >
                  {industry === "all" ? "All Industries" : industry}
                </Button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {filteredPortfolio?.map((item) => (
              <Link
                key={item.id}
                to={`/clients/${item.id}`}
                className="group relative rounded-xl bg-bg-1/50 border border-border/50 hover:border-accent-violet/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-violet/20 overflow-hidden"
              >
                {item.is_featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-gradient-to-r from-accent-pink to-accent-violet text-white border-0 shadow-lg shadow-accent-violet/50">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Featured Work
                    </Badge>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/10 to-accent-pink/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  {/* Screenshot or Placeholder */}
                  <div className="w-full h-48 overflow-hidden bg-bg-2">
                    {item.screenshots && item.screenshots.length > 0 ? (
                      <ScreenshotCarousel 
                        screenshots={item.screenshots}
                        className="w-full h-full"
                      />
                    ) : (
                      <PortfolioPlaceholder clientName={item.client_name} className="w-full h-full" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    {item.logo_url && (
                      <div className="mb-4 h-12 flex items-center justify-center">
                        <img
                          src={item.logo_url}
                          alt={item.client_name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-gobold uppercase text-text-1 mb-1 group-hover:text-accent-violet transition-colors">
                          {item.client_name}
                        </h3>
                        {item.industry && (
                          <p className="text-sm text-text-2">{item.industry}</p>
                        )}
                      </div>
                      <ExternalLink className="w-4 h-4 text-text-2 group-hover:text-accent-violet transition-colors flex-shrink-0" />
                    </div>
                    {item.description && (
                      <p className="text-sm text-text-2 mb-3 line-clamp-2">{item.description}</p>
                    )}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {(item as any).services && (item as any).services.length > 0 && (item as any).services.slice(0, 2).map((service: string) => (
                        <span key={service} className="inline-block text-xs px-2 py-1 bg-accent-cyan/20 text-accent-cyan rounded-full">
                          {service.replace(/_/g, " ")}
                        </span>
                      ))}
                      {item.project_type && !(item as any).services?.length && (
                        <span className="inline-block text-xs px-3 py-1 bg-accent-cyan/20 text-accent-cyan rounded-full">
                          {item.project_type}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Testimonials */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-12">
              What Our Clients Say
            </h2>
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
        </div>
      </section>
    </div>
  );
};

export default Clients;
