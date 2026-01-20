import { Sparkles, ArrowRight, ArrowDown, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, type Easing } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import kamrokLogo from "@/assets/kamrok-logo.png";
import { cn } from "@/lib/utils";
import SiteHeader from "@/components/SiteHeader";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as Easing } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
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
  const services = [
    { 
      title: "Branding and Identity Design", 
      description: "Our creative agency is a team of professionals focused on helping your brand grow.",
      href: "/services/branding"
    },
    { 
      title: "Website Design and Development", 
      description: "Our creative agency is a team of professionals focused on helping your brand grow.",
      href: "/services/web-design"
    },
    { 
      title: "Advertising and Marketing Campaigns", 
      description: "Our creative agency is a team of professionals focused on helping your brand grow.",
      href: "/services"
    },
    { 
      title: "Creative Consulting and Development", 
      description: "Our creative agency is a team of professionals focused on helping your brand grow.",
      href: "/services/app-development"
    },
  ];

  const testimonials = [
    { 
      name: "Sarah Newman", 
      company: "TechFlow Ireland", 
      quote: "This creative agency stands out with their exceptional talent and expertise. Their ability to think outside the box and bring unique ideas to life is truly impressive. With meticulous attention to detail, they consistently deliver visually stunning and impactful work."
    },
    { 
      name: "Emma Trueman", 
      company: "GreenLeaf UK", 
      quote: "I had the pleasure of working with this creative agency, and I must say, they truly impressed me. They consistently think outside the box, resulting in impressive and impactful work. I highly recommend this agency for their consistent delivery of exceptional creative solutions."
    },
    { 
      name: "Michael O'Brien", 
      company: "Dublin Ventures", 
      quote: "Professional, creative, and incredibly responsive. They delivered beyond our expectations and transformed our digital presence completely. A fantastic team that truly understands the UK & Ireland market."
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const blogPosts = [
    { 
      title: "How to Elevate Your Brand Above the Competition", 
      category: "BRANDING", 
      date: "May 24 2025",
      image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    { 
      title: "The Future of Web Design: Trends to Watch in 2025", 
      category: "TECHNOLOGY", 
      date: "May 18 2025",
      image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
  ];

  return (
    <div className="min-h-screen bg-bg-0 text-text-1 overflow-x-hidden">
      <SiteHeader />
      
      {/* Hero Banner - Dark with animated gradient */}
      <section className="relative min-h-screen bg-bg-0 overflow-hidden flex items-center">
        {/* Animated gradient blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute w-[600px] h-[600px] rounded-full bg-acc-orange/20 blur-[150px]"
            style={{ top: '10%', right: '5%' }}
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute w-[500px] h-[500px] rounded-full bg-acc-violet/15 blur-[120px]"
            style={{ bottom: '10%', left: '10%' }}
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute w-[400px] h-[400px] rounded-full bg-acc-pink/10 blur-[100px]"
            style={{ top: '40%', left: '30%' }}
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-0/50 to-bg-0" />

        <div className="container mx-auto max-w-7xl px-6 relative z-10 pt-32 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-gobold uppercase tracking-tight text-white/90 mb-8 leading-[1.1]">
              Designing <span className="font-light opacity-70">a Better</span><br />
              World <span className="font-light opacity-70">Today</span>
            </h1>
            
            <div className="max-w-xl mb-12">
              <p className="text-lg md:text-xl text-white/50 leading-relaxed">
                Welcome to our world of endless imagination and boundless creativity. Together, let's embark on a remarkable journey where dreams become tangible realities.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Button 
                size="lg"
                className="bg-acc-orange hover:bg-acc-orange/90 text-white font-medium px-8 rounded-full h-14 text-base group"
                onClick={() => window.location.href = '/services'}
              >
                What we do
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Link 
                to="/clients" 
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
              >
                <span className="text-base">View works</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div 
              className="flex flex-col items-center gap-4"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="relative w-24 h-24">
                <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                  <defs>
                    <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                  </defs>
                  <text className="text-[10px] fill-white/40 uppercase tracking-[3px]">
                    <textPath href="#circlePath">Scroll down • Scroll down • </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ArrowDown className="w-5 h-5 text-white/60" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AnimatedSection className="py-24 md:py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <motion.div variants={fadeInUp}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-gobold uppercase tracking-tight mb-8 leading-[1.1]">
                  Discover <br/>Our <span className="font-light opacity-70">Studio</span>
                </h2>
                
                <p className="text-text-2 text-lg leading-relaxed mb-6">
                  At our design studio, we are a collective of talented individuals ignited by our unwavering passion for transforming ideas into reality. With a harmonious blend of diverse backgrounds and a vast array of skill sets, we join forces to create compelling solutions for our esteemed clients.
                </p>
                
                <p className="text-text-2 text-lg leading-relaxed mb-10">
                  Collaboration is at the heart of what we do. Our team thrives on the synergy that arises when unique perspectives converge, fostering an environment of boundless creativity. By harnessing our collective expertise, we produce extraordinary results that consistently surpass expectations.
                </p>

                <div className="flex items-center gap-6 p-6 bg-bg-1/50 rounded-2xl border border-white/5">
                  <div className="w-16 h-16 rounded-full bg-acc-orange/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-8 h-8 text-acc-orange" />
                  </div>
                  <p className="text-lg text-text-1">
                    Passionately Creating <span className="font-light opacity-70">Design Wonders:</span> Unleashing <span className="font-light opacity-70">Boundless Creativity</span>
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="order-1 lg:order-2">
              <motion.div 
                variants={scaleIn}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden"
              >
                {/* Decorative lines */}
                <div className="absolute -left-4 top-1/4 w-px h-32 bg-gradient-to-b from-transparent via-acc-orange to-transparent" />
                <div className="absolute -left-8 top-1/3 w-px h-24 bg-gradient-to-b from-transparent via-acc-violet to-transparent" />
                
                <div className="absolute inset-0 bg-gradient-to-br from-acc-violet/30 via-acc-pink/20 to-acc-orange/30" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz4KPC9zdmc+')] opacity-50" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-6xl font-gobold text-white/20">KAMROK</p>
                    <p className="text-lg text-white/30 mt-2">Creative Excellence</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section - Dark background */}
      <section className="relative bg-bg-0 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute w-[500px] h-[500px] rounded-full bg-acc-violet/10 blur-[150px]"
            style={{ top: '20%', right: '-10%' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute w-[400px] h-[400px] rounded-full bg-acc-orange/10 blur-[120px]"
            style={{ bottom: '10%', left: '-5%' }}
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto max-w-7xl px-6 py-24 md:py-32 relative z-10">
          {/* Section header with suptitle */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex justify-end mb-8">
              <p className="text-right text-white/40 text-sm leading-relaxed max-w-md">
                Professionals focused on helping your brand<br/> grow and move forward.
              </p>
            </div>
            
            <div className="text-center mb-4">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-gobold uppercase tracking-tight text-white/90 leading-[1.1]">
                Unique <span className="font-light opacity-70">Ideas</span>
              </h2>
            </div>
            
            <div className="flex items-center justify-center gap-6">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-gobold uppercase tracking-tight text-white/90">
                For Your <span className="font-light opacity-70">Business.</span>
              </h2>
              <Button 
                className="bg-acc-orange hover:bg-acc-orange/90 text-white rounded-full px-8 h-14 font-medium hidden md:flex"
                onClick={() => window.location.href = '/services'}
              >
                What we do
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  to={service.href}
                  className="block p-8 bg-bg-0 hover:bg-bg-1/50 transition-all duration-300 h-full group"
                >
                  <h3 className="text-xl font-gobold uppercase text-white/90 mb-4 leading-tight group-hover:text-acc-orange transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-acc-orange transition-colors">
                    <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-8 md:hidden text-center">
            <Button 
              className="bg-acc-orange hover:bg-acc-orange/90 text-white rounded-full px-8 h-14 font-medium"
              onClick={() => window.location.href = '/services'}
            >
              What we do
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="py-24 px-6 bg-bg-1/30 border-y border-white/5">
        <div className="container mx-auto max-w-7xl">
          <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "150+", label: "Projects Delivered" },
              { value: "98%", label: "Client Retention" },
              { value: "24/7", label: "Technical Support" },
              { value: "5.0", label: "Average Rating" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center">
                <p className="text-4xl md:text-5xl lg:text-6xl font-gobold text-acc-orange mb-2">{stat.value}</p>
                <p className="text-text-2 text-sm uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Reviews Section - Light background */}
      <section className="py-24 md:py-32 px-6 bg-[#f5f5f5]">
        <div className="container mx-auto max-w-7xl">
          {/* Section header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex justify-end mb-8">
              <p className="text-right text-black/40 text-sm leading-relaxed max-w-md">
                Customer reviews are a valuable source<br/> of information for both businesses and consumers.
              </p>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-gobold uppercase tracking-tight text-center text-black leading-[1.1]">
              Customer <span className="font-light opacity-60">Voices:</span><br/>
              Hear What <span className="font-light opacity-60">They Say!</span>
            </h2>
          </motion.div>

          {/* Testimonials */}
          <div className="relative max-w-4xl mx-auto">
            {/* Quote icon */}
            <Quote className="w-16 h-16 text-black/10 mx-auto mb-8" />

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mb-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    currentTestimonial === i ? "bg-acc-orange w-8" : "bg-black/20"
                  )}
                />
              ))}
            </div>

            {/* Testimonial content */}
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h4 className="text-xl font-medium text-black mb-2">
                {testimonials[currentTestimonial].name}
              </h4>
              <p className="text-sm uppercase tracking-wider text-black/40 mb-8">
                {testimonials[currentTestimonial].company}
              </p>
              <p className="text-xl md:text-2xl text-black/70 leading-relaxed max-w-3xl mx-auto">
                {testimonials[currentTestimonial].quote}
              </p>
            </motion.div>

            {/* Navigation arrows */}
            <div className="flex justify-center gap-4 mt-12">
              <button
                onClick={() => setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <button
                onClick={() => setCurrentTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <AnimatedSection className="py-24 md:py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <motion.h3 variants={fadeInUp} className="text-3xl md:text-4xl font-gobold uppercase">
              Popular Publications:
            </motion.h3>
            <motion.div variants={fadeInUp}>
              <Link 
                to="/blog" 
                className="flex items-center gap-2 text-text-2 hover:text-text-1 transition-colors group"
              >
                <span>View all</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Link to="/blog" className="group block">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                    <div 
                      className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                      style={{ background: post.image }}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs uppercase tracking-wider text-acc-orange font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-text-2">
                      {post.date}
                    </span>
                  </div>
                  <h4 className="text-xl md:text-2xl font-gobold uppercase group-hover:text-acc-orange transition-colors">
                    {post.title}
                  </h4>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-acc-violet/10 via-bg-0 to-acc-pink/10" />
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-gobold uppercase tracking-tight mb-6 leading-[1.1]">
              Ready to Build<br/>Something <span className="text-acc-orange">Amazing</span>?
            </h2>
            <p className="text-text-2 text-xl mb-10 max-w-2xl mx-auto">
              Let's discuss your vision and create a website that drives real results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-acc-orange hover:bg-acc-orange/90 text-white font-medium px-10 rounded-full h-14 text-lg"
                onClick={() => window.location.href = '/contact'}
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-text-1 hover:bg-white/5 font-medium px-10 rounded-full h-14 text-lg"
                onClick={() => window.location.href = '/clients'}
              >
                View Our Work
              </Button>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10 bg-bg-1/30">
        <div className="container mx-auto max-w-7xl">
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
                <Link to="/services/web-design" className="text-text-2 hover:text-acc-orange transition-colors text-sm">Web Design</Link>
                <Link to="/services/app-development" className="text-text-2 hover:text-acc-orange transition-colors text-sm">App Development</Link>
                <Link to="/services/graphic-design" className="text-text-2 hover:text-acc-orange transition-colors text-sm">Graphic Design</Link>
                <Link to="/services/branding" className="text-text-2 hover:text-acc-orange transition-colors text-sm">Branding</Link>
              </nav>
            </div>
            
            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="font-gobold uppercase text-text-1 text-sm">Company</h3>
              <nav className="flex flex-col gap-3">
                <Link to="/clients" className="text-text-2 hover:text-acc-orange transition-colors text-sm">Portfolio</Link>
                <Link to="/tools" className="text-text-2 hover:text-acc-orange transition-colors text-sm">Free Tools</Link>
                <Link to="/help" className="text-text-2 hover:text-acc-orange transition-colors text-sm">Help Center</Link>
                <Link to="/contact" className="text-text-2 hover:text-acc-orange transition-colors text-sm">Contact</Link>
              </nav>
            </div>
            
            {/* Contact Column */}
            <div className="space-y-4">
              <h3 className="font-gobold uppercase text-text-1 text-sm">Get in Touch</h3>
              <nav className="flex flex-col gap-3">
                <a href="mailto:hello@kamrok.com" className="text-text-2 hover:text-acc-orange transition-colors text-sm">hello@kamrok.com</a>
                <Link to="/portal" className="text-acc-cyan hover:text-acc-cyan/80 transition-colors text-sm font-medium">Client Portal →</Link>
                <Link to="/contact" className="text-acc-orange hover:text-acc-orange/80 transition-colors text-sm font-medium">Start a Project →</Link>
              </nav>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-text-2 text-sm">
            <p>© 2025 KAMROK. Creative agency for brands that want to stand out.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-acc-orange transition-colors">Privacy</a>
              <a href="#" className="hover:text-acc-orange transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
