import { Palette, Sparkles, Image, Layout, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { useNavigate } from "react-router-dom";
import ServicesFooter from "@/components/ServicesFooter";
import SiteHeader from "@/components/SiteHeader";

const GraphicDesign = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Brand Identity",
      description: "Logos, color palettes, and style guides that define your brand",
      icon: Sparkles
    },
    {
      title: "Marketing Materials",
      description: "Brochures, flyers, business cards, and print collateral",
      icon: Image
    },
    {
      title: "Digital Graphics",
      description: "Social media graphics, email templates, and web assets",
      icon: Layout
    }
  ];

  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
      <SiteHeader />

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-pink to-accent-orange flex items-center justify-center">
              <Palette className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-gobold uppercase tracking-tight text-center mb-6">
            Graphic Design
          </h1>
          <p className="text-xl md:text-2xl text-text-2 text-center max-w-3xl mx-auto">
            Visual identity and marketing materials that make your brand unforgettable
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-12">
            What We Create
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <GlowCard key={index} glowColor="purple" customSize className="p-6">
                  <Icon className="w-10 h-10 text-acc-violet mb-4" />
                  <h3 className="text-xl font-gobold uppercase mb-2 text-text-1">
                    {service.title}
                  </h3>
                  <p className="text-text-2">
                    {service.description}
                  </p>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-bg-1/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight text-center mb-12">
            Why Choose Us
          </h2>
          
          <div className="space-y-6">
            {[
              { title: "Brand-First Approach", description: "Every design reflects your unique brand identity and values" },
              { title: "Fast Turnaround", description: "Get professional designs delivered on time, every time" },
              { title: "Unlimited Revisions", description: "We work until you're 100% satisfied with the result" },
              { title: "Print-Ready Files", description: "All formats provided: PDF, PNG, SVG, and source files" }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-acc-violet mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-gobold uppercase text-text-1 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-text-2">
                    {item.description}
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
            Ready to elevate your brand?
          </h2>
          <p className="text-xl text-text-2">
            Let's create designs that make an impact.
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

      <ServicesFooter />
    </div>
  );
};

export default GraphicDesign;
