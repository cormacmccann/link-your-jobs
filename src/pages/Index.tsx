import { Users, MessageSquare, TrendingUp, FileText, Zap, BarChart3, Settings, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import kamrokLogo from "@/assets/kamrok-logo.png";

const Index = () => {
  const coreFeatures = [
    {
      title: "Contacts",
      description: "People + companies with timeline, tags, and quick actions",
      icon: Users,
      color: "purple" as const
    },
    {
      title: "Deals",
      description: "Kanban pipeline with stages, forecast, and win-rate tracking",
      icon: TrendingUp,
      color: "blue" as const
    },
    {
      title: "Conversations",
      description: "Shared inbox + site chat widget in one unified view",
      icon: MessageSquare,
      color: "purple" as const
    },
    {
      title: "Live Chat",
      description: "Website widget with real-time conversations and lead capture",
      icon: MessageSquare,
      color: "orange" as const
    },
    {
      title: "Invoices",
      description: "Quotes → invoices → payment links with Stripe integration",
      icon: FileText,
      color: "blue" as const
    },
    {
      title: "Automations",
      description: "Trigger → Action flows with visual builder and recipes",
      icon: Zap,
      color: "purple" as const
    },
    {
      title: "Analytics",
      description: "Pipeline value, revenue tracking, and conversion metrics",
      icon: BarChart3,
      color: "blue" as const
    }
  ];

  const whyCards = [
    {
      title: "Less busywork",
      description: "One clear action per screen. No endless menus or hidden features."
    },
    {
      title: "Chat built in",
      description: "Website widget + shared inbox means more leads, less context switching."
    },
    {
      title: "Money faster",
      description: "Quotes → invoices → paid. All integrated, all automatic."
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "29",
      description: "Perfect for solo founders",
      features: [
        "1 user",
        "CRM core (contacts, deals, conversations)",
        "Invoices & payments",
        "Live chat widget",
        "3 automations",
        "All extras included"
      ]
    },
    {
      name: "Pro",
      price: "79",
      description: "Built for teams",
      features: [
        "5 users",
        "Everything in Starter",
        "Advanced automations",
        "Bookings & calendar",
        "Analytics & reports",
        "Multiple pipelines",
        "API access"
      ],
      highlighted: true
    },
    {
      name: "Agency",
      price: "199",
      description: "Scale across clients",
      features: [
        "Unlimited users",
        "Everything in Pro",
        "Multi-brand workspaces",
        "Roles & permissions",
        "White-label embeds",
        "Priority support",
        "Custom integrations"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
      {/* Header */}
      <header className="border-b border-white/10 bg-bg-1/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img src={kamrokLogo} alt="KAMROK" className="h-12" />
            </div>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-gobold uppercase tracking-tight text-text-2 hover:text-text-1 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-sm font-gobold uppercase tracking-tight text-text-2 hover:text-text-1 transition-colors">
                Pricing
              </a>
              <Button 
                size="sm"
                className="bg-accent-cyan hover:bg-accent-cyan/80 text-bg-0 font-gobold uppercase tracking-tight"
                onClick={() => window.location.href = '/auth'}
              >
                Try the CRM
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-gobold mb-6 leading-none uppercase tracking-tighter">
            It doesn't take a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-pink via-accent-violet to-accent-cyan">
              1000
            </span>{" "}
            monkeys.
            <br />
            <span className="text-4xl md:text-6xl lg:text-7xl text-text-2">
              Just one with the right toolkit.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-text-2 max-w-3xl mx-auto mb-4">
            Close deals faster with a calm, future-ready CRM — contacts, conversations, pipeline, invoices, and live chat built in.
          </p>
          
          <p className="text-lg text-accent-pink italic mb-10">
            Fast, friendly, and totally you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 text-white text-lg px-10 py-6 rounded-full font-gobold uppercase tracking-tight"
              onClick={() => window.location.href = '/auth'}
            >
              Try the CRM
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-bg-0 text-lg px-10 py-6 rounded-full font-gobold uppercase tracking-tight"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See how it works
            </Button>
          </div>
        </div>
      </section>

      {/* Why This CRM */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-12">
            Why this CRM
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {whyCards.map((card, index) => (
              <GlowCard key={index} glowColor="purple" customSize className="p-6 flex flex-col h-full">
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-gobold uppercase mb-3 text-text-1">
                    {card.title}
                  </h3>
                  <p className="text-text-2 text-lg">
                    {card.description}
                  </p>
                </div>
              </GlowCard>
            ))}
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
              return (
                <GlowCard key={index} glowColor={feature.color} customSize className="p-6 flex flex-col h-full min-h-[240px]">
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
                </GlowCard>
              );
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
            {pricingPlans.map((plan, index) => (
              <GlowCard 
                key={index} 
                glowColor={plan.highlighted ? "purple" : "blue"} 
                customSize 
                className={`p-8 flex flex-col h-full ${plan.highlighted ? 'border-2 border-accent-violet' : ''}`}
              >
                {plan.highlighted && (
                  <div className="mb-4">
                    <span className="text-xs font-gobold uppercase tracking-wider text-accent-violet bg-accent-violet/10 px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
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
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-0.5" />
                      <span className="text-text-2">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full font-gobold uppercase tracking-tight ${
                    plan.highlighted 
                      ? 'bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 text-white' 
                      : 'bg-accent-cyan hover:bg-accent-cyan/80 text-bg-0'
                  }`}
                  onClick={() => window.location.href = '/auth'}
                >
                  Get Started
                </Button>
              </GlowCard>
            ))}
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
    </div>
  );
};

export default Index;
