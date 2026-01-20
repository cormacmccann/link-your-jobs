import { Link } from "react-router-dom";
import { 
  QrCode, Key, Link2, Calculator, Mail, FileText, Receipt, 
  Sparkles, Image, Palette, Square, Lock, ShieldCheck, Hash,
  Globe, Share2, Clock, Users, MessageSquare, Percent,
  PoundSterling, Clover, Search, ExternalLink, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";

const ToolsHub = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const toolCategories = [
    {
      name: "Business Essentials",
      category: "business",
      tools: [
        { name: "Email Signature Generator", icon: Mail, href: "/tools/email-signature", status: "live", description: "Professional email signatures in seconds." },
        { name: "Invoice Creator", icon: FileText, href: "/tools/invoice-creator", status: "live", description: "Create and download invoices instantly." },
        { name: "Quotation Maker", icon: Receipt, href: "/tools/quotation-maker", status: "live", description: "Generate professional quotations." },
        { name: "Business Name Generator", icon: Sparkles, href: "/tools/business-name-generator", status: "live", description: "AI-powered business name ideas." },
      ]
    },
    {
      name: "Design & Dev",
      category: "design",
      tools: [
        { name: "QR Code Generator", icon: QrCode, href: "/tools/qr-code-generator", status: "live", description: "Custom QR codes for any URL." },
        { name: "Image Compressor", icon: Image, href: "/tools/image-compressor", status: "live", description: "Batch compress without losing quality." },
        { name: "Colour Palette Picker", icon: Palette, href: "/tools/colour-palette", status: "live", description: "Generate harmonic color schemes." },
        { name: "Favicon Generator", icon: Square, href: "/tools/favicon-generator", status: "coming-soon", description: "Create favicons from any image." },
        { name: "Irish Lorem Ipsum", icon: Clover, href: "/tools/lorem-ipsum", status: "live", description: "Placeholder text with Irish flair." },
      ]
    },
    {
      name: "Security",
      category: "security",
      tools: [
        { name: "Password Generator", icon: Key, href: "/tools/password-generator", status: "live", description: "Secure random password generation." },
        { name: "Password Strength Checker", icon: ShieldCheck, href: "/tools/password-checker", status: "live", description: "Test your password security." },
      ]
    },
    {
      name: "Marketing & SEO",
      category: "seo",
      tools: [
        { name: "UTM Builder", icon: Link2, href: "/tools/utm-builder", status: "live", description: "Track campaigns with UTM parameters." },
        { name: "Meta Tag Preview", icon: Globe, href: "/tools/meta-tag-preview", status: "live", description: "Preview your search snippets." },
        { name: "OpenGraph Preview", icon: Share2, href: "/tools/opengraph-preview", status: "live", description: "Preview social share cards." },
        { name: "Hashtag Suggester", icon: Hash, href: "/tools/hashtag-suggester", status: "live", description: "AI-powered hashtag suggestions." },
        { name: "Email Subject Tester", icon: MessageSquare, href: "/tools/email-subject-tester", status: "live", description: "Test subject line effectiveness." },
      ]
    },
    {
      name: "Calculators",
      category: "calculators",
      tools: [
        { name: "VAT Calculator", icon: Percent, href: "/tools/vat-calculator", status: "live", description: "Calculate VAT for any amount." },
        { name: "Break-Even Calculator", icon: Calculator, href: "/tools/break-even-calculator", status: "live", description: "Find your break-even point." },
        { name: "Hourly Rate Calculator", icon: PoundSterling, href: "/tools/hourly-rate-calculator", status: "live", description: "Calculate your ideal hourly rate." },
      ]
    },
    {
      name: "Legal & Compliance",
      category: "legal",
      tools: [
        { name: "Privacy Policy Generator", icon: Lock, href: "/tools/privacy-policy-builder", status: "live", description: "GDPR-compliant privacy policies." },
        { name: "Terms & Conditions", icon: FileText, href: "/tools/terms-generator", status: "live", description: "Legal terms generator." },
        { name: "Cookie Consent Manager", icon: Square, href: "/tools/cookie-consent-manager", status: "live", description: "Cookie consent solution." },
      ]
    },
  ];

  const categories = [
    { id: "all", label: "All Tools" },
    { id: "seo", label: "SEO & Tech" },
    { id: "design", label: "Design" },
    { id: "business", label: "Business" },
  ];

  const allTools = toolCategories.flatMap(cat => cat.tools.map(t => ({ ...t, categoryId: cat.category })));
  
  const filteredTools = allTools.filter(tool => {
    const matchesCategory = activeCategory === "all" || tool.categoryId === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && (searchQuery === "" || matchesSearch);
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <motion.div 
            className="relative overflow-hidden rounded-2xl bg-card p-12 lg:p-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--accent-cyan) / 0.15) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}
          >
            <div className="relative z-10 flex flex-col items-center gap-6">
              <Badge className="bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30 text-xs font-bold tracking-widest uppercase">
                Toolkit v2.0
              </Badge>
              <h1 className="font-bold text-5xl lg:text-7xl max-w-4xl leading-none bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-muted-foreground uppercase tracking-tighter">
                Free Web Utilities
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                High-performance digital marketing and design tools for the modern creator. No subscriptions, no fluff. Just pure utility.
              </p>
              <div className="flex gap-4 mt-4">
                <Button asChild className="bg-gradient-to-r from-accent-pink to-accent-violet text-white px-8 py-6 rounded-xl font-bold flex items-center gap-2 group">
                  <Link to="#tools">
                    Explore All Tools
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-border hover:bg-card px-8 py-6 rounded-xl font-bold">
                  Documentation
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Tool Categories / Tabs */}
        <section className="mb-12" id="tools">
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-border pb-6">
            <div className="flex gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  variant={activeCategory === cat.id ? "default" : "ghost"}
                  className={`px-6 py-2 rounded-full text-sm font-bold ${
                    activeCategory === cat.id 
                      ? "bg-accent-pink text-white" 
                      : "hover:bg-card text-muted-foreground"
                  }`}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs uppercase font-bold tracking-widest">Sort by:</span>
              <select className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer">
                <option>Most Popular</option>
                <option>Newly Added</option>
              </select>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => {
            const Icon = tool.icon;
            const isLive = tool.status === "live";
            
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {isLive ? (
                  <Link to={tool.href} className="group">
                    <div className="bg-card rounded-xl p-8 border border-border hover:border-accent-cyan/50 transition-all hover:shadow-[0_0_15px_rgba(31,225,233,0.1)] flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <div className="size-14 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                          <Icon className="text-accent-cyan w-7 h-7" />
                        </div>
                        <span className="text-[10px] font-bold text-accent-cyan tracking-widest uppercase border border-accent-cyan/20 px-2 py-1 rounded">
                          {tool.categoryId.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="font-bold text-xl mb-2 group-hover:text-accent-cyan transition-colors uppercase tracking-tight">
                        {tool.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-8 flex-grow">{tool.description}</p>
                      <Button className="w-full py-3 rounded-lg border border-border bg-transparent text-foreground font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-accent-pink group-hover:border-accent-pink group-hover:text-white transition-all">
                        Launch Tool
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </Link>
                ) : (
                  <div className="opacity-60 cursor-not-allowed">
                    <div className="bg-card rounded-xl p-8 border border-border flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <div className="size-14 rounded-lg bg-muted flex items-center justify-center">
                          <Icon className="text-muted-foreground w-7 h-7" />
                        </div>
                        <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                      </div>
                      <h3 className="font-bold text-xl mb-2 text-muted-foreground uppercase tracking-tight">
                        {tool.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-8 flex-grow">{tool.description}</p>
                      <Button disabled className="w-full py-3 rounded-lg border border-border text-muted-foreground font-bold text-sm">
                        Coming Soon
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </section>

        {/* CTA / Footer Info */}
        <section className="mt-20 border-t border-border pt-16 flex flex-col items-center">
          <motion.div 
            className="bg-accent-violet/10 rounded-3xl p-12 w-full text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -right-20 -top-20 size-64 bg-accent-violet opacity-10 blur-[100px]"></div>
            <h4 className="font-bold text-3xl mb-4 uppercase tracking-tight">Can't find what you need?</h4>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              We are constantly building new utilities. Request a feature or a tool you'd like to see in the KAMROK toolkit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Input placeholder="Suggest a tool..." className="bg-card border-border max-w-sm focus:border-accent-cyan" />
              <Button className="bg-foreground text-background hover:bg-foreground/90 px-8">
                Send Suggestion
              </Button>
            </div>
          </motion.div>
          
          <footer className="mt-24 pb-12 w-full flex flex-col md:flex-row justify-between items-center gap-8 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-tighter">KAMROK</span>
              <span>© 2024 Digital Utilities Hub.</span>
            </div>
            <div className="flex gap-8">
              <Link to="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-foreground transition-colors">Open Source</Link>
              <Link to="#" className="hover:text-foreground transition-colors">Changelog</Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default ToolsHub;
