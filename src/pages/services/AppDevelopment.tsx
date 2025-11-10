import { Smartphone, Code2, Zap, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { useNavigate } from "react-router-dom";
import kamrokLogo from "@/assets/kamrok-logo.png";

const AppDevelopment = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Custom Solutions",
      description: "Tailored web and mobile apps built specifically for your business needs",
      icon: Code2
    },
    {
      title: "Scalable Architecture",
      description: "Built to grow with your business from MVP to enterprise scale",
      icon: Zap
    },
    {
      title: "Secure & Reliable",
      description: "Enterprise-grade security and 99.9% uptime guarantees",
      icon: Shield
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
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-gobold uppercase tracking-tight text-center mb-6">
            App Development
          </h1>
          <p className="text-xl md:text-2xl text-text-2 text-center max-w-3xl mx-auto">
            Custom web and mobile applications built with cutting-edge technology
          </p>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-12">
            What We Build
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <GlowCard key={index} glowColor="blue" customSize className="p-6">
                  <Icon className="w-10 h-10 text-acc-cyan mb-4" />
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

      {/* Technologies */}
      <section className="py-16 px-4 bg-bg-1/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-12">
            Our Tech Stack
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-xl font-gobold uppercase text-acc-violet">Frontend</h3>
              <ul className="space-y-2 text-text-2">
                <li>• React, Vue, Angular</li>
                <li>• React Native, Flutter</li>
                <li>• TypeScript, Next.js</li>
                <li>• Tailwind CSS, Framer Motion</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-gobold uppercase text-acc-cyan">Backend</h3>
              <ul className="space-y-2 text-text-2">
                <li>• Node.js, Python, Go</li>
                <li>• PostgreSQL, MongoDB</li>
                <li>• REST & GraphQL APIs</li>
                <li>• AWS, Google Cloud</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-gobold uppercase tracking-tight text-text-1">
            Ready to build your app?
          </h2>
          <p className="text-xl text-text-2">
            From concept to launch, we'll bring your vision to life.
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

export default AppDevelopment;
