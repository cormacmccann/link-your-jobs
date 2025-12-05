import { Globe, Palette, Code, Smartphone, Rocket, Award, Sparkles, Clock, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { HeroSection } from "@/components/ui/hero-section";
import kamrokLogo from "@/assets/kamrok-logo.png";

const Index = () => {
  const services = [
    {
      title: "Web Design",
      description: "Beautiful, responsive websites that convert visitors into customers",
      icon: Globe,
      color: "purple" as const,
      href: "/services/web-design"
    },
    {
      title: "App Development",
      description: "Custom web and mobile applications built for your business needs",
      icon: Smartphone,
      color: "blue" as const,
      href: "/services/app-development"
    },
    {
      title: "Branding",
      description: "Logo design, brand identity, and visual guidelines that stand out",
      icon: Award,
      color: "purple" as const,
      href: "/services/branding"
    },
    {
      title: "Graphic Design",
      description: "Print materials, social media assets, and marketing collateral",
      icon: Palette,
      color: "orange" as const,
      href: "/services/graphic-design"
    },
    {
      title: "Video Production",
      description: "Promotional videos, animations, and motion graphics",
      icon: Code,
      color: "blue" as const,
      href: "/services/video-design"
    },
    {
      title: "Digital Strategy",
      description: "SEO, analytics, and conversion optimization for better results",
      icon: Rocket,
      color: "purple" as const,
      href: "/contact"
    }
  ];

  const whyCards = [
    {
      title: "Creative Excellence",
      description: "Award-winning designs that make your brand memorable and drive results.",
      icon: Sparkles
    },
    {
      title: "Fast Turnaround",
      description: "We respect deadlines. Your project delivered on time, every time.",
      icon: Clock
    },
    {
      title: "Partnership Approach",
      description: "We work with you, not just for you. Your success is our success.",
      icon: HeartHandshake
    }
  ];

  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
      {/* Hero Section */}
      <HeroSection />

      {/* Why KAMROK */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-12">
            Why KAMROK
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {whyCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <GlowCard key={index} glowColor="purple" customSize className="p-6 flex flex-col h-full">
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-gobold uppercase mb-3 text-text-1">
                      {card.title}
                    </h3>
                    <p className="text-text-2 text-lg">
                      {card.description}
                    </p>
                  </div>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-4">
            Our Services
          </h2>
          <p className="text-text-2 text-center mb-12">Everything you need to build a powerful online presence</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <a key={index} href={service.href} className="group">
                  <GlowCard glowColor={service.color} customSize className="p-6 flex flex-col h-full min-h-[240px] transition-transform group-hover:scale-[1.02]">
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-xl font-gobold uppercase mb-2 text-text-1">
                        {service.title}
                      </h3>
                      <p className="text-text-2">
                        {service.description}
                      </p>
                    </div>
                  </GlowCard>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 bg-bg-1/50">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight mb-4">
            Full Service{" "}
            <span className="text-accent-cyan">Agency</span>
          </h2>
          <p className="text-text-2 text-lg mb-8 max-w-3xl mx-auto">
            From concept to launch, we handle everything — design, development, hosting, 
            SEO, analytics, and ongoing support. One team, complete solutions.
          </p>
          <p className="text-accent-pink italic">
            No juggling multiple vendors
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-4">
            Our Pricing
          </h2>
          <p className="text-text-2 text-center mb-12">Transparent pricing for quality work</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlowCard glowColor="purple" customSize className="p-6 text-center">
              <h3 className="text-xl font-gobold uppercase mb-2 text-text-1">Free Consultation</h3>
              <p className="text-3xl font-gobold text-accent-cyan mb-2">Free</p>
              <p className="text-text-2 text-sm">Let's discuss your project needs</p>
            </GlowCard>
            
            <GlowCard glowColor="blue" customSize className="p-6 text-center">
              <h3 className="text-xl font-gobold uppercase mb-2 text-text-1">Web Design</h3>
              <p className="text-3xl font-gobold text-accent-cyan mb-2">€3,500</p>
              <p className="text-text-2 text-sm">Custom responsive website</p>
            </GlowCard>
            
            <GlowCard glowColor="purple" customSize className="p-6 text-center">
              <h3 className="text-xl font-gobold uppercase mb-2 text-text-1">WordPress + eCommerce</h3>
              <p className="text-3xl font-gobold text-accent-cyan mb-2">€4,500</p>
              <p className="text-text-2 text-sm">Full online store setup</p>
            </GlowCard>
            
            <GlowCard glowColor="blue" customSize className="p-6 text-center">
              <h3 className="text-xl font-gobold uppercase mb-2 text-text-1">Shopify Support & Build</h3>
              <p className="text-3xl font-gobold text-accent-cyan mb-2">€3,500</p>
              <p className="text-text-2 text-sm">Shopify store setup & support</p>
            </GlowCard>
            
            <GlowCard glowColor="purple" customSize className="p-6 text-center">
              <h3 className="text-xl font-gobold uppercase mb-2 text-text-1">Custom Projects</h3>
              <p className="text-3xl font-gobold text-accent-cyan mb-2">From €5,500</p>
              <p className="text-text-2 text-sm">Bespoke solutions tailored to you</p>
            </GlowCard>
            
            <GlowCard glowColor="orange" customSize className="p-6 text-center flex flex-col justify-center">
              <p className="text-accent-pink font-gobold uppercase text-lg">Payment Plans</p>
              <p className="text-text-2 text-sm mt-2">Flexible payment options available</p>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-gobold uppercase tracking-tight mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-text-2 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss your vision and create something extraordinary together. 
            Get in touch for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 text-white font-gobold uppercase tracking-tight px-8"
              onClick={() => window.location.href = '/contact'}
            >
              Get in Touch
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10 font-gobold uppercase tracking-tight px-8"
              onClick={() => window.location.href = '/services/web-design'}
            >
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-white/10 bg-bg-1/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1 space-y-4">
              <img src={kamrokLogo} alt="KAMROK" className="h-10" />
              <p className="text-text-2 text-sm">
                Full-stack creative agency building brands that stand out and websites that perform.
              </p>
            </div>
            
            {/* Services Column */}
            <div className="space-y-4">
              <h3 className="font-gobold uppercase text-text-1 text-sm">Services</h3>
              <nav className="flex flex-col gap-3">
                <a href="/services/web-design" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Web Design</a>
                <a href="/services/app-development" className="text-text-2 hover:text-acc-violet transition-colors text-sm">App Development</a>
                <a href="/services/graphic-design" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Graphic Design</a>
                <a href="/services/video-design" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Video Design</a>
                <a href="/services/branding" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Branding</a>
              </nav>
            </div>
            
            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="font-gobold uppercase text-text-1 text-sm">Company</h3>
              <nav className="flex flex-col gap-3">
                <a href="/clients" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Clients</a>
                <a href="/contact" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Contact</a>
              </nav>
            </div>
            
            {/* Contact Column */}
            <div className="space-y-4">
              <h3 className="font-gobold uppercase text-text-1 text-sm">Get in Touch</h3>
              <nav className="flex flex-col gap-3">
                <a href="mailto:hello@kamrok.com" className="text-text-2 hover:text-acc-violet transition-colors text-sm">hello@kamrok.com</a>
                <a href="/contact" className="text-accent-cyan hover:text-accent-cyan/80 transition-colors text-sm font-medium">Start a Project →</a>
              </nav>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-text-2 text-sm">
            © 2025 KAMROK. Creative agency for brands that want to stand out.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
