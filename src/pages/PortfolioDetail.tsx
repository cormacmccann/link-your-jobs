import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { ScreenshotCarousel } from "@/components/ScreenshotCarousel";
import { ArrowLeft, ExternalLink, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  KINSTA: "Kinsta"
};

const SERVICE_LABELS: Record<string, string> = {
  DESIGN: "Design",
  WEB_DESIGN: "Web Design",
  DEVELOPMENT: "Development",
  BRANDING: "Branding",
  APP_DEVELOPMENT: "App Development"
};

export default function PortfolioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: item, isLoading } = useQuery({
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
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Portfolio item not found</p>
          <Button onClick={() => navigate("/clients")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/clients")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Gallery
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Media */}
          <div className="space-y-6">
            {item.logo_url && (
              <GlowCard className="p-6 flex items-center justify-center bg-card">
                <img 
                  src={item.logo_url} 
                  alt={item.client_name}
                  className="max-h-24 object-contain"
                />
              </GlowCard>
            )}

            {item.screenshots && item.screenshots.length > 0 && (
              <GlowCard className="overflow-hidden">
                <ScreenshotCarousel 
                  screenshots={item.screenshots}
                  className="aspect-video"
                />
              </GlowCard>
            )}

            {item.preliminary_gallery && item.preliminary_gallery.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Preliminary Work</h3>
                <div className="grid grid-cols-2 gap-4">
                  {item.preliminary_gallery.map((image: string, index: number) => (
                    <GlowCard key={index} className="overflow-hidden">
                      <img 
                        src={image}
                        alt={`Preliminary work ${index + 1}`}
                        className="w-full aspect-square object-cover"
                      />
                    </GlowCard>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-4xl font-bold">{item.client_name}</h1>
                {item.is_featured && (
                  <Badge className="bg-accent-violet/20 text-accent-violet border-accent-violet/40">
                    Featured Work
                  </Badge>
                )}
              </div>
              
              {item.industry && (
                <p className="text-muted-foreground text-lg">{item.industry}</p>
              )}
            </div>

            {item.client_url && (
              <Button asChild variant="default" size="lg">
                <a 
                  href={item.client_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </a>
              </Button>
            )}

            {item.description && (
              <GlowCard className="p-6">
                <h2 className="text-xl font-semibold mb-3">About This Project</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </GlowCard>
            )}

            {item.services && item.services.length > 0 && (
              <GlowCard className="p-6">
                <h2 className="text-xl font-semibold mb-3">Services Provided</h2>
                <div className="flex flex-wrap gap-2">
                  {item.services.map((service: string) => (
                    <Badge key={service} variant="secondary">
                      {SERVICE_LABELS[service] || service}
                    </Badge>
                  ))}
                </div>
              </GlowCard>
            )}

            {item.technologies && item.technologies.length > 0 && (
              <GlowCard className="p-6">
                <h2 className="text-xl font-semibold mb-3">Technologies Used</h2>
                <div className="grid grid-cols-2 gap-3">
                  {item.technologies.map((tech: string) => (
                    <div key={tech} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent-green" />
                      <span className="text-sm">{TECHNOLOGY_LABELS[tech] || tech}</span>
                    </div>
                  ))}
                </div>
              </GlowCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
