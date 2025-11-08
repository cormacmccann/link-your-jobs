import { Briefcase, Sparkles, Rocket, Code, Palette, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import kamrokLogo from "@/assets/kamrok-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <img src={kamrokLogo} alt="KAMROK" className="h-10" />
            <nav className="hidden md:flex items-center gap-8">
              <a href="#apps" className="text-sm font-medium hover:text-pink-400 transition-colors">
                Apps
              </a>
              <a href="#tools" className="text-sm font-medium hover:text-pink-400 transition-colors">
                Tools
              </a>
              <a href="#cookies" className="text-sm font-medium hover:text-pink-400 transition-colors">
                Cookies
              </a>
              <a href="#widgets" className="text-sm font-medium hover:text-pink-400 transition-colors">
                Widgets
              </a>
              <a href="#services" className="text-sm font-medium text-white/60 hover:text-white/80 transition-colors">
                Services
              </a>
              <a href="#work" className="text-sm font-medium text-white/60 hover:text-white/80 transition-colors">
                Our Work
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-pink-900/60 to-orange-900/80" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            IT DOESN'T TAKE A{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-300 to-purple-300">
              1000
            </span>{" "}
            MONKEYS.
            <br />
            <span className="text-4xl md:text-6xl lg:text-7xl">
              JUST ONE WITH THE RIGHT TOOLKIT.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-4">
            Bold websites, smart marketing, and AI-powered growth strategies that launch your business into orbit.
          </p>
          
          <p className="text-base md:text-lg text-pink-300 italic mb-8">
            fast, friendly, and totally you
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-full font-bold shadow-lg shadow-pink-500/50"
              onClick={() => document.getElementById('toolkit')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Rocket className="w-5 h-5 mr-2" />
              Explore the Toolkit
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-lg px-8 py-6 rounded-full font-bold"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Work With Us
            </Button>
          </div>
        </div>
      </section>

      {/* The Toolkit Section */}
      <section id="toolkit" className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#1a0a1a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Meet the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                KAMROK Toolkit
              </span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Real tools, built by us — not reskinned templates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Apps */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20 p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Apps</h3>
                <p className="text-sm text-white/60 mb-4">Powerful web applications that solve real problems.</p>
                <Button 
                  variant="ghost" 
                  className="text-pink-400 hover:text-pink-300 hover:bg-pink-500/10 p-0 h-auto font-semibold"
                >
                  Explore Apps →
                </Button>
              </div>
            </Card>

            {/* Tools */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-orange-900/20 to-pink-900/20 border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-pink-500/0 group-hover:from-orange-500/10 group-hover:to-pink-500/10 transition-all duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/50">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Tools</h3>
                <p className="text-sm text-white/60 mb-4">Smart utilities that make your workflow faster.</p>
                <Button 
                  variant="ghost" 
                  className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 p-0 h-auto font-semibold"
                >
                  Browse Tools →
                </Button>
              </div>
            </Card>

            {/* Cookies */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-pink-900/20 to-purple-900/20 border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20 p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4 shadow-lg shadow-pink-500/50">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Cookies</h3>
                <p className="text-sm text-white/60 mb-4">Cookie consent and privacy compliance made simple.</p>
                <Button 
                  variant="ghost" 
                  className="text-pink-400 hover:text-pink-300 hover:bg-pink-500/10 p-0 h-auto font-semibold"
                >
                  View Cookies →
                </Button>
              </div>
            </Card>

            {/* Widgets */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-900/20 to-orange-900/20 border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-orange-500/0 group-hover:from-purple-500/10 group-hover:to-orange-500/10 transition-all duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Widgets</h3>
                <p className="text-sm text-white/60 mb-4">Embeddable components for your website.</p>
                <Button 
                  variant="ghost" 
                  className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 p-0 h-auto font-semibold"
                  onClick={() => window.location.href = '/auth'}
                >
                  Get Widgets →
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Build Section */}
      <section className="py-24 bg-[#1a0a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                How We{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
                  Build
                </span>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Every line of code and every pixel is ours. We don't resell templates or slap your logo on someone else's work.
                Everything in the KAMROK Toolkit is coded, designed, and maintained by our own team.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/50">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Original Code</h3>
                <p className="text-sm text-white/60">
                  Written from scratch, optimized for speed and scalability.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Custom Design</h3>
                <p className="text-sm text-white/60">
                  Pixel-perfect interfaces that match your brand.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/50">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
                <p className="text-sm text-white/60">
                  Launch-ready products without the typical agency timeline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-[#1a0a1a] to-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Services
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Beyond the toolkit, we craft bespoke digital experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-all p-6">
              <h3 className="text-2xl font-bold mb-3">Web Design</h3>
              <p className="text-white/60">
                Stunning, conversion-focused websites that tell your story and drive results.
              </p>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-all p-6">
              <h3 className="text-2xl font-bold mb-3">App Development</h3>
              <p className="text-white/60">
                Custom web applications built with modern tech stacks for scale and performance.
              </p>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-all p-6">
              <h3 className="text-2xl font-bold mb-3">Branding</h3>
              <p className="text-white/60">
                Complete brand identities that make you memorable and differentiate you from the noise.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision / CTA Section */}
      <section className="py-32 bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-orange-900/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS00IDRoMnYtMmgtMnYyem0wIDRoMnYtMmgtMnYyem0wIDRoMnYtMmgtMnYyem0wIDRoMnYtMmgtMnYyem0tNCAwaDF2LTJoLTJ2Mmgxem0tNCAwaDF2LTJoLTJ2Mmgxem0tNCAwaDF2LTJoLTJ2Mmgxem0tNCAwaDF2LTJoLTJ2Mmgxem0tNC00aDF2LTJoLTJ2Mmgxem0wLTRoMXYtMmgtMnYyaDF6bTAtNGgxdi0yaC0ydjJoMXptMC00aDF2LTJoLTJ2MmgxeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            The KAMROK Toolkit is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              just the beginning.
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
            We're building a connected ecosystem of tools that make digital work faster, smarter, and more creative.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 text-white text-xl px-12 py-8 rounded-full font-bold shadow-2xl shadow-pink-500/50 hover:shadow-pink-600/60 transition-all"
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
    </div>
  );
};

export default Index;
