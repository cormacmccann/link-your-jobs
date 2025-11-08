import { Briefcase, Sparkles, Rocket, Code, Palette, Zap, Menu, X, Grid3x3, Wrench, Cookie, LayoutGrid, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import kamrokLogo from "@/assets/kamrok-logo.png";
import { useState, useRef, useEffect } from "react";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const portfolioItems = [
    {
      title: "Job Board Widget",
      category: "Widget",
      description: "AI-powered job extraction and embedding",
      gradient: "from-purple-500 to-pink-500",
      icon: Briefcase
    },
    {
      title: "Cookie Scanner",
      category: "Tool",
      description: "Automated cookie compliance scanning",
      gradient: "from-pink-500 to-orange-500",
      icon: Cookie
    },
    {
      title: "Policy Generator",
      category: "AI Tool",
      description: "Generate legal policies with AI",
      gradient: "from-orange-500 to-purple-500",
      icon: Sparkles
    },
    {
      title: "Analytics Dashboard",
      category: "App",
      description: "Real-time performance tracking",
      gradient: "from-purple-500 to-blue-500",
      icon: Grid3x3
    },
    {
      title: "Content Studio",
      category: "Tool",
      description: "AI-powered content creation",
      gradient: "from-blue-500 to-pink-500",
      icon: Zap
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left Menu - Desktop */}
            <nav className="hidden lg:flex items-center gap-6 flex-1">
              <a href="#apps" className="text-sm font-gobold uppercase tracking-tight hover:text-pink-400 transition-colors flex items-center gap-2">
                <Grid3x3 className="w-4 h-4" />
                Apps
              </a>
              <a href="#tools" className="text-sm font-gobold uppercase tracking-tight hover:text-pink-400 transition-colors flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Tools
              </a>
              <a href="#cookies" className="text-sm font-gobold uppercase tracking-tight hover:text-pink-400 transition-colors flex items-center gap-2">
                <Cookie className="w-4 h-4" />
                Cookies
              </a>
              <a href="#widgets" className="text-sm font-gobold uppercase tracking-tight hover:text-pink-400 transition-colors flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" />
                Widgets
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-black border-white/10 text-white w-[300px]">
                <div className="flex flex-col gap-6 mt-8">
                  <a href="#apps" onClick={() => setMobileMenuOpen(false)} className="text-lg font-gobold uppercase tracking-tight hover:text-pink-400 transition-colors flex items-center gap-3">
                    <Grid3x3 className="w-5 h-5" />
                    Apps
                  </a>
                  <a href="#tools" onClick={() => setMobileMenuOpen(false)} className="text-lg font-gobold uppercase tracking-tight hover:text-pink-400 transition-colors flex items-center gap-3">
                    <Wrench className="w-5 h-5" />
                    Tools
                  </a>
                  <a href="#cookies" onClick={() => setMobileMenuOpen(false)} className="text-lg font-gobold uppercase tracking-tight hover:text-pink-400 transition-colors flex items-center gap-3">
                    <Cookie className="w-5 h-5" />
                    Cookies
                  </a>
                  <a href="#widgets" onClick={() => setMobileMenuOpen(false)} className="text-lg font-gobold uppercase tracking-tight hover:text-pink-400 transition-colors flex items-center gap-3">
                    <LayoutGrid className="w-5 h-5" />
                    Widgets
                  </a>
                  <div className="border-t border-white/10 pt-6">
                    <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-lg font-gobold uppercase tracking-tight text-white/60 hover:text-white/80 transition-colors flex items-center gap-3 mb-4">
                      <Sparkles className="w-5 h-5" />
                      Services
                    </a>
                    <a href="#work" onClick={() => setMobileMenuOpen(false)} className="text-lg font-gobold uppercase tracking-tight text-white/60 hover:text-white/80 transition-colors flex items-center gap-3 mb-4">
                      <Briefcase className="w-5 h-5" />
                      Our Work
                    </a>
                    <Button 
                      variant="outline"
                      className="border-pink-500/50 text-pink-400 hover:bg-pink-500/10 hover:border-pink-500 font-gobold uppercase w-full"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        window.location.href = '/auth';
                      }}
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Centered Logo */}
            <div className="flex-shrink-0 absolute left-1/2 transform -translate-x-1/2">
              <img src={kamrokLogo} alt="KAMROK" className="h-14 md:h-16" />
            </div>

            {/* Right Menu - Desktop */}
            <nav className="hidden lg:flex items-center gap-6 flex-1 justify-end">
              <a href="#services" className="text-sm font-gobold uppercase tracking-tight text-white/60 hover:text-white/80 transition-colors flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Services
              </a>
              <a href="#work" className="text-sm font-gobold uppercase tracking-tight text-white/60 hover:text-white/80 transition-colors flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Our Work
              </a>
              <Button 
                variant="outline"
                size="sm"
                className="border-pink-500/50 text-pink-400 hover:bg-pink-500/10 hover:border-pink-500 font-gobold uppercase tracking-tight"
                onClick={() => window.location.href = '/auth'}
              >
                Login
              </Button>
            </nav>

            {/* Spacer for mobile to balance centered logo */}
            <div className="lg:hidden w-10"></div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 bg-[#0a0a0a]">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="mb-6">
            <span className="text-sm font-gobold uppercase tracking-wider text-pink-400/80 mb-4 inline-block">
              Official Gold Partner of Lovable
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-gobold mb-6 leading-none uppercase tracking-tighter"
              style={{ textShadow: '0 0 40px rgba(236, 72, 153, 0.3)' }}>
            THE PARTNER FOR{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-300 to-purple-300"
                  style={{ textShadow: '0 0 60px rgba(236, 72, 153, 0.6)' }}>
              FOUNDERS
            </span>
            <br />
            BUILDING PRODUCTS WITH AI
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8 leading-relaxed">
            The #1 AI product studio - trusted by startups and founders to design, build, and launch products that scale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-base md:text-lg px-8 py-6 rounded-full font-gobold uppercase tracking-tight shadow-lg shadow-pink-500/50"
              onClick={() => window.location.href = '/auth'}
            >
              Book a Call
            </Button>
            <Button 
              size="lg"
              variant="ghost"
              className="text-white hover:text-pink-400 text-base md:text-lg px-8 py-6 font-gobold uppercase tracking-tight"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Scrolling Portfolio Cards */}
      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-4 mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-gobold uppercase mb-2 tracking-tight"
                  style={{ textShadow: '0 0 30px rgba(236, 72, 153, 0.3)' }}>
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  Toolkit
                </span>
              </h2>
              <p className="text-white/60">Scroll to explore our products</p>
            </div>
            <div className="hidden md:flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="border-white/20 hover:border-pink-500/50 hover:bg-pink-500/10"
                onClick={() => scroll('left')}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-white/20 hover:border-pink-500/50 hover:bg-pink-500/10"
                onClick={() => scroll('right')}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-6 px-4 md:px-12 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {portfolioItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="group relative flex-shrink-0 snap-center"
                style={{ 
                  width: '380px',
                  perspective: '1000px'
                }}
              >
                <div 
                  className="relative h-[520px] rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    transform: 'rotateY(-5deg) rotateX(2deg)',
                    transformStyle: 'preserve-3d',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {/* Card Background with Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  
                  {/* Pattern Overlay */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                      backgroundSize: '32px 32px'
                    }}
                  />

                  {/* Icon */}
                  <div className="absolute top-8 left-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="mb-2">
                      <span className="text-xs font-gobold uppercase tracking-wider text-pink-400/80">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-3xl font-gobold uppercase mb-3 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/70 mb-6">
                      {item.description}
                    </p>
                    <Button 
                      variant="ghost" 
                      className="text-pink-400 hover:text-pink-300 hover:bg-pink-500/10 p-0 h-auto font-gobold uppercase tracking-tight group"
                    >
                      Explore
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>

                  {/* Glow Effect */}
                  <div 
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${item.gradient} blur-3xl`}
                    style={{ transform: 'translateZ(-50px)' }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile scroll hint */}
        <div className="md:hidden text-center mt-6">
          <p className="text-sm text-white/40">← Swipe to explore →</p>
        </div>
      </section>

      {/* How We Build Section */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#1a0a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-gobold uppercase mb-6 tracking-tight"
                  style={{ textShadow: '0 0 30px rgba(251, 146, 60, 0.3)' }}>
                How We{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400"
                      style={{ textShadow: '0 0 40px rgba(251, 146, 60, 0.4)' }}>
                  Build
                </span>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Every line of code and every pixel is ours. We don't resell templates or slap your logo on someone else's work.
                Everything in the KAMROK Toolkit is coded, designed, and maintained by our own team.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center group">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/50 group-hover:scale-110 transition-transform">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-gobold uppercase mb-2 tracking-tight">Original Code</h3>
                <p className="text-sm text-white/60">
                  Written from scratch, optimized for speed and scalability.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-gobold uppercase mb-2 tracking-tight">Custom Design</h3>
                <p className="text-sm text-white/60">
                  Pixel-perfect interfaces that match your brand.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/50 group-hover:scale-110 transition-transform">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-gobold uppercase mb-2 tracking-tight">Fast Delivery</h3>
                <p className="text-sm text-white/60">
                  Launch-ready products without the typical agency timeline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#1a0a1a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-gobold uppercase mb-4 tracking-tight"
                style={{ textShadow: '0 0 30px rgba(236, 72, 153, 0.3)' }}>
              Services
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Beyond the toolkit, we craft bespoke digital experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white/5 border-white/10 hover:border-pink-500/30 transition-all p-8 hover:shadow-xl hover:shadow-pink-500/10">
              <h3 className="text-2xl font-gobold uppercase mb-3 tracking-tight">Web Design</h3>
              <p className="text-white/60">
                Stunning, conversion-focused websites that tell your story and drive results.
              </p>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:border-purple-500/30 transition-all p-8 hover:shadow-xl hover:shadow-purple-500/10">
              <h3 className="text-2xl font-gobold uppercase mb-3 tracking-tight">App Development</h3>
              <p className="text-white/60">
                Custom web applications built with modern tech stacks for scale and performance.
              </p>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:border-orange-500/30 transition-all p-8 hover:shadow-xl hover:shadow-orange-500/10">
              <h3 className="text-2xl font-gobold uppercase mb-3 tracking-tight">Branding</h3>
              <p className="text-white/60">
                Complete brand identities that make you memorable and differentiate you from the noise.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-orange-900/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS00IDRoMnYtMmgtMnYyem0wIDRoMnYtMmgtMnYyem0wIDRoMnYtMmgtMnYyem0wIDRoMnYtMmgtMnYyem0tNCAwaDF2LTJoLTJ2Mmgxem0tNCAwaDF2LTJoLTJ2Mmgxem0tNCAwaDF2LTJoLTJ2Mmgxem0tNCAwaDF2LTJoLTJ2Mmgxem0tNC00aDF2LTJoLTJ2Mmgxem0wLTRoMXYtMmgtMnYyaDF6bTAtNGgxdi0yaC0ydjJoMXptMC00aDF2LTJoLTJ2MmgxeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-gobold uppercase mb-6 tracking-tight"
              style={{ textShadow: '0 0 40px rgba(236, 72, 153, 0.4)' }}>
            The KAMROK Toolkit is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
                  style={{ textShadow: '0 0 50px rgba(236, 72, 153, 0.6)' }}>
              just the beginning.
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
            We're building a connected ecosystem of tools that make digital work faster, smarter, and more creative.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 text-white text-xl px-12 py-8 rounded-full font-gobold uppercase tracking-tight shadow-2xl shadow-pink-500/50 hover:shadow-pink-600/60 transition-all"
          >
            <Rocket className="w-6 h-6 mr-3" />
            Join Our Orbit
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <img src={kamrokLogo} alt="KAMROK" className="h-8 opacity-60" />
            <p className="text-white/40 text-sm">
              Built with modern web technologies for seamless integration
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Index;
