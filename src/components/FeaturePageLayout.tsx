import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { useNavigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import ServicesFooter from "@/components/ServicesFooter";
import type { LucideIcon } from "lucide-react";

export type Capability = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type GlowColor = "blue" | "purple" | "green" | "red" | "orange";

interface FeaturePageLayoutProps {
  eyebrow: string;
  titlePrefix: string;
  titleAccent: string;
  description: string;
  capabilities: Capability[];
  glowColor?: GlowColor;
  ctaLabel?: string;
  children?: ReactNode;
}

export default function FeaturePageLayout({
  eyebrow,
  titlePrefix,
  titleAccent,
  description,
  capabilities,
  glowColor = "purple",
  ctaLabel = "Get Started",
}: FeaturePageLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
      <SiteHeader />

      {/* Hero */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-acc-violet/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-acc-pink/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-6xl text-center space-y-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-4 py-2 rounded-full bg-acc-violet/20 border border-acc-violet/30 text-acc-violet text-sm font-medium tracking-widest uppercase">
              {eyebrow}
            </span>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-gobold uppercase tracking-tight"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-text-1">{titlePrefix} </span>
            <span className="bg-gradient-to-r from-acc-orange via-red-500 via-acc-violet to-acc-pink bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]">
              {titleAccent}
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-text-2 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <GlowCard glowColor={glowColor} customSize className="p-6 h-full">
                    <div className="mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-acc-pink/20 to-acc-violet/20 border border-white/10 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-acc-violet" />
                      </div>
                    </div>
                    <h3 className="text-xl font-gobold uppercase mb-3 text-text-1">{item.title}</h3>
                    <p className="text-text-2 leading-relaxed">{item.description}</p>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl md:text-5xl font-gobold uppercase tracking-tight text-text-1 mb-4">
              Ready to begin?
            </h2>
            <p className="text-xl text-text-2 mb-8">
              Transform your business with our platform.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-acc-orange via-red-500 to-amber-500 hover:opacity-90 text-white px-12 py-6 text-lg rounded-full font-gobold uppercase tracking-tight shadow-lg shadow-acc-orange/25"
              onClick={() => navigate('/auth')}
            >
              {ctaLabel}
            </Button>
          </motion.div>
        </div>
      </section>

      <ServicesFooter />
    </div>
  );
}
