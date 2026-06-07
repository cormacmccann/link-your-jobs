import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Cookie, Globe, Shield, Code, Palette, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import kamrokLogo from "/kamrok-logo.png";

const CookieConsentManager = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Globe,
      title: "Region Detection",
      description: "Auto-detect EU/US/Global visitors and show appropriate consent"
    },
    {
      icon: Shield,
      title: "Script Blocking",
      description: "Auto-block analytics and tracking until consent is given"
    },
    {
      icon: Palette,
      title: "Custom Branding",
      description: "Fully customizable colors, layout, and button styles"
    },
    {
      icon: Code,
      title: "Easy Embed",
      description: "Simple copy/paste embed code for any website"
    }
  ];

  const pricingOptions = [
    {
      name: "À La Carte",
      price: "£24",
      period: "/month",
      features: [
        "Cookie Consent Manager only",
        "Unlimited domains",
        "Region detection",
        "Script blocking",
        "Custom branding",
        "Consent logging",
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
        "Cookie Consent Manager",
        "Privacy Policy Builder",
        "Terms Generator",
        "All compliance tools",
        "All engagement tools",
        "Priority support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')} className="text-white/60 hover:text-white">
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

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/50">
            <Cookie className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-gobold uppercase mb-6 tracking-tight"
              style={{ textShadow: '0 0 40px rgba(255, 61, 154, 0.4)' }}>
            Cookie Consent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">
              Manager
            </span>
          </h1>
          <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl mx-auto">
            GDPR & CCPA compliant cookie consent banners. Configurable, beautiful, and fully automated script blocking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-lg px-8"
              onClick={() => navigate('/auth')}
            >
              Setup Cookie Banner
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 text-lg">
              Live Preview
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a0a1a]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-gobold uppercase text-center mb-12 tracking-tight">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="bg-white/5 border-white/10 p-8 hover:border-orange-500/50 transition-all">
                  <Icon className="w-12 h-12 text-orange-400 mb-4" />
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
          <h2 className="text-4xl font-gobold uppercase text-center mb-4 tracking-tight">Choose Your Plan</h2>
          <p className="text-center text-white/60 mb-12 text-lg">Stand-alone or as part of the complete toolkit</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingOptions.map((plan, idx) => (
              <Card key={idx} className={`bg-white/5 border-white/10 p-8 relative ${plan.popular ? 'border-orange-500/50 shadow-xl shadow-orange-500/20' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-gobold uppercase px-4 py-1 rounded-full">
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
                      <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? 'bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700' : 'bg-white/10 hover:bg-white/20'}`}
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
          <h2 className="text-4xl font-gobold uppercase mb-6">Stay Compliant Effortlessly</h2>
          <p className="text-white/70 mb-8 text-lg">Set up in minutes, compliant forever</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-lg px-12"
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

export default CookieConsentManager;
