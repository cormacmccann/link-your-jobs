import { Globe, Palette, Code, Smartphone, Rocket, Award, Sparkles, Clock, HeartHandshake, Check, Monitor, ShoppingCart, Store, Layers, Zap, Shield, Users, Star, ArrowRight, Play, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/ui/hero-section";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import kamrokLogo from "@/assets/kamrok-logo.png";
import { cn } from "@/lib/utils";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Animated section wrapper
function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const Index = () => {
  const [activeDemo, setActiveDemo] = useState(0);

  const features = [
    { icon: Zap, title: "Lightning Fast", description: "Optimized for speed with 90+ PageSpeed scores", color: "from-yellow-500 to-orange-500" },
    { icon: Shield, title: "Secure & Reliable", description: "SSL, backups, and enterprise-grade security", color: "from-green-500 to-emerald-500" },
    { icon: Smartphone, title: "Mobile First", description: "Responsive designs that work on every device", color: "from-blue-500 to-cyan-500" },
    { icon: Rocket, title: "SEO Optimized", description: "Built for visibility and organic growth", color: "from-purple-500 to-pink-500" },
    { icon: Users, title: "User Focused", description: "Intuitive UX that converts visitors to customers", color: "from-pink-500 to-rose-500" },
    { icon: Code, title: "Clean Code", description: "Modern tech stack for easy maintenance", color: "from-indigo-500 to-purple-500" },
  ];

  const stats = [
    { value: "50+", label: "Projects Delivered", color: "text-acc-violet" },
    { value: "100%", label: "Client Satisfaction", color: "text-acc-cyan" },
    { value: "5.0", label: "Average Rating", color: "text-acc-pink" },
    { value: "24h", label: "Response Time", color: "text-acc-orange" },
  ];

  const demoCategories = ["All", "Business", "E-commerce", "Portfolio", "Landing"];
  
  const demos = [
    { title: "Tech Startup", category: "Business", image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { title: "Fashion Store", category: "E-commerce", image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { title: "Creative Agency", category: "Portfolio", image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { title: "SaaS Product", category: "Landing", image: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
    { title: "Restaurant", category: "Business", image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
    { title: "Fitness App", category: "Landing", image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
  ];

  const services = [
    { title: "Web Design", description: "Custom websites that capture your brand and convert visitors", icon: Globe, href: "/services/web-design" },
    { title: "E-commerce", description: "Shopify & WooCommerce stores built to sell", icon: ShoppingCart, href: "/services/web-design" },
    { title: "Branding", description: "Logo, identity, and brand guidelines that stand out", icon: Award, href: "/services/branding" },
    { title: "App Development", description: "Web applications and mobile-responsive solutions", icon: Smartphone, href: "/services/app-development" },
  ];

  const process = [
    { step: "01", title: "Discovery", description: "We learn about your business, goals, and vision in a free consultation call." },
    { step: "02", title: "Strategy", description: "We create a roadmap, wireframes, and design concepts for your approval." },
    { step: "03", title: "Design", description: "Our designers craft stunning visuals that align with your brand." },
    { step: "04", title: "Development", description: "We build your site with clean, fast, SEO-optimized code." },
    { step: "05", title: "Launch", description: "We test everything, then launch your site to the world." },
  ];

  const testimonials = [
    { name: "Sarah M.", role: "CEO, TechFlow", quote: "KAMROK transformed our online presence. Our conversions increased by 150% within 3 months.", rating: 5 },
    { name: "Michael O.", role: "Founder, GreenLeaf", quote: "Professional, creative, and incredibly responsive. They delivered beyond our expectations.", rating: 5 },
    { name: "Emma K.", role: "Marketing Director", quote: "The best agency we've worked with. They truly understand what makes a website convert.", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-bg-0 text-text-1 overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Bar */}
      <AnimatedSection className="py-12 px-4 border-y border-white/5 bg-bg-1/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center">
                <p className={cn("text-4xl md:text-5xl font-gobold", stat.color)}>{stat.value}</p>
                <p className="text-text-2 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Features Grid - Why Choose Us */}
      <AnimatedSection className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-acc-violet/10 text-acc-violet text-sm font-medium mb-4">
              Premium Quality
            </span>
            <h2 className="text-4xl md:text-5xl font-gobold uppercase tracking-tight mb-4">
              Why Choose <span className="text-acc-violet">KAMROK</span>
            </h2>
            <p className="text-text-2 text-lg max-w-2xl mx-auto">
              We don't just build websites — we craft digital experiences that drive real business results
            </p>
          </motion.div>
          
          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative p-8 rounded-2xl bg-bg-1/50 border border-white/5 hover:border-acc-violet/30 transition-all duration-300"
                >
                  <div className={cn(
                    "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-6",
                    feature.color
                  )}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-gobold uppercase mb-2">{feature.title}</h3>
                  <p className="text-text-2">{feature.description}</p>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-acc-violet/5 to-acc-pink/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Services Showcase */}
      <AnimatedSection className="py-24 px-4 bg-gradient-to-b from-bg-1/30 to-bg-0">
        <div className="container mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-acc-cyan/10 text-acc-cyan text-sm font-medium mb-4">
              Full Service Agency
            </span>
            <h2 className="text-4xl md:text-5xl font-gobold uppercase tracking-tight mb-4">
              Everything You Need
            </h2>
            <p className="text-text-2 text-lg max-w-2xl mx-auto">
              From concept to launch, we handle it all — design, development, and ongoing support
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div key={i} variants={fadeInUp}>
                  <Link to={service.href}>
                    <div className="group relative p-8 rounded-2xl bg-bg-1/50 border border-white/5 hover:border-acc-cyan/30 transition-all duration-300 overflow-hidden">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-acc-cyan to-acc-violet flex items-center justify-center shrink-0">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-gobold uppercase mb-2 group-hover:text-acc-cyan transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-text-2 text-lg">{service.description}</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-text-2 group-hover:text-acc-cyan group-hover:translate-x-2 transition-all shrink-0 mt-2" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-acc-cyan to-acc-violet scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Demo Gallery */}
      <AnimatedSection className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-acc-pink/10 text-acc-pink text-sm font-medium mb-4">
              Our Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-gobold uppercase tracking-tight mb-4">
              Stunning <span className="text-acc-pink">Designs</span>
            </h2>
            <p className="text-text-2 text-lg max-w-2xl mx-auto">
              Explore our collection of beautiful, high-converting websites
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-12">
            {demoCategories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveDemo(i)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  activeDemo === i 
                    ? "bg-acc-pink text-white" 
                    : "bg-bg-1/50 text-text-2 hover:text-text-1 hover:bg-bg-1"
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Demo Grid */}
          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demos.map((demo, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                  <div 
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                    style={{ background: demo.image }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button size="sm" className="bg-white text-black hover:bg-white/90">
                      <Play className="w-4 h-4 mr-1" /> Preview
                    </Button>
                  </div>
                </div>
                <h3 className="font-gobold uppercase text-lg group-hover:text-acc-pink transition-colors">
                  {demo.title}
                </h3>
                <p className="text-text-2 text-sm">{demo.category}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-acc-pink hover:bg-acc-pink/90 text-white rounded-full px-8"
              onClick={() => window.location.href = '/clients'}
            >
              View All Projects
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection className="py-24 px-4 bg-bg-1/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-acc-orange/10 text-acc-orange text-sm font-medium mb-4">
              How We Work
            </span>
            <h2 className="text-4xl md:text-5xl font-gobold uppercase tracking-tight mb-4">
              Our <span className="text-acc-orange">Process</span>
            </h2>
            <p className="text-text-2 text-lg max-w-2xl mx-auto">
              A proven approach that delivers results, every time
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-acc-orange/50 via-acc-pink/50 to-acc-violet/50" />
            
            <div className="space-y-12 lg:space-y-0">
              {process.map((step, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className={cn(
                    "lg:grid lg:grid-cols-2 lg:gap-12 items-center",
                    i % 2 === 1 ? "lg:direction-rtl" : ""
                  )}
                >
                  <div className={cn(
                    "relative p-8 rounded-2xl bg-bg-0 border border-white/5",
                    i % 2 === 0 ? "lg:text-right" : "lg:col-start-2"
                  )}>
                    <span className="text-6xl font-gobold text-acc-orange/20 absolute -top-4 right-6">
                      {step.step}
                    </span>
                    <h3 className="text-2xl font-gobold uppercase mb-2 relative">{step.title}</h3>
                    <p className="text-text-2 relative">{step.description}</p>
                  </div>
                  <div className="hidden lg:flex justify-center">
                    <div className="w-4 h-4 rounded-full bg-acc-orange ring-4 ring-acc-orange/20" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-500 text-sm font-medium mb-4">
              Client Love
            </span>
            <h2 className="text-4xl md:text-5xl font-gobold uppercase tracking-tight mb-4">
              What Clients Say
            </h2>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="p-8 rounded-2xl bg-bg-1/50 border border-white/5"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-text-1 text-lg mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-gobold">{testimonial.name}</p>
                  <p className="text-text-2 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Pricing */}
      <AnimatedSection className="py-24 px-4 bg-bg-1/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-acc-violet/10 text-acc-violet text-sm font-medium mb-4">
              Transparent Pricing
            </span>
            <h2 className="text-4xl md:text-5xl font-gobold uppercase tracking-tight mb-4">
              Fair Prices, <span className="text-acc-violet">Real Value</span>
            </h2>
            <p className="text-text-2 text-lg max-w-2xl mx-auto">
              No hidden fees. Payment plans available on all packages.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Starter", price: "€2,500", desc: "Perfect for small businesses", features: ["5 Page Website", "Mobile Responsive", "Contact Form", "Basic SEO", "2 Revisions", "1 Month Support"] },
              { name: "Professional", price: "€4,500", desc: "For growing businesses", features: ["10 Page Website", "E-commerce Ready", "CMS Integration", "Advanced SEO", "Unlimited Revisions", "3 Months Support"], popular: true },
              { name: "Enterprise", price: "€8,000+", desc: "Custom solutions", features: ["Unlimited Pages", "Custom Features", "API Integrations", "Priority Support", "Dedicated Manager", "12 Months Support"] },
            ].map((plan, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className={cn(
                  "relative p-8 rounded-2xl border transition-all",
                  plan.popular 
                    ? "bg-gradient-to-b from-acc-violet/10 to-bg-0 border-acc-violet/50 scale-105" 
                    : "bg-bg-1/50 border-white/5"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-acc-violet text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-gobold uppercase mb-2">{plan.name}</h3>
                <p className="text-text-2 text-sm mb-4">{plan.desc}</p>
                <p className="text-4xl font-gobold text-acc-violet mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-text-2">
                      <Check className="w-5 h-5 text-acc-cyan shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={cn(
                    "w-full",
                    plan.popular 
                      ? "bg-acc-violet hover:bg-acc-violet/90" 
                      : "bg-bg-1 hover:bg-bg-1/80 border border-white/10"
                  )}
                  onClick={() => window.location.href = '/contact'}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-acc-violet/20 via-bg-0 to-acc-pink/20" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-4xl md:text-6xl font-gobold uppercase tracking-tight mb-6">
              Ready to Build Something <span className="text-acc-violet">Amazing</span>?
            </h2>
            <p className="text-text-2 text-xl mb-10 max-w-2xl mx-auto">
              Let's discuss your vision and create a website that drives real results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-acc-violet hover:bg-acc-violet/90 text-white font-gobold uppercase tracking-tight px-10 rounded-full h-14 text-lg"
                onClick={() => window.location.href = '/contact'}
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-acc-cyan text-acc-cyan hover:bg-acc-cyan hover:text-bg-0 font-gobold uppercase tracking-tight px-10 rounded-full h-14 text-lg"
                onClick={() => window.location.href = '/clients'}
              >
                View Our Work
              </Button>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-white/10 bg-bg-1/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1 space-y-4">
              <img src={kamrokLogo} alt="KAMROK" className="h-10" />
              <p className="text-text-2 text-sm">
                Full-stack creative agency building brands that stand out and websites that perform.
              </p>
            </div>
            
            {/* Services Column */}
            <div className="space-y-4">
              <h3 className="font-gobold uppercase text-text-1 text-sm">Services</h3>
              <nav className="flex flex-col gap-3">
                <a href="/services/web-design" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Web Design</a>
                <a href="/services/app-development" className="text-text-2 hover:text-acc-violet transition-colors text-sm">App Development</a>
                <a href="/services/graphic-design" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Graphic Design</a>
                <a href="/services/video-design" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Video Design</a>
                <a href="/services/branding" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Branding</a>
              </nav>
            </div>
            
            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="font-gobold uppercase text-text-1 text-sm">Company</h3>
              <nav className="flex flex-col gap-3">
                <a href="/clients" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Portfolio</a>
                <a href="/tools" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Free Tools</a>
                <a href="/help" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Help Center</a>
                <a href="/contact" className="text-text-2 hover:text-acc-violet transition-colors text-sm">Contact</a>
              </nav>
            </div>
            
            {/* Contact Column */}
            <div className="space-y-4">
              <h3 className="font-gobold uppercase text-text-1 text-sm">Get in Touch</h3>
              <nav className="flex flex-col gap-3">
                <a href="mailto:hello@kamrok.com" className="text-text-2 hover:text-acc-violet transition-colors text-sm">hello@kamrok.com</a>
                <a href="/portal" className="text-acc-cyan hover:text-acc-cyan/80 transition-colors text-sm font-medium">Client Portal →</a>
                <a href="/contact" className="text-acc-violet hover:text-acc-violet/80 transition-colors text-sm font-medium">Start a Project →</a>
              </nav>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-text-2 text-sm">
            <p>© 2025 KAMROK. Creative agency for brands that want to stand out.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-acc-violet transition-colors">Privacy</a>
              <a href="#" className="hover:text-acc-violet transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
