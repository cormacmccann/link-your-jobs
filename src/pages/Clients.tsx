import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Sparkles, Star, Trophy, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScreenshotCarousel } from "@/components/ScreenshotCarousel";
import { PortfolioPlaceholder } from "@/components/PortfolioPlaceholder";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import ServicesFooter from "@/components/ServicesFooter";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

const FILTERS = ["All", "Web Design", "App Design", "Branding", "Marketing"];

const STATS = [
  { value: "120+", label: "Projects Shipped", icon: Trophy },
  { value: "48", label: "Happy Clients", icon: Users },
  { value: "9yr", label: "In The Game", icon: Sparkles },
  { value: "24/7", label: "Always On", icon: Zap },
];

const Clients = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const { data: portfolioItems, isLoading } = useQuery({
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

  const filtered = useMemo(() => {
    if (!portfolioItems) return [];
    if (selectedFilter === "all") return portfolioItems;
    return portfolioItems.filter(
      (item) =>
        item.project_type?.toLowerCase().includes(selectedFilter) ||
        (item as any).services?.some((s: string) =>
          s.toLowerCase().includes(selectedFilter)
        )
    );
  }, [portfolioItems, selectedFilter]);

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const marqueeItems = portfolioItems?.slice(0, 8) ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />

      {/* === HERO === */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32">
        {/* glow blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-acc-pink/20 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-40 right-0 w-[600px] h-[600px] bg-acc-violet/20 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-acc-cyan/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bg-2/60 border border-border/50 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-acc-cyan animate-pulse" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-text-2">
                Selected Work · 2020 – 2026
              </span>
            </div>

            <h1 className="font-gobold text-[clamp(3rem,10vw,8.5rem)] leading-[0.85] tracking-tighter uppercase mb-8">
              <span className="block text-text-1">Work that</span>
              <span className="block bg-gradient-to-r from-acc-orange via-acc-pink to-acc-violet bg-clip-text text-transparent">
                actually moves
              </span>
              <span className="block text-text-1 italic font-light text-[0.7em]">
                the needle.
              </span>
            </h1>

            <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-16 mt-10">
              <p className="text-text-2 text-lg lg:text-xl leading-relaxed max-w-xl">
                A studio-curated collection of brands we've helped launch, scale and
                transform. Every project shipped, measured and obsessed over.
              </p>
              <div className="flex gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-acc-orange to-acc-pink hover:opacity-90 text-white font-bold uppercase tracking-wider rounded-full px-8 shadow-[0_10px_40px_-10px_hsl(var(--acc-pink)/0.5)]"
                >
                  <Link to="/contact">
                    Start a project <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-border/60 backdrop-blur-md bg-bg-2/40 hover:bg-bg-2"
                >
                  <Link to="/services">Our services</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === MARQUEE STRIP === */}
      {marqueeItems.length > 0 && (
        <section className="relative py-8 border-y border-border/30 bg-bg-1/40 backdrop-blur-sm overflow-hidden">
          <InfiniteSlider gap={48} duration={40}>
            {marqueeItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 whitespace-nowrap"
              >
                <span className="font-gobold text-3xl lg:text-5xl text-text-1/80 uppercase tracking-tight">
                  {item.client_name}
                </span>
                <span className="w-2 h-2 rounded-full bg-acc-pink" />
              </div>
            ))}
          </InfiniteSlider>
        </section>
      )}

      {/* === STATS === */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/30 rounded-2xl overflow-hidden border border-border/30">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-bg-1/80 backdrop-blur-md p-8 lg:p-10 group hover:bg-bg-2 transition-colors"
              >
                <Icon className="w-6 h-6 text-acc-cyan mb-4 group-hover:scale-110 transition-transform" />
                <div className="font-gobold text-4xl lg:text-6xl text-text-1 mb-2 tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-text-2">
                  {s.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* === FILTERS === */}
      <section className="max-w-7xl mx-auto px-6 sticky top-20 z-30">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-bg-1/70 backdrop-blur-2xl border border-border/40 shadow-2xl">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active =
                selectedFilter === f.toLowerCase() ||
                (f === "All" && selectedFilter === "all");
              return (
                <button
                  key={f}
                  onClick={() => setSelectedFilter(f.toLowerCase())}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all ${
                    active
                      ? "bg-gradient-to-r from-acc-pink to-acc-violet text-white shadow-[0_4px_20px_-4px_hsl(var(--acc-pink)/0.6)]"
                      : "text-text-2 hover:text-text-1 hover:bg-bg-2"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
          <div className="text-xs font-bold uppercase tracking-[0.15em] text-text-2">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </div>
        </div>
      </section>

      {/* === FEATURED === */}
      {featured && (
        <section className="max-w-7xl mx-auto px-6 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to={`/clients/${featured.id}`} className="block group">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 relative">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-acc-pink/30 via-acc-violet/20 to-acc-cyan/20 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity rounded-3xl" />
                  <div className="relative aspect-[16/11] rounded-3xl overflow-hidden border border-border/40">
                    {featured.screenshots && featured.screenshots.length > 0 ? (
                      <ScreenshotCarousel
                        screenshots={featured.screenshots}
                        className="w-full h-full"
                      />
                    ) : (
                      <PortfolioPlaceholder
                        clientName={featured.client_name}
                        className="w-full h-full"
                      />
                    )}
                  </div>
                </div>
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-acc-pink/10 border border-acc-pink/30">
                    <Star className="w-3 h-3 fill-acc-pink text-acc-pink" />
                    <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-acc-pink">
                      Featured Case Study
                    </span>
                  </div>
                  <h2 className="font-gobold text-5xl lg:text-7xl uppercase leading-[0.9] tracking-tight text-text-1 group-hover:text-acc-cyan transition-colors">
                    {featured.client_name}
                  </h2>
                  <p className="text-text-2 text-lg leading-relaxed">
                    {featured.description ||
                      "A high-impact transformation across brand, product and growth."}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(featured.services as string[] | null)?.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border border-border/50 text-text-2"
                      >
                        {s}
                      </span>
                    )) || (
                      <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border border-border/50 text-text-2">
                        {featured.project_type || "Web Design"}
                      </span>
                    )}
                  </div>
                  <div className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-text-1 pt-4 border-t border-border/30 w-full">
                    <span className="group-hover:text-acc-cyan transition-colors">
                      View case study
                    </span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      {/* === PROJECT GRID (magazine bento) === */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-acc-cyan mb-3">
              ◆ The Archive
            </div>
            <h3 className="font-gobold text-4xl lg:text-6xl uppercase tracking-tight text-text-1">
              More good work
            </h3>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-2xl bg-bg-1 animate-pulse border border-border/30"
              />
            ))}
          </div>
        ) : rest.length === 0 ? (
          <div className="text-center py-20 text-text-2">
            No projects in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-[minmax(280px,auto)]">
            {rest.map((item, index) => {
              // Bento sizing: alternating large/small for editorial rhythm
              const pattern = index % 5;
              const span =
                pattern === 0
                  ? "lg:col-span-4 lg:row-span-2"
                  : pattern === 1
                  ? "lg:col-span-2"
                  : pattern === 2
                  ? "lg:col-span-2"
                  : pattern === 3
                  ? "lg:col-span-3"
                  : "lg:col-span-3";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: (index % 6) * 0.06,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className={`md:col-span-1 ${span}`}
                >
                  <Link
                    to={`/clients/${item.id}`}
                    className="group block relative h-full rounded-2xl overflow-hidden border border-border/40 bg-bg-1 hover:border-acc-pink/60 transition-all duration-500"
                  >
                    <div className="absolute inset-0">
                      {item.screenshots && item.screenshots.length > 0 ? (
                        <ScreenshotCarousel
                          screenshots={item.screenshots}
                          className="w-full h-full"
                        />
                      ) : (
                        <PortfolioPlaceholder
                          clientName={item.client_name}
                          className="w-full h-full"
                        />
                      )}
                    </div>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-acc-pink/0 via-acc-violet/0 to-acc-cyan/0 group-hover:from-acc-pink/20 group-hover:via-acc-violet/10 group-hover:to-acc-cyan/10 transition-all duration-500 mix-blend-overlay" />

                    {/* Top tag */}
                    <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                      <span className="bg-bg-0/70 backdrop-blur-md px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase text-acc-cyan border border-acc-cyan/30 rounded-full">
                        {item.project_type || "Project"}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 translate-y-[-4px] group-hover:translate-y-0 transition-all duration-300">
                        <div className="w-10 h-10 rounded-full bg-text-1 text-bg-0 flex items-center justify-center">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                      <h4 className="font-gobold text-2xl lg:text-3xl uppercase tracking-tight text-text-1 mb-2 group-hover:text-acc-cyan transition-colors">
                        {item.client_name}
                      </h4>
                      <p className="text-text-2 text-sm line-clamp-2 mb-4 max-w-md">
                        {item.description ||
                          "A custom digital build crafted end-to-end."}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-text-2">
                        <span>View Project</span>
                        <span className="w-8 h-px bg-text-2 group-hover:w-16 group-hover:bg-acc-pink transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* === PROCESS TEASER === */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-px rounded-3xl overflow-hidden border border-border/40 bg-border/40">
          {[
            { n: "01", t: "Discover", d: "We dig deep into brand, audience and market before a single pixel." },
            { n: "02", t: "Design & Build", d: "Studio-grade craft, paired with engineering that doesn't break." },
            { n: "03", t: "Launch & Grow", d: "Ship it, measure it, iterate. Real results — not vanity metrics." },
          ].map((step, i) => (
            <div key={step.n} className="bg-bg-1/80 backdrop-blur-md p-10 lg:p-12">
              <div className="font-gobold text-7xl bg-gradient-to-br from-acc-pink to-acc-violet bg-clip-text text-transparent mb-4">
                {step.n}
              </div>
              <h4 className="font-gobold text-2xl uppercase tracking-tight text-text-1 mb-3">
                {step.t}
              </h4>
              <p className="text-text-2 text-sm leading-relaxed">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === CTA === */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2.5rem] overflow-hidden border border-border/40 bg-bg-1"
        >
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-acc-pink/30 blur-[120px] rounded-full" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-acc-violet/30 blur-[120px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-acc-cyan/15 blur-[100px] rounded-full" />

          <div className="relative p-12 lg:p-24 text-center">
            <Sparkles className="w-10 h-10 text-acc-cyan mx-auto mb-6" />
            <h3 className="font-gobold text-5xl lg:text-8xl uppercase tracking-tighter mb-6 text-text-1">
              Your brand,
              <br />
              <span className="bg-gradient-to-r from-acc-orange via-acc-pink to-acc-violet bg-clip-text text-transparent italic">
                next on this page.
              </span>
            </h3>
            <p className="text-text-2 text-lg max-w-xl mx-auto mb-10">
              We take on a limited number of projects each quarter. Tell us what
              you're building.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-acc-orange to-acc-pink hover:opacity-90 text-white font-bold uppercase tracking-[0.15em] rounded-full px-10 py-7 text-base shadow-[0_20px_60px_-15px_hsl(var(--acc-pink)/0.6)]"
            >
              <Link to="/contact">
                Book a discovery call <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <ServicesFooter />
    </div>
  );
};

export default Clients;
