import { Monitor, Smartphone, Palette, Video, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { useNavigate } from "react-router-dom";
import kamrokLogo from "@/assets/kamrok-logo.png";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Web Design",
      description: "Stunning, conversion-focused websites that capture your brand and drive results",
      icon: Monitor,
      color: "purple" as const,
      path: "/services/web-design"
    },
    {
      title: "App Development",
      description: "Custom web and mobile applications built with cutting-edge technology",
      icon: Smartphone,
      color: "blue" as const,
      path: "/services/app-development"
    },
    {
      title: "Graphic Design",
      description: "Visual identity and marketing materials that make your brand unforgettable",
      icon: Palette,
      color: "purple" as const,
      path: "/services/graphic-design"
    },
    {
      title: "Video Design",
      description: "Engaging video content that tells your story and captivates your audience",
      icon: Video,
      color: "orange" as const,
      path: "/services/video-design"
    },
    {
      title: "Branding",
      description: "Complete brand strategy and identity systems that set you apart",
      icon: Target,
      color: "blue" as const,
      path: "/services/branding"
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
              onClick={() => navigate('/')}
              className="text-text-2 hover:text-text-1"
            >
              ← Back
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
        <div className="container mx-auto max-w-6xl text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-gobold uppercase tracking-tight text-text-1">
            Full-Stack Marketing Agency
          </h1>
          <p className="text-xl md:text-2xl text-text-2 max-w-3xl mx-auto">
            From bold websites to smart apps, we build the tools that help businesses grow.
          </p>
          <div className="bg-bg-1/50 border border-white/10 rounded-2xl p-6 max-w-4xl mx-auto mt-8">
            <p className="text-text-2 text-lg leading-relaxed">
              <span className="text-acc-violet font-gobold">Our Story:</span> Being a marketing design agency is what brought about the Kamrok app. 
              We needed better tools to manage our clients and projects, so we built them. 
              But we're still loyal to how we started—helping businesses shine through exceptional design and marketing.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-12">
            Our Services
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index}
                  className="cursor-pointer hover:scale-[1.02] transition-transform"
                  onClick={() => navigate(service.path)}
                >
                  <GlowCard 
                    glowColor={service.color} 
                    customSize 
                    className="p-8 flex flex-col h-full"
                  >
                    <div className="mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-2xl font-gobold uppercase mb-3 text-text-1">
                        {service.title}
                      </h3>
                      <p className="text-text-2 mb-4 flex-1">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-2 text-acc-cyan">
                        <span className="font-gobold uppercase text-sm">Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </GlowCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-bg-1/50">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-gobold uppercase tracking-tight text-text-1">
            Ready to grow your business?
          </h2>
          <p className="text-xl text-text-2">
            Let's talk about your project and how we can help you succeed.
          </p>
          <Button 
            size="lg" 
            className="bg-acc-violet hover:bg-acc-violet/90 text-white px-10 py-6 text-lg rounded-full font-gobold uppercase tracking-tight"
            onClick={() => navigate('/auth')}
          >
            Get Started
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
