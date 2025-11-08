import { Users, MessageSquare, TrendingUp, FileText, Zap, BarChart3, Settings, CheckCircle2, Package, Wrench, Cookie, Puzzle, Rocket, Briefcase, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import kamrokLogo from "@/assets/kamrok-logo.png";
const Index = () => {
  const coreFeatures = [{
    title: "Contacts",
    description: "People + companies with timeline, tags, and quick actions",
    icon: Users,
    color: "purple" as const
  }, {
    title: "Deals",
    description: "Kanban pipeline with stages, forecast, and win-rate tracking",
    icon: TrendingUp,
    color: "blue" as const
  }, {
    title: "Conversations",
    description: "Shared inbox + site chat widget in one unified view",
    icon: MessageSquare,
    color: "purple" as const
  }, {
    title: "Live Chat",
    description: "Website widget with real-time conversations and lead capture",
    icon: MessageSquare,
    color: "orange" as const
  }, {
    title: "Invoices",
    description: "Quotes → invoices → payment links with Stripe integration",
    icon: FileText,
    color: "blue" as const
  }, {
    title: "Automations",
    description: "Trigger → Action flows with visual builder and recipes",
    icon: Zap,
    color: "purple" as const
  }, {
    title: "Analytics",
    description: "Pipeline value, revenue tracking, and conversion metrics",
    icon: BarChart3,
    color: "blue" as const
  }];
  const whyCards = [{
    title: "Less busywork",
    description: "One clear action per screen. No endless menus or hidden features."
  }, {
    title: "Chat built in",
    description: "Website widget + shared inbox means more leads, less context switching."
  }, {
    title: "Money faster",
    description: "Quotes → invoices → paid. All integrated, all automatic."
  }];
  const pricingPlans = [{
    name: "Starter",
    price: "29",
    description: "Perfect for solo founders",
    features: ["1 user", "CRM core (contacts, deals, conversations)", "Invoices & payments", "Live chat widget", "3 automations", "All extras included"]
  }, {
    name: "Pro",
    price: "79",
    description: "Built for teams",
    features: ["5 users", "Everything in Starter", "Advanced automations", "Bookings & calendar", "Analytics & reports", "Multiple pipelines", "API access"],
    highlighted: true
  }, {
    name: "Agency",
    price: "199",
    description: "Scale across clients",
    features: ["Unlimited users", "Everything in Pro", "Multi-brand workspaces", "Roles & permissions", "White-label embeds", "Priority support", "Custom integrations"]
  }];
  return <div className="min-h-screen bg-bg-0 text-text-1">
      {/* Header */}
      <header className="border-b border-white/10 bg-bg-0/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left nav items */}
            <nav className="hidden lg:flex items-center gap-6 text-sm flex-1">
              <a href="#apps" className="text-text-2 hover:text-text-1 transition-colors flex items-center gap-2">
                <Package className="w-4 h-4" />
                Apps
              </a>
              <a href="#tools" className="text-text-2 hover:text-text-1 transition-colors flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Tools
              </a>
              <a href="#extras" className="text-text-2 hover:text-text-1 transition-colors flex items-center gap-2">
                <Cookie className="w-4 h-4" />
                Cookies
              </a>
              <a href="#features" className="text-text-2 hover:text-text-1 transition-colors flex items-center gap-2">
                <Puzzle className="w-4 h-4" />
                Widgets
              </a>
            </nav>
            
            {/* Center logo */}
            <div className="flex-shrink-0">
              <img src={kamrokLogo} alt="KAMROK" className="h-10" />
            </div>
            
            {/* Right nav items */}
            <nav className="hidden lg:flex items-center gap-6 text-sm flex-1 justify-end">
              <a href="#services" className="text-text-2 hover:text-text-1 transition-colors flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                Services
              </a>
              <a href="#work" className="text-text-2 hover:text-text-1 transition-colors flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Our Work
              </a>
              <Button size="sm" className="bg-acc-violet hover:bg-acc-violet/90 text-white rounded-full px-6" onClick={() => window.location.href = '/auth'}>
                Connect
              </Button>
            </nav>
            
            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-0 via-bg-1/20 to-bg-0"></div>
        
        <div className="relative z-10 container mx-auto max-w-6xl text-center space-y-8 py-20">
          {/* Hero text - all on one line */}
          <h1 className="font-gobold leading-none tracking-tight uppercase">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              <span className="text-4xl md:text-6xl lg:text-7xl text-text-1">
                IT DOESN'T TAKE A
              </span>
              <span className="text-6xl md:text-8xl lg:text-9xl font-black text-text-1">
                1000
              </span>
              <span className="text-4xl md:text-6xl lg:text-7xl text-text-1">
                MONKEYS.
              </span>
            </div>
            <span className="block text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-text-1 mt-6">
              Just one with the right toolkit.
            </span>
          </h1>
          
          <div className="space-y-4 pt-8">
            <p className="text-lg md:text-xl text-text-2 max-w-3xl mx-auto">
              Bold websites, smart marketing, and AI-powered growth strategies that launch your business into orbit.
            </p>
            
            <p className="text-xl md:text-2xl text-text-1 italic">
              fast, friendly, and totally you
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button size="lg" className="bg-acc-violet hover:bg-acc-violet/90 text-white px-10 py-6 text-lg rounded-full font-gobold uppercase tracking-tight" onClick={() => window.location.href = '/auth'}>
              Try the CRM
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-acc-cyan text-acc-cyan hover:bg-acc-cyan hover:text-bg-0 px-10 py-6 text-lg rounded-full font-gobold uppercase tracking-tight" onClick={() => document.getElementById('features')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              See how it works
            </Button>
          </div>
        </div>
      </section>

      {/* Scroll Animation Section */}
      <section className="bg-bg-0 -mt-32 md:-mt-40">
        <ContainerScroll titleComponent={<></>}>
          <img src="https://ui.aceternity.com/_next/image?url=%2Flinear.webp&w=3840&q=75" alt="CRM Dashboard Preview" className="mx-auto rounded-2xl object-cover h-full object-left-top" draggable={false} />
        </ContainerScroll>
      </section>

      {/* Why This CRM */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-12">
            Why this CRM
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {whyCards.map((card, index) => <GlowCard key={index} glowColor="purple" customSize className="p-6 flex flex-col h-full">
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-gobold uppercase mb-3 text-text-1">
                    {card.title}
                  </h3>
                  <p className="text-text-2 text-lg">
                    {card.description}
                  </p>
                </div>
              </GlowCard>)}
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-4">
            Core features
          </h2>
          <p className="text-text-2 text-center mb-12">Everything you need to win work faster</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return <GlowCard key={index} glowColor={feature.color} customSize className="p-6 flex flex-col h-full min-h-[240px]">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-gobold uppercase mb-2 text-text-1">
                      {feature.title}
                    </h3>
                    <p className="text-text-2">
                      {feature.description}
                    </p>
                  </div>
                </GlowCard>;
          })}
          </div>
        </div>
      </section>

      {/* Free Extras */}
      <section className="py-16 px-4 bg-bg-1/50">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight mb-4">
            Free extras{" "}
            <span className="text-accent-cyan">(save money)</span>
          </h2>
          <p className="text-text-2 text-lg mb-8 max-w-3xl mx-auto">
            Privacy builder, T&Cs generator, cookie banner, reviews widget, social wall, 
            analytics connectors, and performance tools — all included with your plan.
          </p>
          <p className="text-accent-pink italic">
            Stop paying for separate tools
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-12">
            Simple pricing
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => <GlowCard key={index} glowColor={plan.highlighted ? "purple" : "blue"} customSize className={`p-8 flex flex-col h-full ${plan.highlighted ? 'border-2 border-accent-violet' : ''}`}>
                {plan.highlighted && <div className="mb-4">
                    <span className="text-xs font-gobold uppercase tracking-wider text-accent-violet bg-accent-violet/10 px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>}
                <div className="mb-6">
                  <h3 className="text-2xl font-gobold uppercase mb-2 text-text-1">
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-5xl font-gobold text-text-1">${plan.price}</span>
                    <span className="text-text-2 ml-2">/month</span>
                  </div>
                  <p className="text-text-2">
                    {plan.description}
                  </p>
                </div>
                
                <div className="flex-1 space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => <div key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-0.5" />
                      <span className="text-text-2">{feature}</span>
                    </div>)}
                </div>
                
                <Button className={`w-full font-gobold uppercase tracking-tight ${plan.highlighted ? 'bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 text-white' : 'bg-accent-cyan hover:bg-accent-cyan/80 text-bg-0'}`} onClick={() => window.location.href = '/auth'}>
                  Get Started
                </Button>
              </GlowCard>)}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <img src={kamrokLogo} alt="KAMROK" className="h-10" />
            </div>
            
            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a href="#" className="text-text-2 hover:text-text-1 transition-colors">Docs</a>
              <a href="#" className="text-text-2 hover:text-text-1 transition-colors">Status</a>
              <a href="#" className="text-text-2 hover:text-text-1 transition-colors">Privacy</a>
              <a href="#" className="text-text-2 hover:text-text-1 transition-colors">Terms</a>
              <a href="#" className="text-text-2 hover:text-text-1 transition-colors">Changelog</a>
            </nav>
          </div>
          
          <div className="mt-8 text-center text-text-2 text-sm">
            © 2025 KAMROK. Built for people who want to win work faster.
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;