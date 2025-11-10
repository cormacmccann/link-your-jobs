import { Mail, MessageSquare, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/GlowCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import kamrokLogo from "@/assets/kamrok-logo.png";

const Contact = () => {
  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
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

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-gobold uppercase tracking-tight mb-6">
              Let's Talk
            </h1>
            <p className="text-xl text-text-2 max-w-3xl mx-auto">
              Got questions about our services or want to start a project? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <GlowCard glowColor="purple" customSize className="p-8">
              <h2 className="text-2xl font-gobold uppercase mb-6">Send us a message</h2>
              <form className="space-y-4">
                <div>
                  <Input placeholder="Your Name" className="bg-bg-1 border-white/10" />
                </div>
                <div>
                  <Input type="email" placeholder="Email Address" className="bg-bg-1 border-white/10" />
                </div>
                <div>
                  <Input placeholder="Company (Optional)" className="bg-bg-1 border-white/10" />
                </div>
                <div>
                  <Textarea placeholder="Tell us about your project..." className="bg-bg-1 border-white/10 min-h-[150px]" />
                </div>
                <Button className="w-full bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 text-white font-gobold uppercase">
                  Send Message
                </Button>
              </form>
            </GlowCard>

            {/* Contact Info */}
            <div className="space-y-6">
              <GlowCard glowColor="blue" customSize className="p-6">
                <Mail className="w-8 h-8 text-accent-cyan mb-3" />
                <h3 className="font-gobold uppercase mb-2">Email Us</h3>
                <p className="text-text-2">hello@kamrok.com</p>
              </GlowCard>

              <GlowCard glowColor="blue" customSize className="p-6">
                <MessageSquare className="w-8 h-8 text-accent-cyan mb-3" />
                <h3 className="font-gobold uppercase mb-2">Live Chat</h3>
                <p className="text-text-2">Available Mon-Fri, 9am-6pm EST</p>
              </GlowCard>

              <GlowCard glowColor="blue" customSize className="p-6">
                <Phone className="w-8 h-8 text-accent-cyan mb-3" />
                <h3 className="font-gobold uppercase mb-2">Call Us</h3>
                <p className="text-text-2">+1 (555) 123-4567</p>
              </GlowCard>

              <GlowCard glowColor="blue" customSize className="p-6">
                <MapPin className="w-8 h-8 text-accent-cyan mb-3" />
                <h3 className="font-gobold uppercase mb-2">Location</h3>
                <p className="text-text-2">Remote-First Team<br />Serving Clients Worldwide</p>
              </GlowCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
