import { Link } from "react-router-dom";
import { MessageSquare, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScreenshotCarousel } from "@/components/ScreenshotCarousel";
import { PortfolioPlaceholder } from "@/components/PortfolioPlaceholder";
import { useState } from "react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import kamrokLogo from "@/assets/kamrok-logo.png";

const Clients = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const { data: portfolioItems } = useQuery({
    queryKey: ["published-portfolio"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("is_published", true)
        .order("is_featured", { ascending: false })
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const filters = ["All", "Web Design", "App Design", "Marketing", "Branding"];
  
  const filteredPortfolio = portfolioItems?.filter(item => {
    if (selectedFilter === "all") return true;
    return item.project_type?.toLowerCase().includes(selectedFilter.toLowerCase()) ||
           (item as any).services?.some((s: string) => s.toLowerCase().includes(selectedFilter.toLowerCase()));
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
        {/* Hero Section */}
        <motion.div 
          className="mb-16 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-8xl font-bold mb-6 leading-[0.9] bg-gradient-to-r from-accent-pink to-accent-orange bg-clip-text text-transparent uppercase tracking-tighter">
            OUR WORK: <br />CRAFTING DIGITAL <br />DOMINANCE
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            We push the boundaries of what's possible in the digital realm. High-impact marketing, immersive interfaces, and strategic design that commands attention.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-12 items-center">
          {filters.map((filter, index) => (
            <Button
              key={filter}
              variant="outline"
              onClick={() => setSelectedFilter(filter.toLowerCase())}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                selectedFilter === filter.toLowerCase() || (filter === "All" && selectedFilter === "all")
                  ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan shadow-[0_0_15px_rgba(31,225,233,0.2)]"
                  : "border-border hover:border-accent-cyan hover:text-accent-cyan text-muted-foreground"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPortfolio?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link to={`/clients/${item.id}`}>
                <div className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-accent-pink/50 transition-all hover:shadow-[0_0_20px_rgba(31,225,233,0.15)]">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    {item.screenshots && item.screenshots.length > 0 ? (
                      <ScreenshotCarousel screenshots={item.screenshots} className="w-full h-full" />
                    ) : (
                      <PortfolioPlaceholder clientName={item.client_name} className="w-full h-full" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/50 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-accent-cyan border border-accent-cyan/30 rounded">
                        {item.project_type || "Web Design"}
                      </span>
                    </div>
                    {item.is_featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-accent-pink to-accent-violet text-white border-0">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-6 bg-card">
                    <h3 className="font-bold text-2xl mb-2 group-hover:text-accent-cyan transition-colors uppercase tracking-tight">
                      {item.client_name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-2">
                      {item.description || "A high-impact digital transformation project."}
                    </p>
                    <span className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                      View Case Study
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-32 p-12 lg:p-24 rounded-2xl bg-card border border-border flex flex-col items-center text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-pink/20 blur-[100px] -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-cyan/20 blur-[100px] -ml-32 -mb-32"></div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 relative z-10 uppercase tracking-tighter">
            READY TO <span className="text-accent-cyan">DOMINATE</span>?
          </h2>
          <p className="text-muted-foreground max-w-lg mb-12 relative z-10">
            The digital landscape waits for no one. Let's build your dominance together.
          </p>
          <Button 
            asChild
            className="bg-accent-pink hover:bg-accent-pink/90 text-white px-10 py-6 rounded-lg font-bold uppercase tracking-widest transition-all scale-100 hover:scale-105 shadow-[0_10px_30px_rgba(255,61,126,0.3)] relative z-10"
          >
            <Link to="/contact">Start a Project</Link>
          </Button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background px-6 lg:px-20 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={kamrokLogo} alt="KAMROK" className="h-6" />
        </Link>
        <div className="flex gap-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <Link to="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
        </div>
      </footer>

      {/* Floating Contact Button */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <Link to="/contact">
          <Button className="size-14 rounded-full bg-gradient-to-br from-accent-pink via-accent-orange to-accent-cyan p-0 shadow-xl hover:scale-110 transition-transform">
            <MessageSquare className="w-6 h-6 text-white" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Clients;
