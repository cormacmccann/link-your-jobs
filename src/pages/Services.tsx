import { Monitor, Smartphone, Palette, Video, Megaphone, Search, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ServicesFooter from "@/components/ServicesFooter";
import SiteHeader from "@/components/SiteHeader";
import TechStack from "@/components/TechStack";

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Web Design",
      description: "High-performance, bespoke websites tailored for your market. We focus on conversion-centric design and pixel-perfect aesthetics that elevate your professional presence.",
      icon: Monitor,
      color: "purple" as const,
      path: "/services/web-design",
      features: ["Custom UI/UX Architecture", "Responsive Development", "CMS Integration"]
    },
    {
      title: "App Development",
      description: "Building native and cross-platform mobile solutions for startups and enterprises. We create intuitive user journeys that keep your audiences engaged.",
      icon: Smartphone,
      color: "blue" as const,
      path: "/services/app-development",
      features: ["iOS & Android Solutions", "Product Prototyping", "API Architectures"]
    },
    {
      title: "Digital Marketing",
      description: "Strategic performance marketing that scales. From social advertising to automated funnels, we help brands dominate their digital space.",
      icon: Megaphone,
      color: "orange" as const,
      path: "/services/branding",
      features: ["Paid Media Strategy", "Content Strategy", "ROI-Driven Analytics"]
    },
    {
      title: "SEO Excellence",
      description: "Dominating the search landscape for competitive markets. We focus on technical SEO, authority building, and local search visibility for maximum impact.",
      icon: Search,
      color: "blue" as const,
      path: "/services/web-design",
      features: ["Local SEO Optimization", "Technical Site Audits", "Backlink Strategy"]
    },
    {
      title: "Graphic Design",
      description: "Visual identity and marketing materials that make your brand unforgettable. From logos to complete brand systems, we craft visuals that resonate.",
      icon: Palette,
      color: "purple" as const,
      path: "/services/graphic-design",
      features: ["Brand Identity Systems", "Marketing Collateral", "Social Media Assets"]
    },
    {
      title: "Video Design",
      description: "Engaging video content that tells your story and captivates your audience. From motion graphics to full productions, we bring your vision to life.",
      icon: Video,
      color: "orange" as const,
      path: "/services/video-design",
      features: ["Motion Graphics", "Video Production", "Animation & Effects"]
    }
  ];

  const stats = [
    { value: "150+", label: "Projects Delivered" },
    { value: "98%", label: "Client Retention" },
    { value: "24/7", label: "Technical Support" }
  ];

  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
      <SiteHeader />

      {/* Hero */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-acc-violet/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-acc-pink/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto max-w-6xl text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-acc-violet/20 border border-acc-violet/30 text-acc-violet text-sm font-medium tracking-widest uppercase">
              Expertise
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-gobold uppercase tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-text-1">Digital </span>
            <span className="bg-gradient-to-r from-acc-orange via-red-500 via-acc-violet to-acc-pink bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]">
              Excellence
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-text-2 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Elevating brands with bespoke digital solutions. We combine high-end design aesthetics with strategic marketing performance.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlowCard 
                    glowColor={service.color} 
                    customSize 
                    className="p-8 h-full"
                  >
                    <div className="flex flex-col h-full">
                      {/* Icon */}
                      <div className="mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-acc-pink/20 to-acc-violet/20 border border-white/10 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-acc-violet" />
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-gobold uppercase mb-4 text-text-1">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-text-2 mb-6 leading-relaxed flex-grow">
                        {service.description}
                      </p>
                      
                      {/* Features */}
                      <div className="space-y-3 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-acc-cyan/20 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-acc-cyan" />
                            </div>
                            <span className="text-text-2 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Learn More Link */}
                      <button 
                        onClick={() => navigate(service.path)}
                        className="flex items-center gap-2 text-acc-cyan hover:text-acc-cyan/80 transition-colors group mt-auto"
                      >
                        <span className="font-medium">Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <GlowCard glowColor="purple" customSize className="p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-gobold uppercase text-text-1 mb-4">
                Focused on <span className="text-acc-cyan">Your Market</span>
              </h2>
              <p className="text-text-2 max-w-2xl mx-auto">
                Our expertise ensures that your digital presence resonates with your specific target audience. We understand the nuances of the digital landscape.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl lg:text-6xl font-gobold text-acc-violet mb-2">
                    {stat.value}
                  </div>
                  <div className="text-text-2 text-sm md:text-base uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlowCard>
        </div>
      </section>

      {/* Tech Stack */}
      <TechStack
        eyebrow="Tools & Tech"
        title="The Stack Behind Our Work"
        description="We combine industry standards like WordPress and PHP with cutting-edge AI builders and platforms — Lovable, Bolt, Base44, Claude, OpenAI and more — to deliver faster, smarter results."
      />

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-gobold uppercase tracking-tight text-text-1 mb-4">
              Ready to begin?
            </h2>
            <p className="text-xl text-text-2 mb-8">
              Transform your business with our expertise.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-acc-orange via-red-500 to-amber-500 hover:opacity-90 text-white px-12 py-6 text-lg rounded-full font-gobold uppercase tracking-tight shadow-lg shadow-acc-orange/25"
              onClick={() => navigate('/contact')}
            >
              Start a Project
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <ServicesFooter />
    </div>
  );
};

export default Services;
