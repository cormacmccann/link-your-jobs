import { Globe, Palette, Code, Smartphone, Rocket, Award, Sparkles, Clock, HeartHandshake, Check, Monitor, ShoppingCart, Store, Layers } from "lucide-react";
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

  const pricingPlans = [
    {
      title: "Web Design",
      price: "€3,500",
      icon: Monitor,
      color: "purple" as const,
      features: [
        "Custom responsive design",
        "Up to 10 pages",
        "Mobile optimized",
        "SEO foundation setup",
        "Contact forms & integrations",
        "2 rounds of revisions"
      ]
    },
    {
      title: "WordPress + eCommerce",
      price: "€4,500",
      icon: ShoppingCart,
      color: "blue" as const,
      popular: true,
      features: [
        "Full WordPress setup",
        "WooCommerce integration",
        "Product catalog (up to 50)",
        "Payment gateway setup",
        "Shipping configuration",
        "Admin training included"
      ]
    },
    {
      title: "Shopify Store",
      price: "€3,500",
      icon: Store,
      color: "purple" as const,
      features: [
        "Custom Shopify theme",
        "Product setup & import",
        "Payment & checkout config",
        "App integrations",
        "Inventory management",
        "Ongoing support options"
      ]
    },
    {
      title: "Custom Projects",
      price: "From €5,500",
      icon: Layers,
      color: "orange" as const,
      features: [
        "Bespoke web applications",
        "Complex integrations",
        "Custom functionality",
        "API development",
        "Scalable architecture",
        "Dedicated project manager"
      ]
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

      {/* How We Work - Image Section */}
      <section className="py-20 px-4 bg-bg-1/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight">
                From Concept to <span className="text-accent-cyan">Launch</span>
              </h2>
              <p className="text-text-2 text-lg leading-relaxed">
                We don't just build websites — we craft digital experiences that drive real business results. 
                Our process is collaborative, transparent, and focused on your goals.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent-violet/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-violet font-gobold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-gobold uppercase text-text-1">Discovery Call</h4>
                    <p className="text-text-2 text-sm">Free consultation to understand your business goals and vision</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent-pink/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-pink font-gobold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-gobold uppercase text-text-1">Design & Strategy</h4>
                    <p className="text-text-2 text-sm">Custom mockups and a clear roadmap for your project</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent-cyan font-gobold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-gobold uppercase text-text-1">Build & Launch</h4>
                    <p className="text-text-2 text-sm">Development, testing, and launch with ongoing support</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent-violet/20 via-accent-pink/10 to-accent-cyan/20 p-1">
                <div className="w-full h-full rounded-xl bg-bg-0 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center">
                      <Rocket className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-text-1 font-gobold uppercase text-xl">Your Vision</p>
                    <p className="text-text-2 text-sm mt-2">Brought to life</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-accent-cyan/30 to-accent-violet/30 rounded-xl blur-2xl -z-10" />
            </div>
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

      {/* What Sets Us Apart - Image Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-accent-pink/20 to-accent-violet/20 p-6 flex flex-col justify-end">
                    <p className="text-4xl font-gobold text-accent-pink">16+</p>
                    <p className="text-text-2 text-sm">Happy Clients</p>
                  </div>
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-blue/20 p-6 flex flex-col justify-end">
                    <p className="text-4xl font-gobold text-accent-cyan">100%</p>
                    <p className="text-text-2 text-sm">Project Completion</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-accent-violet/20 to-accent-pink/20 p-6 flex flex-col justify-end">
                    <p className="text-4xl font-gobold text-accent-violet">5★</p>
                    <p className="text-text-2 text-sm">Client Rating</p>
                  </div>
                  <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-accent-orange/20 to-accent-pink/20 p-6 flex flex-col justify-end">
                    <p className="text-4xl font-gobold text-accent-orange">24h</p>
                    <p className="text-text-2 text-sm">Response Time</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight">
                Results That <span className="text-accent-pink">Speak</span>
              </h2>
              <p className="text-text-2 text-lg leading-relaxed">
                We've helped businesses across Ireland and beyond transform their online presence. 
                From local shops to international brands, our work delivers measurable results.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-text-2">
                  <Check className="w-5 h-5 text-accent-cyan flex-shrink-0" />
                  <span>Websites that convert visitors into customers</span>
                </li>
                <li className="flex items-center gap-3 text-text-2">
                  <Check className="w-5 h-5 text-accent-cyan flex-shrink-0" />
                  <span>SEO-optimized for maximum visibility</span>
                </li>
                <li className="flex items-center gap-3 text-text-2">
                  <Check className="w-5 h-5 text-accent-cyan flex-shrink-0" />
                  <span>Mobile-first design for modern users</span>
                </li>
                <li className="flex items-center gap-3 text-text-2">
                  <Check className="w-5 h-5 text-accent-cyan flex-shrink-0" />
                  <span>Ongoing support and maintenance</span>
                </li>
              </ul>
              <Button 
                className="bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 text-white font-gobold uppercase tracking-tight"
                onClick={() => window.location.href = '/clients'}
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Full Service Agency */}
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
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-4">
            Transparent Pricing
          </h2>
          <p className="text-text-2 text-center mb-4">Quality work at fair prices — no hidden fees</p>
          <p className="text-accent-pink text-center mb-12 italic">Payment plans available on all packages</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <GlowCard 
                  key={index} 
                  glowColor={plan.color} 
                  customSize 
                  className={`p-6 flex flex-col h-full ${plan.popular ? 'ring-2 ring-accent-cyan' : ''}`}
                >
                  {plan.popular && (
                    <div className="text-center mb-4">
                      <span className="bg-accent-cyan text-bg-0 text-xs font-gobold uppercase px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-gobold uppercase mb-2 text-text-1">{plan.title}</h3>
                    <p className="text-3xl font-gobold text-accent-cyan">{plan.price}</p>
                  </div>
                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-text-2">
                        <Check className="w-4 h-4 text-accent-cyan flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6 bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 text-white font-gobold uppercase text-sm"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Get Started
                  </Button>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-bg-0 to-bg-1/50">
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
