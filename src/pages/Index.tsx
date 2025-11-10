import { Users, MessageSquare, TrendingUp, FileText, Zap, BarChart3, CheckCircle2, Minimize2, MessagesSquare, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { HeroSection } from "@/components/ui/hero-section";
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
    description: "One clear action per screen. No endless menus or hidden features.",
    icon: Minimize2
  }, {
    title: "Chat built in",
    description: "Website widget + shared inbox means more leads, less context switching.",
    icon: MessagesSquare
  }, {
    title: "Money faster",
    description: "Quotes → invoices → paid. All integrated, all automatic.",
    icon: Coins
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
      {/* Hero Section */}
      <HeroSection />

      {/* Why This CRM */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-12">
            Why this CRM
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {whyCards.map((card, index) => {
              const Icon = card.icon;
              return <GlowCard key={index} glowColor="purple" customSize className="p-6 flex flex-col h-full">
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
              </GlowCard>;
            })}
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
      <footer className="py-16 px-4 border-t border-white/10 bg-bg-1/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1 space-y-4">
              <img src={kamrokLogo} alt="KAMROK" className="h-10" />
              <p className="text-text-2 text-sm">
                Full-stack marketing agency building the tools we wish we had.
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
                <a href="#pricing" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Pricing</a>
              </nav>
            </div>
            
            {/* Product Column */}
            <div className="space-y-4">
              <h3 className="font-gobold uppercase text-text-1 text-sm">Product</h3>
              <nav className="flex flex-col gap-3">
                <a href="/features/crm" className="text-text-2 hover:text-acc-violet transition-colors text-sm">CRM</a>
                <a href="/features/chat" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Chat</a>
                <a href="/features/projects" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Projects</a>
                <a href="/features/invoicing" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Invoicing</a>
                <a href="/features/tools" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Tools</a>
              </nav>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-text-2 text-sm">
            © 2025 KAMROK. Built for people who want to win work faster.
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;