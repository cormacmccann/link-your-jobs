import { Monitor, Zap, Smartphone, BarChart3, ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import kamrokLogo from "@/assets/kamrok-logo.png";

const WebDesign = () => {
  const navigate = useNavigate();

  const { data: portfolioItems } = useQuery({
    queryKey: ["published-portfolio"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("is_published", true)
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const features = [
    {
      title: "Conversion-Focused",
      description: "Every design decision is made to drive results and turn visitors into customers",
      icon: BarChart3
    },
    {
      title: "Lightning Fast",
      description: "Optimized for speed and performance across all devices and connections",
      icon: Zap
    },
    {
      title: "Mobile-First",
      description: "Beautiful on every screen size, from phones to 4K displays",
      icon: Smartphone
    }
  ];

  // Fallback portfolio data if database is empty
  const fallbackPortfolio = [
    { name: "Marmion", url: "https://marmion.ie", industry: "Hospitality", logo_url: undefined },
    { name: "Carlichauns", url: "https://carlichauns.com", industry: "Retail", logo_url: undefined },
    { name: "Down to Earth Electrical", url: "https://downtoearthelectrical.ie", industry: "Services", logo_url: undefined },
    { name: "Digital Screen Displays", url: "https://digitalscreendisplays.com", industry: "Technology", logo_url: undefined },
    { name: "Nude Foods", url: "https://nude-foods.ie", industry: "Food & Beverage", logo_url: undefined },
    { name: "Greyhound Extreme", url: "https://greyhoundextreme.com", industry: "Sports", logo_url: undefined },
    { name: "AL Recovery", url: "https://alrecovery.ie", industry: "Services", logo_url: undefined },
    { name: "Visit Carlingford", url: "https://visitcarlingford.com", industry: "Tourism", logo_url: undefined },
    { name: "AVTS Tech", url: "https://avts.tech", industry: "Technology", logo_url: undefined },
    { name: "DSA Cloud", url: "https://dsa-cloud.com", industry: "Technology", logo_url: undefined },
    { name: "Conekt", url: "https://conekt.ie", industry: "Technology", logo_url: undefined },
    { name: "The Hen", url: "https://thehen.ie", industry: "Hospitality", logo_url: undefined },
    { name: "Carlingford Arms", url: "https://carlingfordarms.com", industry: "Hospitality", logo_url: undefined },
    { name: "DigiBear", url: "https://digibear.net", industry: "Technology", logo_url: undefined },
    { name: "Global Tiles & Floors", url: "https://globaltilesfloors.com", industry: "Retail", logo_url: undefined },
    { name: "McKevitts", url: "https://mckevitts.ie", industry: "Hospitality", logo_url: undefined }
  ];

  const portfolio = portfolioItems && portfolioItems.length > 0
    ? portfolioItems.map(item => ({
        name: item.client_name,
        url: item.client_url,
        industry: item.industry,
        logo_url: item.logo_url,
      }))
    : fallbackPortfolio;

  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
      {/* Header */}
      <header className="border-b border-white/10 bg-bg-0/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/services')}
              className="text-text-2 hover:text-text-1"
            >
              ← Back to Services
            </Button>
            <img 
              src={kamrokLogo} 
              alt="KAMROK" 
              className="h-10 cursor-pointer" 
              onClick={() => navigate('/')}
            />
            <Button 
              size="sm" 
              className="bg-acc-violet hover:bg-acc-violet/90 text-white rounded-full px-6"
              onClick={() => navigate('/auth')}
            >
              Connect
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/20 via-transparent to-accent-pink/20 pointer-events-none" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center justify-center mb-8 animate-fade-in">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent-pink via-accent-violet to-accent-blue flex items-center justify-center shadow-2xl shadow-accent-violet/50 animate-scale-in">
              <Monitor className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-gobold uppercase tracking-tight text-center mb-6 bg-gradient-to-r from-accent-pink via-accent-violet to-accent-blue bg-clip-text text-transparent animate-fade-in">
            Web Design
          </h1>
          <p className="text-xl md:text-3xl text-text-1 text-center max-w-4xl mx-auto font-medium mb-4 animate-fade-in">
            Stunning, conversion-focused websites that capture your brand and drive real results
          </p>
          <div className="flex items-center justify-center gap-2 text-accent-violet animate-fade-in">
            <Sparkles className="w-5 h-5" />
            <p className="text-lg">Trusted by 16+ businesses across Ireland & UK</p>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-12">
            What We Deliver
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <GlowCard key={index} glowColor="purple" customSize className="p-6">
                  <Icon className="w-10 h-10 text-acc-violet mb-4" />
                  <h3 className="text-xl font-gobold uppercase mb-2 text-text-1">
                    {feature.title}
                  </h3>
                  <p className="text-text-2">
                    {feature.description}
                  </p>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-violet/5 to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-gobold uppercase tracking-tight mb-4 bg-gradient-to-r from-accent-pink to-accent-violet bg-clip-text text-transparent">
              Our Portfolio
            </h2>
            <p className="text-xl text-text-2 max-w-2xl mx-auto">
              Real websites, real businesses, real results. See what we've built for clients across industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {portfolio.map((client, index) => (
              <a
                key={index}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-6 rounded-xl bg-bg-1/50 border border-border/50 hover:border-accent-violet/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-violet/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/10 to-accent-pink/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  {client.logo_url && (
                    <div className="mb-4 h-16 flex items-center justify-center">
                      <img
                        src={client.logo_url}
                        alt={client.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-gobold uppercase text-text-1 mb-1 group-hover:text-accent-violet transition-colors">
                        {client.name}
                      </h3>
                      <p className="text-sm text-text-2">{client.industry}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-text-2 group-hover:text-accent-violet transition-colors" />
                  </div>
                  {client.url && (
                    <div className="text-xs text-text-2 font-mono opacity-50 group-hover:opacity-100 transition-opacity">
                      {client.url.replace('https://', '')}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-text-2 text-lg">
              Ready to join these successful businesses?
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 bg-gradient-to-b from-bg-1/50 to-bg-0">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-gobold uppercase tracking-tight text-center mb-4">
            Our Process
          </h2>
          <p className="text-center text-text-2 text-lg mb-16 max-w-2xl mx-auto">
            A proven methodology that delivers exceptional results, every time
          </p>
          
          <div className="space-y-8">
            {[
              { step: "1", title: "Discovery", description: "We learn your business, audience, and goals through in-depth consultation" },
              { step: "2", title: "Strategy", description: "We plan the structure, features, and user journey tailored to your objectives" },
              { step: "3", title: "Design", description: "We create stunning mockups that bring your vision to life with pixel-perfect precision" },
              { step: "4", title: "Development", description: "We build fast, secure, and scalable websites using cutting-edge technology" },
              { step: "5", title: "Launch", description: "We deploy and optimize for maximum performance with ongoing support" }
            ].map((phase, index) => (
              <div key={index} className="group relative">
                <div className="flex gap-6 items-start p-6 rounded-2xl bg-bg-1/30 border border-border/30 hover:border-accent-violet/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-violet/10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-pink via-accent-violet to-accent-blue flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-gobold text-2xl">{phase.step}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-gobold uppercase text-text-1 mb-2 group-hover:text-accent-violet transition-colors">
                      {phase.title}
                    </h3>
                    <p className="text-text-2 text-lg">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/20 via-accent-pink/20 to-accent-blue/20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)] pointer-events-none" />
        <div className="container mx-auto max-w-5xl text-center space-y-8 relative z-10">
          <div className="inline-block">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-pink via-accent-violet to-accent-blue flex items-center justify-center shadow-2xl shadow-accent-violet/50 mx-auto mb-8 animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-gobold uppercase tracking-tight bg-gradient-to-r from-accent-pink via-accent-violet to-accent-blue bg-clip-text text-transparent">
            Ready for a website that converts?
          </h2>
          <p className="text-xl md:text-2xl text-text-1 max-w-3xl mx-auto">
            Join 16+ successful businesses who trust us to deliver exceptional web experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-accent-pink via-accent-violet to-accent-blue hover:opacity-90 text-white px-12 py-7 text-xl rounded-full font-gobold uppercase tracking-tight shadow-2xl shadow-accent-violet/50 hover:scale-105 transition-all duration-300 group"
              onClick={() => navigate('/auth')}
            >
              Start Your Project
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-accent-violet text-accent-violet hover:bg-accent-violet/10 px-12 py-7 text-xl rounded-full font-gobold uppercase tracking-tight"
              onClick={() => navigate('/contact')}
            >
              View More Work
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebDesign;
