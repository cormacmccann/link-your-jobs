import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Hash, Shield, RefreshCw, Image, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import kamrokLogo from "@/assets/kamrok-logo.png";

const SocialWall = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Hash,
      title: "Hashtag Feed",
      description: "Aggregate posts by hashtag or account from social platforms"
    },
    {
      icon: Shield,
      title: "Moderation Panel",
      description: "Review and approve posts before they appear on your wall"
    },
    {
      icon: RefreshCw,
      title: "Auto-Refresh",
      description: "Automatically update with new posts in real-time"
    },
    {
      icon: Image,
      title: "Lazy Load",
      description: "Optimized loading for better performance"
    }
  ];

  const pricingOptions = [
    {
      name: "À La Carte",
      price: "£34",
      period: "/month",
      features: [
        "Social Wall only",
        "Unlimited walls",
        "All social platforms",
        "Moderation tools",
        "Auto-refresh feeds",
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
        "Social Wall",
        "Review Widget",
        "Trustpilot Integration",
        "All engagement tools",
        "All compliance tools",
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
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/50">
            <Hash className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-gobold uppercase mb-6 tracking-tight"
              style={{ textShadow: '0 0 40px rgba(6, 182, 212, 0.4)' }}>
            Social{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Wall
            </span>
          </h1>
          <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl mx-auto">
            Display live social media posts on your website. Aggregate by hashtag or account with moderation and auto-refresh.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-lg px-8"
              onClick={() => navigate('/auth')}
            >
              Create Social Wall
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 text-lg">
              See Examples
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
                <Card key={idx} className="bg-white/5 border-white/10 p-8 hover:border-cyan-500/50 transition-all">
                  <Icon className="w-12 h-12 text-cyan-400 mb-4" />
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
          <h2 className="text-4xl font-gobold uppercase text-center mb-4 tracking-tight">Select Your Plan</h2>
          <p className="text-center text-white/60 mb-12 text-lg">Individual tool or complete social suite</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingOptions.map((plan, idx) => (
              <Card key={idx} className={`bg-white/5 border-white/10 p-8 relative ${plan.popular ? 'border-cyan-500/50 shadow-xl shadow-cyan-500/20' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-gobold uppercase px-4 py-1 rounded-full">
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
                      <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700' : 'bg-white/10 hover:bg-white/20'}`}
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
          <h2 className="text-4xl font-gobold uppercase mb-6">Engage Your Audience</h2>
          <p className="text-white/70 mb-8 text-lg">Live social feeds that keep your site fresh</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-lg px-12"
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

export default SocialWall;
