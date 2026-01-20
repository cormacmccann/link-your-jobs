import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram, Palette, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";

const Contact = () => {
  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: async (formData: any) => {
      const { error } = await supabase.from("contact_submissions").insert({
        ...formData,
        source_page: "/contact",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    submitMutation.mutate({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      message: formData.get("message"),
    });
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent-cyan/30">
      <SiteHeader />
      <div 
        className="relative flex min-h-screen w-full flex-col overflow-x-hidden"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.03) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      >

        <main className="flex-1 flex flex-col md:flex-row max-w-[1440px] mx-auto w-full px-6 md:px-20 lg:px-40 py-12 md:py-24 gap-12 lg:gap-24 items-start">
          {/* Left Panel: Information Hub */}
          <motion.div 
            className="w-full md:w-1/2 flex flex-col gap-12"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-none tracking-tighter">
                INITIATE<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange via-accent-pink to-accent-violet">CONTACT</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-md font-light leading-relaxed">
                Ready to bridge the gap between imagination and reality? Our team is standing by to catalyze your digital evolution.
              </p>
            </div>
            
            <div className="flex flex-col gap-8">
              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex flex-col gap-1 group">
                  <span className="text-xs font-bold tracking-[0.2em] text-accent-cyan uppercase">Email</span>
                  <a 
                    href="mailto:hello@kamrok.digital" 
                    className="text-2xl font-medium group-hover:text-accent-pink transition-colors"
                  >
                    hello@kamrok.digital
                  </a>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold tracking-[0.2em] text-accent-cyan uppercase">Location</span>
                  <p className="text-xl font-medium text-muted-foreground">Global / Remote / Worldwide</p>
                </div>
              </div>
              
              {/* Social Grid */}
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold tracking-[0.2em] text-accent-cyan uppercase">Connect</span>
                <div className="flex gap-4">
                  <a 
                    href="#" 
                    className="size-12 rounded-lg bg-card border border-border flex items-center justify-center hover:border-[#1DA1F2] hover:text-[#1DA1F2] transition-all"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="size-12 rounded-lg bg-card border border-border flex items-center justify-center hover:border-[#0077B5] hover:text-[#0077B5] transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="size-12 rounded-lg bg-card border border-border flex items-center justify-center hover:border-[#E4405F] hover:text-[#E4405F] transition-all"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="size-12 rounded-lg bg-card border border-border flex items-center justify-center hover:border-[#EA4C89] hover:text-[#EA4C89] transition-all"
                  >
                    <Palette className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Subtle Decorative Element */}
            <div className="hidden lg:block mt-12">
              <div className="w-full h-[1px] bg-gradient-to-r from-accent-cyan/50 to-transparent"></div>
              <p className="text-[10px] tracking-[0.4em] text-muted-foreground/30 mt-4 uppercase">System Status: Active // Protocol 77</p>
            </div>
          </motion.div>

          {/* Right Panel: Action Center (Form) */}
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="backdrop-blur-lg bg-card/60 p-8 md:p-10 rounded-2xl border border-border shadow-2xl relative overflow-hidden group/panel">
              {/* Glow effect in the corner */}
              <div className="absolute -top-24 -right-24 size-48 bg-accent-cyan/10 blur-[80px] rounded-full"></div>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold tracking-tight">Project Inquiry</h2>
                  <p className="text-muted-foreground text-sm">Tell us what you're building.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2 group/field">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within/field:text-accent-cyan transition-colors">
                      Full Name
                    </label>
                    <Input 
                      name="name"
                      placeholder="John Doe" 
                      required
                      className="bg-card border-border focus:border-accent-cyan/50 focus:ring-0 focus:shadow-[0_0_15px_rgba(31,225,233,0.3)] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2 group/field">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within/field:text-accent-cyan transition-colors">
                      Company
                    </label>
                    <Input 
                      name="company"
                      placeholder="Acme Inc." 
                      className="bg-card border-border focus:border-accent-cyan/50 focus:ring-0 focus:shadow-[0_0_15px_rgba(31,225,233,0.3)] transition-all"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 group/field">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within/field:text-accent-cyan transition-colors">
                    Email Address
                  </label>
                  <Input 
                    name="email"
                    type="email"
                    placeholder="hello@company.com" 
                    required
                    className="bg-card border-border focus:border-accent-cyan/50 focus:ring-0 focus:shadow-[0_0_15px_rgba(31,225,233,0.3)] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2 group/field">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within/field:text-accent-cyan transition-colors">
                    Phone (Optional)
                  </label>
                  <Input 
                    name="phone"
                    type="tel"
                    placeholder="+353 123 456 789" 
                    className="bg-card border-border focus:border-accent-cyan/50 focus:ring-0 focus:shadow-[0_0_15px_rgba(31,225,233,0.3)] transition-all"
                  />
                </div>
                
                <div className="flex flex-col gap-2 group/field">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within/field:text-accent-cyan transition-colors">
                    Message
                  </label>
                  <Textarea 
                    name="message"
                    placeholder="Briefly describe your vision..." 
                    rows={4}
                    required
                    className="bg-card border-border focus:border-accent-cyan/50 focus:ring-0 focus:shadow-[0_0_15px_rgba(31,225,233,0.3)] transition-all resize-none"
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="w-full bg-gradient-to-r from-accent-orange via-accent-pink to-accent-violet text-white font-bold py-4 rounded-lg tracking-[0.2em] uppercase text-xs shadow-lg shadow-accent-pink/20 hover:shadow-accent-pink/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>{submitMutation.isPending ? "Sending..." : "Send Message"}</span>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </main>

        <footer className="px-6 md:px-20 lg:px-40 py-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-muted-foreground text-xs tracking-widest uppercase">
          <div>© 2024 KAMROK DIGITAL. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-accent-cyan transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-accent-cyan transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
            SYSTEMS OPERATIONAL
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Contact;
