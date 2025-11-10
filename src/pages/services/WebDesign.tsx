import { Monitor, Zap, Smartphone, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { useNavigate } from "react-router-dom";
import kamrokLogo from "@/assets/kamrok-logo.png";

const WebDesign = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Conversion-Focused",
      description: "Every design decision is made to drive results and turn visitors into customers",
      icon: BarChart3
    },
    {
      title: "Lightning Fast",
      description: "Optimized for speed and performance across all devices and connections",
      icon: Zap
    },
    {
      title: "Mobile-First",
      description: "Beautiful on every screen size, from phones to 4K displays",
      icon: Smartphone
    }
  ];

  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
      {/* Header */}
      <header className="border-b border-white/10 bg-bg-0/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/services')}
              className="text-text-2 hover:text-text-1"
            >
              ← Back to Services
            </Button>
            <img 
              src={kamrokLogo} 
              alt="KAMROK" 
              className="h-10 cursor-pointer" 
              onClick={() => navigate('/')}
            />
            <Button 
              size="sm" 
              className="bg-acc-violet hover:bg-acc-violet/90 text-white rounded-full px-6"
              onClick={() => navigate('/auth')}
            >
              Connect
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center">
              <Monitor className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-gobold uppercase tracking-tight text-center mb-6">
            Web Design
          </h1>
          <p className="text-xl md:text-2xl text-text-2 text-center max-w-3xl mx-auto">
            Stunning, conversion-focused websites that capture your brand and drive real results
          </p>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-12">
            What We Deliver
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <GlowCard key={index} glowColor="purple" customSize className="p-6">
                  <Icon className="w-10 h-10 text-acc-violet mb-4" />
                  <h3 className="text-xl font-gobold uppercase mb-2 text-text-1">
                    {feature.title}
                  </h3>
                  <p className="text-text-2">
                    {feature.description}
                  </p>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 bg-bg-1/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-12">
            Our Process
          </h2>
          
          <div className="space-y-6">
            {[
              { step: "1", title: "Discovery", description: "We learn your business, audience, and goals" },
              { step: "2", title: "Strategy", description: "We plan the structure, features, and user journey" },
              { step: "3", title: "Design", description: "We create stunning mockups that bring your vision to life" },
              { step: "4", title: "Development", description: "We build fast, secure, and scalable websites" },
              { step: "5", title: "Launch", description: "We deploy and optimize for maximum performance" }
            ].map((phase, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-gobold text-lg">{phase.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-gobold uppercase text-text-1 mb-1">
                    {phase.title}
                  </h3>
                  <p className="text-text-2">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-gobold uppercase tracking-tight text-text-1">
            Ready for a website that converts?
          </h2>
          <p className="text-xl text-text-2">
            Let's build something amazing together.
          </p>
          <Button 
            size="lg" 
            className="bg-acc-violet hover:bg-acc-violet/90 text-white px-10 py-6 text-lg rounded-full font-gobold uppercase tracking-tight"
            onClick={() => navigate('/auth')}
          >
            Start Your Project
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default WebDesign;
