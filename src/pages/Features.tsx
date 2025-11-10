import { Users, MessageSquare, FolderKanban, FileText, Zap, BarChart3, Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import kamrokLogo from "@/assets/kamrok-logo.png";

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "CRM",
      description: "Complete customer relationship management with contacts, companies, and deal tracking",
      link: "/features/crm"
    },
    {
      icon: MessageSquare,
      title: "Chat",
      description: "Live chat widget and shared inbox for real-time customer conversations",
      link: "/features/chat"
    },
    {
      icon: FolderKanban,
      title: "Projects",
      description: "Basecamp-style project management with todos, docs, and schedules",
      link: "/features/projects"
    },
    {
      icon: FileText,
      title: "Invoicing",
      description: "Create quotes, send invoices, and get paid faster with Stripe integration",
      link: "/features/invoicing"
    },
    {
      icon: Zap,
      title: "Automations",
      description: "Workflow automation with triggers and actions to save time",
      link: "/features/tools"
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Track pipeline value, revenue, and conversion metrics",
      link: "/features/tools"
    },
    {
      icon: Calendar,
      title: "Calendar",
      description: "Schedule meetings and manage bookings with calendar integration",
      link: "/features/tools"
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Stay updated with real-time notifications and activity feeds",
      link: "/features/tools"
    }
  ];

  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
      {/* Header */}
      <header className="border-b border-white/10 bg-bg-0/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/">
              <img src={kamrokLogo} alt="KAMROK" className="h-10" />
            </a>
            <Button size="sm" className="bg-acc-violet hover:bg-acc-violet/90 text-white rounded-full px-6" onClick={() => window.location.href = '/auth'}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-7xl font-gobold uppercase tracking-tight mb-6">
            All Features
          </h1>
          <p className="text-xl text-text-2 max-w-3xl mx-auto">
            Everything you need to manage customers, close deals, and grow your business
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <a href={feature.link} key={index}>
                  <GlowCard glowColor="purple" customSize className="p-6 h-full cursor-pointer hover:scale-105 transition-transform">
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-gobold uppercase mb-2 text-text-1">
                      {feature.title}
                    </h3>
                    <p className="text-text-2">
                      {feature.description}
                    </p>
                  </GlowCard>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
