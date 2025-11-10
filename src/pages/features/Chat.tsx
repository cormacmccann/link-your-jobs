import { MessageSquare, Inbox, Globe, Zap, UserPlus, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import kamrokLogo from "@/assets/kamrok-logo.png";

const Chat = () => {
  const capabilities = [
    {
      icon: MessageSquare,
      title: "Live Chat Widget",
      description: "Embeddable chat widget for your website with custom branding and triggers"
    },
    {
      icon: Inbox,
      title: "Shared Inbox",
      description: "Team inbox where everyone sees conversations and can jump in to help"
    },
    {
      icon: Globe,
      title: "Multi-Channel",
      description: "Website chat, email, and social messages all in one unified view"
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description: "Real-time alerts so you never miss a customer message"
    },
    {
      icon: UserPlus,
      title: "Lead Capture",
      description: "Automatically create contacts from chat conversations"
    },
    {
      icon: Bell,
      title: "Typing Indicators",
      description: "See when customers are typing and when they're online"
    }
  ];

  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
      <header className="border-b border-white/10 bg-bg-0/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/">
              <img src={kamrokLogo} alt="KAMROK" className="h-10" />
            </a>
            <Button size="sm" className="bg-acc-violet hover:bg-acc-violet/90 text-white rounded-full px-6" onClick={() => window.location.href = '/auth'}>
              Try Chat
            </Button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-gobold uppercase tracking-tight mb-6">
              Chat & Conversations
            </h1>
            <p className="text-xl text-text-2 max-w-3xl mx-auto">
              Talk to customers in real-time with live chat and shared inbox. Capture leads automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <GlowCard key={index} glowColor="blue" customSize className="p-6">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-gobold uppercase mb-2 text-text-1">
                    {item.title}
                  </h3>
                  <p className="text-text-2">
                    {item.description}
                  </p>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chat;
