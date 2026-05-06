import { Users, MessageSquare, FolderKanban, FileText, Zap, BarChart3, Calendar, Bell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import ServicesFooter from "@/components/ServicesFooter";

const Features = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Users, title: "CRM", description: "Complete customer relationship management with contacts, companies, and deal tracking", link: "/features/crm", color: "purple" as const },
    { icon: MessageSquare, title: "Chat", description: "Live chat widget and shared inbox for real-time customer conversations", link: "/features/chat", color: "blue" as const },
    { icon: FolderKanban, title: "Projects", description: "Basecamp-style project management with todos, docs, and schedules", link: "/features/projects", color: "orange" as const },
    { icon: FileText, title: "Invoicing", description: "Create quotes, send invoices, and get paid faster with Stripe integration", link: "/features/invoicing", color: "green" as const },
    { icon: Zap, title: "Automations", description: "Workflow automation with triggers and actions to save time", link: "/features/tools", color: "purple" as const },
    { icon: BarChart3, title: "Analytics", description: "Track pipeline value, revenue, and conversion metrics", link: "/features/tools", color: "blue" as const },
    { icon: Calendar, title: "Calendar", description: "Schedule meetings and manage bookings with calendar integration", link: "/features/tools", color: "orange" as const },
    { icon: Bell, title: "Notifications", description: "Stay updated with real-time notifications and activity feeds", link: "/features/tools", color: "red" as const },
  ];

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
              Platform
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-gobold uppercase tracking-tight"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-text-1">All </span>
            <span className="bg-gradient-to-r from-acc-orange via-red-500 via-acc-violet to-acc-pink bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]">
              Features
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-text-2 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          >
            Everything you need to manage customers, close deals, and grow your business.
          </motion.p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <GlowCard glowColor={feature.color} customSize className="p-6 h-full cursor-pointer" >
                    <div onClick={() => navigate(feature.link)} className="flex flex-col h-full">
                      <div className="mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-acc-pink/20 to-acc-violet/20 border border-white/10 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-acc-violet" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-gobold uppercase mb-3 text-text-1">
                        {feature.title}
                      </h3>
                      <p className="text-text-2 mb-6 flex-grow">
                        {feature.description}
                      </p>
                      <div className="flex items-center gap-2 text-acc-cyan group mt-auto">
                        <span className="font-medium">Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
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
              Join hundreds of businesses growing with Kamrok.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-acc-orange via-red-500 to-amber-500 hover:opacity-90 text-white px-12 py-6 text-lg rounded-full font-gobold uppercase tracking-tight shadow-lg shadow-acc-orange/25"
              onClick={() => navigate('/auth')}
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </section>

      <ServicesFooter />
    </div>
  );
};

export default Features;
