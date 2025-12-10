import { Link } from "react-router-dom";
import { 
  QrCode, Key, Link2, Calculator, Mail, FileText, Receipt, 
  Sparkles, Image, Palette, Square, Lock, ShieldCheck, Hash,
  Type, Globe, Share2, Clock, Users, MessageSquare, Percent,
  PoundSterling, Timer, Clover
} from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import kamrokLogo from "@/assets/kamrok-logo.png";

const ToolsHub = () => {
  const toolCategories = [
    {
      name: "Business Essentials",
      tools: [
        { name: "Email Signature Generator", icon: Mail, href: "/tools/email-signature", status: "live" },
        { name: "Invoice Creator", icon: FileText, href: "/tools/invoice-creator", status: "live" },
        { name: "Quotation Maker", icon: Receipt, href: "/tools/quotation-maker", status: "live" },
        { name: "Business Name Generator", icon: Sparkles, href: "/tools/business-name-generator", status: "live" },
      ]
    },
    {
      name: "Design & Dev",
      tools: [
        { name: "QR Code Generator", icon: QrCode, href: "/tools/qr-code-generator", status: "live" },
        { name: "Image Compressor", icon: Image, href: "/tools/image-compressor", status: "coming-soon" },
        { name: "Colour Palette Picker", icon: Palette, href: "/tools/colour-palette", status: "coming-soon" },
        { name: "Favicon Generator", icon: Square, href: "/tools/favicon-generator", status: "coming-soon" },
        { name: "Lorem Ipsum Generator", icon: Clover, href: "/tools/lorem-ipsum", status: "coming-soon" },
      ]
    },
    {
      name: "Security",
      tools: [
        { name: "Password Generator", icon: Key, href: "/tools/password-generator", status: "live" },
        { name: "Password Strength Checker", icon: ShieldCheck, href: "/tools/password-checker", status: "coming-soon" },
      ]
    },
    {
      name: "Marketing & SEO",
      tools: [
        { name: "UTM Builder", icon: Link2, href: "/tools/utm-builder", status: "live" },
        { name: "Meta Tag Preview", icon: Globe, href: "/tools/meta-tag-preview", status: "coming-soon" },
        { name: "OpenGraph Preview", icon: Share2, href: "/tools/opengraph-preview", status: "live" },
        { name: "Hashtag Suggester", icon: Hash, href: "/tools/hashtag-suggester", status: "live" },
        { name: "Email Subject Tester", icon: MessageSquare, href: "/tools/email-subject-tester", status: "coming-soon" },
      ]
    },
    {
      name: "Social Media",
      tools: [
        { name: "Post Size Checker", icon: Square, href: "/tools/social-post-sizes", status: "live" },
        { name: "Countdown Timer Builder", icon: Clock, href: "/tools/countdown-timer", status: "coming-soon" },
        { name: "Marketing Persona Generator", icon: Users, href: "/tools/persona-generator", status: "coming-soon" },
      ]
    },
    {
      name: "Calculators",
      tools: [
        { name: "VAT Calculator", icon: Percent, href: "/tools/vat-calculator", status: "live" },
        { name: "Break-Even Calculator", icon: Calculator, href: "/tools/break-even-calculator", status: "coming-soon" },
        { name: "Hourly Rate Calculator", icon: PoundSterling, href: "/tools/hourly-rate-calculator", status: "coming-soon" },
      ]
    },
    {
      name: "Legal & Compliance",
      tools: [
        { name: "Privacy Policy Generator", icon: Lock, href: "/tools/privacy-policy-builder", status: "live" },
        { name: "Terms & Conditions Generator", icon: FileText, href: "/tools/terms-generator", status: "live" },
        { name: "Cookie Consent Manager", icon: Square, href: "/tools/cookie-consent-manager", status: "live" },
      ]
    },
  ];

  const featuredTools = toolCategories.flatMap(cat => cat.tools).filter(t => t.status === "live").slice(0, 4);

  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-0/80 backdrop-blur-xl border-b border-border-1">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={kamrokLogo} alt="KAMROK" className="h-8 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-text-2 hover:text-text-1 transition-colors text-sm">Home</Link>
            <Link to="/tools" className="text-accent-cyan font-medium text-sm">Free Tools</Link>
            <Link to="/services/web-design" className="text-text-2 hover:text-text-1 transition-colors text-sm">Services</Link>
            <Link to="/clients" className="text-text-2 hover:text-text-1 transition-colors text-sm">Our Work</Link>
            <Link to="/contact" className="text-text-2 hover:text-text-1 transition-colors text-sm">Contact</Link>
          </div>
          <Button asChild className="bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 text-white font-gobold uppercase text-sm">
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4 bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30">
            100% Free • No Sign-up Required
          </Badge>
          <h1 className="text-4xl md:text-6xl font-gobold uppercase tracking-tight mb-4">
            Free Business <span className="text-accent-cyan">Tools</span>
          </h1>
          <p className="text-text-2 text-lg max-w-2xl mx-auto mb-8">
            Powerful tools to help you build, market, and grow your business. 
            No login required, no hidden fees — just useful stuff.
          </p>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-gobold uppercase mb-6">Popular Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.name} to={tool.href} className="group">
                  <GlowCard glowColor="purple" customSize className="p-6 h-full transition-transform group-hover:scale-[1.02]">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-gobold uppercase text-text-1 mb-1">{tool.name}</h3>
                    <p className="text-sm text-text-2">Free to use</p>
                  </GlowCard>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Tools by Category */}
      <section className="py-16 px-4 bg-bg-1/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-gobold uppercase mb-8">All Tools</h2>
          
          <div className="space-y-12">
            {toolCategories.map((category) => (
              <div key={category.name}>
                <h3 className="text-lg font-gobold uppercase text-accent-cyan mb-4">{category.name}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {category.tools.map((tool) => {
                    const Icon = tool.icon;
                    const isLive = tool.status === "live";
                    
                    if (!isLive) {
                      return (
                        <div key={tool.name} className="opacity-60 cursor-not-allowed">
                          <GlowCard glowColor="blue" customSize className="p-4 h-full">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-bg-2 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-text-2" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-text-2 text-sm">{tool.name}</h4>
                                <Badge variant="secondary" className="text-xs mt-1">Coming Soon</Badge>
                              </div>
                            </div>
                          </GlowCard>
                        </div>
                      );
                    }
                    
                    return (
                      <Link key={tool.name} to={tool.href} className="group">
                        <GlowCard glowColor="purple" customSize className="p-4 h-full transition-transform group-hover:scale-[1.02]">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-text-1 text-sm">{tool.name}</h4>
                              <span className="text-xs text-accent-cyan">Use Now →</span>
                            </div>
                          </div>
                        </GlowCard>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-text-2 text-lg mb-8">
            These tools are great for quick tasks, but for a complete digital transformation, 
            let's talk about your project.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 text-white font-gobold uppercase">
            <Link to="/contact">Get a Free Quote</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border-1">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={kamrokLogo} alt="KAMROK" className="h-6 w-auto" />
          </Link>
          <p className="text-text-2 text-sm">© 2024 KAMROK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ToolsHub;
