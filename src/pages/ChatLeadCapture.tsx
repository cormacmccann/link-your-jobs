import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, MessageCircle, Bot, Users, Zap, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatLeadCapture = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Real-time conversations with your website visitors"
    },
    {
      icon: Bot,
      title: "Chatbot Flows",
      description: "Automated responses and conversation flows"
    },
    {
      icon: Users,
      title: "Lead Capture",
      description: "Collect and manage leads automatically"
    },
    {
      icon: Zap,
      title: "CRM Integration",
      description: "Sync with your favorite CRM platforms"
    }
  ];

  const pricingOptions = [
    {
      name: "À La Carte",
      price: "£39",
      period: "/month",
      features: [
        "Chat & Lead Capture only",
        "Unlimited conversations",
        "Chatbot builder",
        "FAQ automation",
        "Lead management",
        "CRM integration",
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
        "Chat & Lead Capture",
        "Popup & Offer Engine",
        "Bookings & Demos",
        "Review widgets",
        "Social wall",
        "Priority support"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/50">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-gobold uppercase mb-6 tracking-tight"
              style={{ textShadow: '0 0 40px rgba(59, 130, 246, 0.4)' }}>
            Chat & Lead{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Capture
            </span>
          </h1>
          <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl mx-auto">
            Turn website visitors into customers with intelligent chat, automated lead capture, and seamless CRM integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8"
              onClick={() => navigate('/auth')}
            >
              Start Capturing Leads
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 text-lg">
              See It In Action
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a0a1a]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-gobold uppercase text-center mb-12 tracking-tight">Complete Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="bg-white/5 border-white/10 p-8 hover:border-blue-500/50 transition-all">
                  <Icon className="w-12 h-12 text-blue-400 mb-4" />
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
          <h2 className="text-4xl font-gobold uppercase text-center mb-4 tracking-tight">Pricing Options</h2>
          <p className="text-center text-white/60 mb-12 text-lg">Single tool or complete engagement suite</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingOptions.map((plan, idx) => (
              <Card key={idx} className={`bg-white/5 border-white/10 p-8 relative ${plan.popular ? 'border-blue-500/50 shadow-xl shadow-blue-500/20' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-gobold uppercase px-4 py-1 rounded-full">
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
                      <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : 'bg-white/10 hover:bg-white/20'}`}
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
          <h2 className="text-4xl font-gobold uppercase mb-6">Never Miss Another Lead</h2>
          <p className="text-white/70 mb-8 text-lg">Start converting visitors into customers today</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-12"
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

export default ChatLeadCapture;
