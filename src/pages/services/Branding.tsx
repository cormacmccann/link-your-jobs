import { Target, Compass, Star, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { useNavigate } from "react-router-dom";
import kamrokLogo from "@/assets/kamrok-logo.png";
import ServicesFooter from "@/components/ServicesFooter";

const Branding = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Brand Strategy",
      description: "Define your positioning, messaging, and unique value proposition",
      icon: Compass
    },
    {
      title: "Visual Identity",
      description: "Logos, color systems, typography, and brand guidelines",
      icon: Star
    },
    {
      title: "Brand Experience",
      description: "Touchpoints, voice, tone, and consistent customer experience",
      icon: TrendingUp
    }
  ];

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
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-violet to-accent-cyan flex items-center justify-center">
              <Target className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-gobold uppercase tracking-tight text-center mb-6">
            Branding
          </h1>
          <p className="text-xl md:text-2xl text-text-2 text-center max-w-3xl mx-auto">
            Complete brand strategy and identity systems that set you apart from the competition
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-12">
            What's Included
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <GlowCard key={index} glowColor="blue" customSize className="p-6">
                  <Icon className="w-10 h-10 text-acc-cyan mb-4" />
                  <h3 className="text-xl font-gobold uppercase mb-2 text-text-1">
                    {service.title}
                  </h3>
                  <p className="text-text-2">
                    {service.description}
                  </p>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brand Journey */}
      <section className="py-16 px-4 bg-bg-1/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-12">
            The Brand Journey
          </h2>
          
          <div className="space-y-6">
            {[
              { step: "1", title: "Discovery Workshop", description: "Deep dive into your business, audience, and competitive landscape" },
              { step: "2", title: "Strategy Development", description: "Define positioning, messaging pillars, and brand personality" },
              { step: "3", title: "Identity Design", description: "Create visual identity system including logo, colors, and typography" },
              { step: "4", title: "Brand Guidelines", description: "Comprehensive guide for consistent brand application" },
              { step: "5", title: "Launch Support", description: "Implementation across all touchpoints and marketing materials" }
            ].map((phase, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-violet to-accent-cyan flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-gobold text-lg">{phase.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-gobold uppercase text-text-1 mb-1">
                    {phase.title}
                  </h3>
                  <p className="text-text-2">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Branding Matters */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-12">
            Why Branding Matters
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Recognition", description: "Stand out in a crowded market with a distinctive brand" },
              { title: "Trust", description: "Build credibility and confidence with consistent messaging" },
              { title: "Value", description: "Command premium pricing with a strong brand perception" },
              { title: "Loyalty", description: "Create emotional connections that turn customers into advocates" }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-xl font-gobold uppercase text-acc-cyan">
                  {item.title}
                </h3>
                <p className="text-text-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-bg-1/50">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-gobold uppercase tracking-tight text-text-1">
            Ready to build a powerful brand?
          </h2>
          <p className="text-xl text-text-2">
            Let's create a brand that drives business growth.
          </p>
          <Button 
            size="lg" 
            className="bg-acc-violet hover:bg-acc-violet/90 text-white px-10 py-6 text-lg rounded-full font-gobold uppercase tracking-tight"
            onClick={() => navigate('/auth')}
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <ServicesFooter />
    </div>
  );
};

export default Branding;
