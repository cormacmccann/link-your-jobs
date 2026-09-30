import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Shield, Star, RefreshCw, Code, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrustpilotIntegration = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "API Integration",
      description: "Direct connection to Trustpilot API for real-time data"
    },
    {
      icon: Star,
      title: "Verified Badge",
      description: "Display official Trustpilot verified review badge"
    },
    {
      icon: RefreshCw,
      title: "Real-Time Sync",
      description: "Automatically sync new reviews as they're posted"
    },
    {
      icon: Code,
      title: "Custom Display",
      description: "Flexible widget design to match your brand"
    }
  ];

  const pricingOptions = [
    {
      name: "À La Carte",
      price: "£19",
      period: "/month",
      features: [
        "Trustpilot Integration only",
        "Unlimited widgets",
        "API integration",
        "Verified badge",
        "Auto-sync reviews",
        "Custom styling",
        "Basic support"
      ]
    },
    {
      name: "Full Toolkit",
      price: "£99",
      period: "/month",
      popular: true,
      features: [
        "All 9 KAMROK apps",
        "Trustpilot Integration",
        "Review Widget",
        "Social Wall",
        "All engagement tools",
        "All compliance tools",
        "Priority support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/50">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-gobold uppercase mb-6 tracking-tight"
              style={{ textShadow: '0 0 40px rgba(16, 185, 129, 0.4)' }}>
            Trustpilot{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              Integration
            </span>
          </h1>
          <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl mx-auto">
            Display verified Trustpilot reviews and ratings on your website. Direct API integration with real-time sync and verified badges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-lg px-8"
              onClick={() => navigate('/auth')}
            >
              Connect Trustpilot
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 text-lg">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a0a1a]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-gobold uppercase text-center mb-12 tracking-tight">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="bg-white/5 border-white/10 p-8 hover:border-emerald-500/50 transition-all">
                  <Icon className="w-12 h-12 text-emerald-400 mb-4" />
                  <h3 className="text-2xl font-gobold uppercase mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#1a0a1a] to-[#0a0a0a]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-gobold uppercase text-center mb-4 tracking-tight">Pricing Plans</h2>
          <p className="text-center text-white/60 mb-12 text-lg">Stand-alone integration or full toolkit access</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingOptions.map((plan, idx) => (
              <Card key={idx} className={`bg-white/5 border-white/10 p-8 relative ${plan.popular ? 'border-emerald-500/50 shadow-xl shadow-emerald-500/20' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-gobold uppercase px-4 py-1 rounded-full">
                      Best Value
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-gobold uppercase mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-gobold">{plan.price}</span>
                  <span className="text-white/60 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700' : 'bg-white/10 hover:bg-white/20'}`}
                  onClick={() => navigate('/auth')}
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-gobold uppercase mb-6">Showcase Verified Trust</h2>
          <p className="text-white/70 mb-8 text-lg">Display your Trustpilot reputation proudly</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-lg px-12"
            onClick={() => navigate('/auth')}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
};

export default TrustpilotIntegration;
