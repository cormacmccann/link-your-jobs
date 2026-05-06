import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, ArrowRight, ChevronRight, Globe } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import ServicesFooter from "@/components/ServicesFooter";
import type { CaseStudy } from "@/components/CaseStudySection";

const TECHNOLOGY_LABELS: Record<string, string> = {
  ADOBE: "Adobe Creative Suite",
  WORDPRESS: "WordPress",
  ELEMENTOR: "Elementor",
  PHP: "PHP",
  OPENAI: "OpenAI",
  CLAUDE_SONNET: "Claude Sonnet",
  CLAUDE: "Claude",
  ANTHROPIC: "Anthropic",
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
  LOVABLE: "Lovable",
  BASE44: "Base44",
  BOLT: "Bolt",
};

const SERVICE_LABELS: Record<string, string> = {
  DESIGN: "Design",
  WEB_DESIGN: "Web Design",
  DEVELOPMENT: "Development",
  BRANDING: "Branding",
  APP_DEVELOPMENT: "App Development",
  GRAPHIC_DESIGN: "Graphic Design",
  VIDEO_DESIGN: "Video Design",
  WEB_APP_PLATFORM: "Web App Platform",
};

// ----- Fallback story builder for projects without a rich case_study -----
function buildFallbackCaseStudy(item: any): CaseStudy {
  const name = item.client_name || "the client";
  const industry = item.industry || "their industry";
  const desc = item.description || `A bespoke project designed and shipped end-to-end for ${name}.`;
  const services: string[] = item.services || [];
  const techs: string[] = item.technologies || [];

  return {
    tagline: `A modern ${industry.toLowerCase()} presence, built with intent.`,
    overview: desc,
    challenge: `${name} needed a digital presence that matched the quality of their work — fast, modern and conversion-led, without the overhead of a bloated tech stack.`,
    solution: `We designed and built a tailored experience that puts the brand front and centre. Calm typography, considered motion and a structure that turns visitors into enquiries.`,
    pillars: services.slice(0, 6).map((s) => ({
      title: SERVICE_LABELS[s] || s,
      body: `Delivered as part of an integrated workstream for ${name}.`,
    })),
    process: [
      { step: "01", title: "Discovery", body: `Workshops with ${name} to map goals, audience and competitors.` },
      { step: "02", title: "Design", body: "Brand-led design system, prototyped and tested before a single line of code." },
      { step: "03", title: "Build", body: "Production build with performance, SEO and accessibility baked in." },
      { step: "04", title: "Launch", body: "Soft launch, analytics wired up, then full rollout with ongoing support." },
    ],
    tools_used: techs.slice(0, 8).map((t) => ({
      name: TECHNOLOGY_LABELS[t] || t,
      role: "Part of the production stack",
    })),
  };
}

