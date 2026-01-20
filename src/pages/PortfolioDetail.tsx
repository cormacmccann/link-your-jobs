import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { ScreenshotCarousel } from "@/components/ScreenshotCarousel";
import { ArrowLeft, ExternalLink, Check, Calendar, Globe, Briefcase, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const TECHNOLOGY_LABELS: Record<string, string> = {
  ADOBE: "Adobe Creative Suite",
  WORDPRESS: "WordPress",
  ELEMENTOR: "Elementor",
  PHP: "PHP",
  OPENAI: "OpenAI",
  "CLAUDE_SONNET": "Claude Sonnet",
  SHOPIFY: "Shopify",
  HTML5: "HTML5",
  CSS: "CSS",
  KINSTA: "Kinsta",
  REACT: "React",
  TYPESCRIPT: "TypeScript",
  TAILWIND: "Tailwind CSS",
  SUPABASE: "Supabase",
  FIGMA: "Figma",
  NEXTJS: "Next.js",
};

const SERVICE_LABELS: Record<string, string> = {
  DESIGN: "Design",
  WEB_DESIGN: "Web Design",
  DEVELOPMENT: "Development",
  BRANDING: "Branding",
  APP_DEVELOPMENT: "App Development",
  GRAPHIC_DESIGN: "Graphic Design",
  VIDEO_DESIGN: "Video Design",
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function PortfolioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: item, isLoading, error } = useQuery({
    queryKey: ["portfolio-item", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("id", id)
        .eq("is_published", true)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="text-muted-foreground mb-6">The portfolio item you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/clients")} className="bg-gradient-to-r from-accent-orange via-accent-pink to-accent-violet">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  const technologies = (item as any).technologies as string[] | null;
  const services = (item as any).services as string[] | null;
  const preliminaryGallery = (item as any).preliminary_gallery as string[] | null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {item.screenshots && item.screenshots.length > 0 ? (
            <img 
              src={item.screenshots[0]} 
              alt={item.client_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent-pink/20 via-accent-violet/20 to-accent-cyan/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 p-6 z-10">
          <div className="container mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/clients")}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 pb-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            {/* Breadcrumb */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/clients" className="hover:text-white transition-colors">Portfolio</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">{item.client_name}</span>
            </motion.div>

            {/* Client Logo & Name */}
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-4">
              {item.logo_url && (
                <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm p-2 flex items-center justify-center">
                  <img 
                    src={item.logo_url} 
                    alt={item.client_name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
              <div>
                {item.is_featured && (
                  <Badge className="bg-accent-pink/20 text-accent-pink border-accent-pink/40 mb-2">
                    Featured Work
                  </Badge>
                )}
                <h1 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-tight">
                  {item.client_name}
                </h1>
              </div>
            </motion.div>

            {/* Industry Tag */}
            {item.industry && (
              <motion.p variants={fadeInUp} className="text-xl text-muted-foreground">
                {item.industry}
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Meta Bar */}
      <section className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between py-4 gap-4">
            <div className="flex flex-wrap items-center gap-6">
              {item.industry && (
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-accent-violet" />
                  <span className="text-muted-foreground">Industry:</span>
                  <span className="font-medium">{item.industry}</span>
                </div>
              )}
              {item.client_url && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-accent-cyan" />
                  <span className="text-muted-foreground">Website:</span>
                  <a 
                    href={item.client_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-accent-cyan hover:underline"
                  >
                    {new URL(item.client_url).hostname}
                  </a>
                </div>
              )}
            </div>

            {item.client_url && (
              <Button asChild className="bg-gradient-to-r from-accent-orange via-accent-pink to-accent-violet hover:opacity-90">
                <a href={item.client_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Live Site
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Project Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* About Section */}
              {item.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold font-display uppercase mb-4">About This Project</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Screenshots Gallery */}
              {item.screenshots && item.screenshots.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold font-display uppercase mb-6">Project Gallery</h2>
                  <GlowCard className="overflow-hidden">
                    <ScreenshotCarousel 
                      screenshots={item.screenshots}
                      className="aspect-video"
                    />
                  </GlowCard>
                </motion.div>
              )}

              {/* Preliminary Gallery */}
              {preliminaryGallery && preliminaryGallery.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold font-display uppercase mb-6">Design Process</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {preliminaryGallery.map((image: string, index: number) => (
                      <GlowCard key={index} className="overflow-hidden group cursor-pointer">
                        <div className="aspect-square relative">
                          <img 
                            src={image}
                            alt={`Design process ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </GlowCard>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Services Card */}
              {services && services.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <GlowCard className="p-6">
                    <h3 className="text-lg font-bold font-display uppercase mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent-pink" />
                      Services Provided
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {services.map((service: string) => (
                        <Badge 
                          key={service} 
                          variant="secondary"
                          className="bg-accent-pink/10 text-accent-pink border-accent-pink/20"
                        >
                          {SERVICE_LABELS[service] || service}
                        </Badge>
                      ))}
                    </div>
                  </GlowCard>
                </motion.div>
              )}

              {/* Technologies Card */}
              {technologies && technologies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <GlowCard className="p-6">
                    <h3 className="text-lg font-bold font-display uppercase mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent-cyan" />
                      Technologies Used
                    </h3>
                    <div className="space-y-3">
                      {technologies.map((tech: string) => (
                        <div key={tech} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-md bg-accent-cyan/10 flex items-center justify-center">
                            <Check className="h-3 w-3 text-accent-cyan" />
                          </div>
                          <span className="text-sm">{TECHNOLOGY_LABELS[tech] || tech}</span>
                        </div>
                      ))}
                    </div>
                  </GlowCard>
                </motion.div>
              )}

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <GlowCard className="p-6 bg-gradient-to-br from-accent-pink/10 via-accent-violet/10 to-accent-cyan/10">
                  <h3 className="text-lg font-bold font-display uppercase mb-2">
                    Like What You See?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Let's create something amazing together for your business.
                  </p>
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-accent-orange via-accent-pink to-accent-violet hover:opacity-90"
                  >
                    <Link to="/contact">
                      Start Your Project
                    </Link>
                  </Button>
                </GlowCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display uppercase mb-4">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-pink via-accent-violet to-accent-cyan">Project?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Get in touch and let's discuss how we can bring your vision to life.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-accent-orange via-accent-pink to-accent-violet hover:opacity-90"
              >
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-border hover:bg-card"
              >
                <Link to="/clients">View More Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
