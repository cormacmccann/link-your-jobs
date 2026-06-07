import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, FileText, Globe, Shield, Download, Code, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import kamrokLogo from "/kamrok-logo.png";

const PrivacyPolicyBuilder = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Globe,
      title: "Multi-Region Compliance",
      description: "Support for GDPR, UK GDPR, CCPA, and other global regulations"
    },
    {
      icon: FileText,
      title: "Auto-Generate Policies",
      description: "Dynamic form with intelligent policy generation"
    },
    {
      icon: Code,
      title: "Embed & Download",
      description: "Script/iframe embed or export as PDF/HTML/plain text"
    },
    {
      icon: Shield,
      title: "Version Tracking",
      description: "Automatic timestamps and version history"
    }
  ];

  const pricingOptions = [
    {
      name: "À La Carte",
      price: "£29",
      period: "/month",
      features: [
        "Privacy & Policy Builder only",
        "All region templates",
        "Unlimited policies",
        "Version tracking",
        "Export options",
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
        "Privacy & Policy Builder",
        "Cookie Consent Manager",
        "Chat & Lead Capture",
        "All engagement tools",
        "Priority support",
        "Early access to new tools"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white/60 hover:text-white"
            >
              ← Back
            </Button>
            <img src={kamrokLogo} alt="KAMROK" className="h-12" />
            <Button
              variant="outline"
              className="border-pink-500/50 text-pink-400 hover:bg-pink-500/10"
              onClick={() => navigate('/auth')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/50">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-gobold uppercase mb-6 tracking-tight"
              style={{ textShadow: '0 0 40px rgba(236, 72, 153, 0.4)' }}>
            Privacy & Policy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              Builder
            </span>
          </h1>
          <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl mx-auto">
            Generate GDPR, CCPA, and region-specific privacy policies with our Iubenda-style builder. 
            Professional legal documents in minutes, not hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg px-8"
              onClick={() => navigate('/auth')}
            >
              Start Building Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 hover:bg-white/10 text-lg"
            >
              View Live Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a0a1a]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-gobold uppercase text-center mb-12 tracking-tight">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="bg-white/5 border-white/10 p-8 hover:border-pink-500/50 transition-all">
                  <Icon className="w-12 h-12 text-pink-400 mb-4" />
                  <h3 className="text-2xl font-gobold uppercase mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-[#1a0a1a]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-gobold uppercase text-center mb-12 tracking-tight">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mx-auto mb-4 text-2xl font-gobold">
                1
              </div>
              <h3 className="text-xl font-gobold uppercase mb-2">Select Region</h3>
              <p className="text-white/60">Choose your legal jurisdiction and compliance requirements</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 text-2xl font-gobold">
                2
              </div>
              <h3 className="text-xl font-gobold uppercase mb-2">Fill Details</h3>
              <p className="text-white/60">Enter company info and select your integrations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mx-auto mb-4 text-2xl font-gobold">
                3
              </div>
              <h3 className="text-xl font-gobold uppercase mb-2">Export & Embed</h3>
              <p className="text-white/60">Download or embed your policy instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gradient-to-b from-[#1a0a1a] to-[#0a0a0a]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-gobold uppercase text-center mb-4 tracking-tight">
            Choose Your Plan
          </h2>
          <p className="text-center text-white/60 mb-12 text-lg">
            Get this tool individually or access all 9 apps with the full toolkit
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingOptions.map((plan, idx) => (
              <Card key={idx} className={`bg-white/5 border-white/10 p-8 relative ${plan.popular ? 'border-pink-500/50 shadow-xl shadow-pink-500/20' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-gobold uppercase px-4 py-1 rounded-full">
                      Most Popular
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
                      <Check className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700' : 'bg-white/10 hover:bg-white/20'}`}
                  onClick={() => navigate('/auth')}
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-gobold uppercase mb-6">
            Ready to Build Compliant Policies?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Join hundreds of businesses using KAMROK to stay compliant
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg px-12"
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

export default PrivacyPolicyBuilder;
