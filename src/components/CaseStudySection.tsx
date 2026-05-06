import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { Quote, Sparkles, Wrench, Target, TrendingUp, Palette, Layers } from "lucide-react";

interface PaletteSwatch { name: string; hex: string; role?: string }
interface Pillar { title: string; body: string }
interface Step { step: string; title: string; body: string }
interface Result { metric: string; label: string }
interface Tool { name: string; role: string }
interface Testimonial { quote: string; name: string; role: string }

export interface CaseStudy {
  tagline?: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  palette?: PaletteSwatch[];
  pillars?: Pillar[];
  process?: Step[];
  results?: Result[];
  tools_used?: Tool[];
  testimonial?: Testimonial;
}

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const CaseStudySection = ({ data }: { data: CaseStudy }) => {
  return (
    <div className="space-y-20">
      {/* Tagline */}
      {data.tagline && (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
          <p className="text-sm uppercase tracking-[0.3em] text-accent-cyan mb-4">The Brief</p>
          <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight max-w-4xl bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
            {data.tagline}
          </h2>
        </motion.div>
      )}

      {/* Overview */}
      {data.overview && (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl">
            {data.overview}
          </p>
        </motion.div>
      )}

      {/* Challenge / Solution */}
      {(data.challenge || data.solution) && (
        <div className="grid md:grid-cols-2 gap-6">
          {data.challenge && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
              <GlowCard className="p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-pink/15 flex items-center justify-center">
                    <Target className="h-5 w-5 text-accent-pink" />
                  </div>
                  <h3 className="text-xl font-bold font-display uppercase tracking-wide">The Challenge</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{data.challenge}</p>
              </GlowCard>
            </motion.div>
          )}
          {data.solution && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
              <GlowCard className="p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-cyan/15 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-accent-cyan" />
                  </div>
                  <h3 className="text-xl font-bold font-display uppercase tracking-wide">Our Approach</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{data.solution}</p>
              </GlowCard>
            </motion.div>
          )}
        </div>
      )}

      {/* Palette */}
      {data.palette && data.palette.length > 0 && (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
          <div className="flex items-center gap-3 mb-8">
            <Palette className="h-5 w-5 text-accent-violet" />
            <h3 className="text-2xl font-bold font-display uppercase tracking-wide">Color System</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {data.palette.map((c) => (
              <div key={c.hex} className="group relative overflow-hidden rounded-xl border border-border/40">
                <div
                  className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="p-3 bg-card/80 backdrop-blur-sm">
                  <div className="text-sm font-semibold leading-tight">{c.name}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">{c.hex}</div>
                  {c.role && <div className="text-[11px] text-muted-foreground/80 mt-1">{c.role}</div>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Pillars */}
      {data.pillars && data.pillars.length > 0 && (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
          <div className="flex items-center gap-3 mb-8">
            <Layers className="h-5 w-5 text-accent-pink" />
            <h3 className="text-2xl font-bold font-display uppercase tracking-wide">What We Built</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.pillars.map((p, i) => (
              <GlowCard key={i} className="p-6 h-full">
                <div className="text-xs uppercase tracking-[0.2em] text-accent-cyan mb-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="text-lg font-bold mb-2">{p.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </GlowCard>
            ))}
          </div>
        </motion.div>
      )}

      {/* Process */}
      {data.process && data.process.length > 0 && (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
          <h3 className="text-2xl font-bold font-display uppercase tracking-wide mb-8">Our Process</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.process.map((s) => (
              <div
                key={s.step}
                className="relative p-6 rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm"
              >
                <div className="text-4xl font-bold font-display bg-gradient-to-br from-acc-orange via-accent-pink to-accent-violet bg-clip-text text-transparent mb-3">
                  {s.step}
                </div>
                <h4 className="text-base font-bold mb-2">{s.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Results */}
      {data.results && data.results.length > 0 && (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="h-5 w-5 text-accent-cyan" />
            <h3 className="text-2xl font-bold font-display uppercase tracking-wide">The Results</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {data.results.map((r, i) => (
              <GlowCard key={i} className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-br from-acc-orange via-accent-pink to-accent-violet bg-clip-text text-transparent mb-2">
                  {r.metric}
                </div>
                <div className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground">
                  {r.label}
                </div>
              </GlowCard>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tools used */}
      {data.tools_used && data.tools_used.length > 0 && (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
          <div className="flex items-center gap-3 mb-8">
            <Wrench className="h-5 w-5 text-accent-violet" />
            <h3 className="text-2xl font-bold font-display uppercase tracking-wide">Tools & Stack</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.tools_used.map((t) => (
              <div
                key={t.name}
                className="flex items-start gap-3 p-4 rounded-xl border border-border/40 bg-card/40"
              >
                <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-acc-orange to-accent-pink" />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Testimonial */}
      {data.testimonial && (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
          <GlowCard className="p-10 md:p-14 bg-gradient-to-br from-accent-pink/5 via-accent-violet/5 to-accent-cyan/5">
            <Quote className="h-10 w-10 text-accent-pink/60 mb-6" />
            <p className="text-xl md:text-2xl font-display leading-snug mb-6 max-w-3xl">
              "{data.testimonial.quote}"
            </p>
            <div className="text-sm">
              <div className="font-semibold">{data.testimonial.name}</div>
              <div className="text-muted-foreground">{data.testimonial.role}</div>
            </div>
          </GlowCard>
        </motion.div>
      )}
    </div>
  );
};