// ----- Tiny presentational helpers -----
const SectionLabel = ({ children, color = "text-accent-cyan" }: { children: React.ReactNode; color?: string }) => (
  <div className={`flex items-center gap-3 ${color} text-xs uppercase tracking-[0.35em] mb-6`}>
    <span className="h-px w-10 bg-current opacity-60" />
    {children}
  </div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function PortfolioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const [activeSection, setActiveSection] = useState<string>("intro");

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

  // Section spy
  useEffect(() => {
    if (!item) return;
    const sections = document.querySelectorAll<HTMLElement>("[data-section]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.getAttribute("data-section") || "");
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [item]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading project…</p>
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
          <Button onClick={() => navigate("/clients")} className="bg-gradient-to-r from-acc-orange via-accent-pink to-accent-violet">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  const technologies = ((item as any).technologies as string[] | null) || [];
  const services = ((item as any).services as string[] | null) || [];
  const screenshots = (item.screenshots as string[] | null) || [];
  const preliminaryGallery = ((item as any).preliminary_gallery as string[] | null) || [];
  const cs: CaseStudy = ((item as any).case_study as CaseStudy | null) || buildFallbackCaseStudy(item);

  const heroImage = screenshots[0] || item.logo_url;
  const year = item.completion_date ? new Date(item.completion_date).getFullYear() : new Date(item.created_at!).getFullYear();

  // Build a reading-style nav from available sections
  const navSections = [
    { id: "intro", label: "Intro" },
    cs.challenge || cs.solution ? { id: "story", label: "The Story" } : null,
    cs.palette && cs.palette.length ? { id: "palette", label: "Color System" } : null,
    cs.pillars && cs.pillars.length ? { id: "build", label: "What We Built" } : null,
    screenshots.length > 1 ? { id: "showcase", label: "Showcase" } : null,
    cs.process && cs.process.length ? { id: "process", label: "Process" } : null,
    cs.results && cs.results.length ? { id: "results", label: "Results" } : null,
    cs.tools_used && cs.tools_used.length ? { id: "stack", label: "Stack" } : null,
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* ---------- EDITORIAL HERO ---------- */}
      <section
        ref={heroRef}
        data-section="intro"
        className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden border-b border-border/40"
      >
        <motion.div style={{ y: heroY, scale: heroScale, opacity: heroOpacity }} className="absolute inset-0">
          {heroImage ? (
            <img src={heroImage} alt={item.client_name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent-pink/30 via-accent-violet/20 to-accent-cyan/20" />
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/30 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--background))_0%,transparent_70%)]" />

        {/* Floating top bar */}
        <div className="relative z-10 container mx-auto px-4 pt-28">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/clients" className="hover:text-foreground transition-colors">Work</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{item.client_name}</span>
          </motion.div>
        </div>

        {/* Bottom hero block */}
        <div className="relative z-10 container mx-auto px-4 pb-16 md:pb-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-6xl">
            {item.industry && (
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
                {item.industry} · {year}
              </div>
            )}
            <h1 className="font-display uppercase font-bold leading-[0.85] tracking-tight text-[clamp(3rem,9vw,9rem)] mb-6">
              <span className="block bg-gradient-to-br from-foreground via-foreground to-foreground/40 bg-clip-text text-transparent">
                {item.client_name.split(" - ")[0] || item.client_name}
              </span>
            </h1>
            {cs.tagline && (
              <p className="max-w-3xl text-xl md:text-2xl text-muted-foreground leading-snug font-display">
                {cs.tagline}
              </p>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {item.client_url && (
                <Button asChild size="lg" className="bg-gradient-to-r from-acc-orange via-accent-pink to-accent-violet hover:opacity-90 rounded-full">
                  <a href={item.client_url} target="_blank" rel="noopener noreferrer">
                    Visit live site <ArrowUpRight className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              )}
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/20 backdrop-blur-md bg-white/5 hover:bg-white/10">
                <Link to="/contact">Start a project <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 right-6 z-10 hidden md:flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          <span>Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-muted-foreground to-transparent animate-pulse" />
        </div>
      </section>

      {/* ---------- TICKER META STRIP ---------- */}
      <section className="border-b border-border/40 bg-card/30 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/40">
            {[
              { label: "Client", value: item.client_name.split(" - ")[0] || item.client_name },
              { label: "Industry", value: item.industry || "—" },
              { label: "Services", value: services.length ? `${services.length} disciplines` : "Bespoke" },
              { label: "Year", value: String(year) },
            ].map((m, i) => (
              <div key={i} className="px-4 md:px-6 py-6">
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">{m.label}</div>
                <div className="text-base md:text-lg font-display truncate">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- BODY: side rail + content ---------- */}
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid lg:grid-cols-[200px_1fr] gap-12 lg:gap-20">
          {/* Sticky reading nav */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Case Study</div>
              <ul className="space-y-3 border-l border-border/40">
                {navSections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`block pl-4 -ml-px border-l text-sm transition-all ${
                        activeSection === s.id
                          ? "border-accent-pink text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                      }`}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="min-w-0 space-y-28">
            {/* OVERVIEW */}
            {cs.overview && (
              <motion.section
                data-section="story"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
              >
                <SectionLabel>The Brief</SectionLabel>
                <p className="text-2xl md:text-3xl font-display leading-snug max-w-4xl">
                  {cs.overview}
                </p>
              </motion.section>
            )}

            {/* CHALLENGE / SOLUTION as alternating editorial blocks */}
            {(cs.challenge || cs.solution) && (
              <section className="space-y-16">
                {cs.challenge && (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                    className="grid md:grid-cols-12 gap-6 md:gap-10 items-start"
                  >
                    <div className="md:col-span-4">
                      <div className="text-[10px] uppercase tracking-[0.35em] text-accent-pink mb-3">01 / Challenge</div>
                      <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                        Where they were stuck.
                      </h2>
                    </div>
                    <p className="md:col-span-8 text-lg text-muted-foreground leading-relaxed md:pt-2">
                      {cs.challenge}
                    </p>
                  </motion.div>
                )}
                {cs.solution && (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                    className="grid md:grid-cols-12 gap-6 md:gap-10 items-start"
                  >
                    <div className="md:col-span-4 md:order-2">
                      <div className="text-[10px] uppercase tracking-[0.35em] text-accent-cyan mb-3">02 / Approach</div>
                      <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                        How we unlocked it.
                      </h2>
                    </div>
                    <p className="md:col-span-8 md:order-1 text-lg text-muted-foreground leading-relaxed md:pt-2">
                      {cs.solution}
                    </p>
                  </motion.div>
                )}
              </section>
            )}

            {/* COLOR SYSTEM */}
            {cs.palette && cs.palette.length > 0 && (
              <motion.section
                data-section="palette"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
              >
                <SectionLabel color="text-accent-violet">Color System</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-10 max-w-3xl leading-tight">
                  A palette tuned for the work.
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {cs.palette.map((c) => (
                    <motion.div
                      key={c.hex}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="group rounded-2xl overflow-hidden border border-border/40 bg-card/40"
                    >
                      <div className="aspect-[4/5]" style={{ backgroundColor: c.hex }} />
                      <div className="p-4">
                        <div className="text-sm font-semibold leading-tight">{c.name}</div>
                        <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1 font-mono">
                          {c.hex}
                        </div>
                        {c.role && (
                          <div className="text-[11px] text-muted-foreground/80 mt-2">{c.role}</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* WHAT WE BUILT */}
            {cs.pillars && cs.pillars.length > 0 && (
              <motion.section
                data-section="build"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
              >
                <SectionLabel color="text-accent-pink">What We Built</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 max-w-3xl leading-tight">
                  Every part of the product, in one place.
                </h2>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/40 border-y border-border/40">
                  {cs.pillars.map((p, i) => (
                    <div
                      key={i}
                      className={`p-8 md:p-10 group hover:bg-card/40 transition-colors ${
                        i >= 2 ? "md:border-t md:border-border/40" : ""
                      }`}
                    >
                      <div className="flex items-baseline gap-4 mb-4">
                        <span className="text-3xl font-display font-bold bg-gradient-to-br from-acc-orange to-accent-pink bg-clip-text text-transparent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold font-display">{p.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{p.body}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* SHOWCASE — full bleed alternating screenshots */}
            {screenshots.length > 1 && (
              <motion.section
                data-section="showcase"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeUp}
              >
                <SectionLabel color="text-accent-cyan">Showcase</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 max-w-3xl leading-tight">
                  Selected moments.
                </h2>
                <div className="space-y-6">
                  {screenshots.map((src, i) => (
                    <motion.div
                      key={src + i}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className={`relative overflow-hidden rounded-3xl border border-border/40 bg-card/40 ${
                        i % 3 === 0 ? "" : i % 3 === 1 ? "md:ml-12" : "md:mr-12"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`${item.client_name} — view ${i + 1}`}
                        className="w-full h-auto block"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-[0.3em] text-white/70 bg-black/40 backdrop-blur-md px-2 py-1 rounded">
                        {String(i + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* PROCESS — vertical numbered timeline */}
            {cs.process && cs.process.length > 0 && (
              <motion.section
                data-section="process"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
              >
                <SectionLabel>Process</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 max-w-3xl leading-tight">
                  How it came together.
                </h2>
                <div className="relative">
                  <div className="absolute left-4 md:left-8 top-2 bottom-2 w-px bg-gradient-to-b from-acc-orange via-accent-pink to-accent-violet opacity-40" />
                  <div className="space-y-10">
                    {cs.process.map((s, i) => (
                      <motion.div
                        key={s.step}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="relative pl-14 md:pl-24"
                      >
                        <div className="absolute left-0 top-0 w-8 h-8 md:w-16 md:h-16 rounded-full bg-background border border-border/60 flex items-center justify-center text-sm md:text-lg font-display font-bold text-accent-pink">
                          {s.step}
                        </div>
                        <h3 className="text-xl md:text-2xl font-display font-bold mb-2">{s.title}</h3>
                        <p className="text-muted-foreground leading-relaxed max-w-2xl">{s.body}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
            )}

            {/* RESULTS — monolithic stat band */}
            {cs.results && cs.results.length > 0 && (
              <motion.section
                data-section="results"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                className="relative -mx-4 px-4 py-16 md:py-24 rounded-3xl bg-gradient-to-br from-card/60 via-card/30 to-background border border-border/40 overflow-hidden"
              >
                <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-acc-orange/20 blur-[120px]" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent-violet/20 blur-[120px]" />
                <div className="relative">
                  <SectionLabel color="text-acc-orange">The Results</SectionLabel>
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-14 max-w-3xl leading-tight">
                    Numbers that earned the work.
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                    {cs.results.map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.08 }}
                      >
                        <div className="text-5xl md:text-7xl font-display font-bold leading-none bg-gradient-to-br from-acc-orange via-accent-pink to-accent-violet bg-clip-text text-transparent mb-3">
                          {r.metric}
                        </div>
                        <div className="text-sm text-muted-foreground uppercase tracking-wider">
                          {r.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
            )}

            {/* TESTIMONIAL */}
            {cs.testimonial && (
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="border-y border-border/40 py-16 md:py-20"
              >
                <div className="text-6xl md:text-8xl font-display text-accent-pink/40 leading-none mb-6">"</div>
                <p className="text-2xl md:text-4xl font-display leading-snug max-w-4xl mb-8">
                  {cs.testimonial.quote}
                </p>
                <div className="text-sm">
                  <div className="font-semibold">{cs.testimonial.name}</div>
                  <div className="text-muted-foreground">{cs.testimonial.role}</div>
                </div>
              </motion.section>
            )}

            {/* STACK */}
            {(cs.tools_used && cs.tools_used.length > 0) || technologies.length > 0 ? (
              <motion.section
                data-section="stack"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
              >
                <SectionLabel color="text-accent-violet">Tools & Stack</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 max-w-3xl leading-tight">
                  The kit behind the build.
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(cs.tools_used && cs.tools_used.length
                    ? cs.tools_used
                    : technologies.map((t) => ({ name: TECHNOLOGY_LABELS[t] || t, role: "Production stack" }))
                  ).map((t) => (
                    <div
                      key={t.name}
                      className="group flex items-start gap-4 p-5 rounded-2xl border border-border/40 bg-card/40 hover:border-accent-pink/40 transition-colors"
                    >
                      <div className="mt-1 w-10 h-10 rounded-xl bg-gradient-to-br from-acc-orange/20 to-accent-violet/20 border border-border/40 flex items-center justify-center text-accent-pink font-display font-bold text-sm">
                        {t.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold truncate">{t.name}</div>
                        <div className="text-sm text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            ) : null}

            {/* PRELIMINARY GALLERY (if any) */}
            {preliminaryGallery && preliminaryGallery.length > 0 && (
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeUp}
              >
                <SectionLabel color="text-accent-cyan">Sketches & Process</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-10 max-w-3xl leading-tight">
                  From the cutting room floor.
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {preliminaryGallery.map((image, idx) => (
                    <div key={idx} className="aspect-square overflow-hidden rounded-2xl border border-border/40 bg-card/40 group">
                      <img
                        src={image}
                        alt={`Process ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* META FOOTER ROW */}
            <section className="grid md:grid-cols-3 gap-6 pt-8 border-t border-border/40">
              {services.length > 0 && (
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Services</div>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <span key={s} className="px-3 py-1 rounded-full text-xs border border-border/60 bg-card/40">
                        {SERVICE_LABELS[s] || s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {technologies.length > 0 && (
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full text-xs border border-border/60 bg-card/40">
                        {TECHNOLOGY_LABELS[t] || t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {item.client_url && (
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Live</div>
                  <a
                    href={item.client_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent-cyan hover:underline"
                  >
                    <Globe className="h-4 w-4" />
                    {new URL(item.client_url).hostname}
                  </a>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {/* ---------- BIG CTA ---------- */}
      <section className="relative overflow-hidden border-t border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-acc-orange/10 via-accent-pink/10 to-accent-violet/10" />
        <div className="relative container mx-auto px-4 py-24 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-xs uppercase tracking-[0.4em] text-accent-cyan mb-6">Next</div>
            <h2 className="font-display font-bold uppercase leading-[0.9] text-[clamp(2.5rem,7vw,6rem)] mb-8">
              Got a project worth <span className="bg-gradient-to-r from-acc-orange via-accent-pink to-accent-violet bg-clip-text text-transparent">making properly?</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-acc-orange via-accent-pink to-accent-violet hover:opacity-90">
                <Link to="/contact">Start a project <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/clients">View more work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ServicesFooter />
    </div>
  );
}
