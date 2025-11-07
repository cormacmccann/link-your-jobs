import { EmbedConfigurator } from "@/components/EmbedConfigurator";
import { Briefcase } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-elegant)]">
              <Briefcase className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">LinkedIn Careers Embed</h1>
              <p className="text-sm text-muted-foreground">Embed LinkedIn careers on any website</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Embed LinkedIn Careers
              <span className="block text-primary mt-2">Anywhere You Want</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Generate customizable embed codes for LinkedIn career pages. 
              Perfect for company websites, job boards, and recruitment portals.
            </p>
          </div>

          {/* Configurator */}
          <EmbedConfigurator />

          {/* Instructions */}
          <div className="mt-16 bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] border border-border">
            <h3 className="text-2xl font-semibold text-foreground mb-6">How to Use</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <h4 className="font-semibold text-foreground">Enter LinkedIn URL</h4>
                <p className="text-sm text-muted-foreground">
                  Paste your company's LinkedIn careers page URL into the input field.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <h4 className="font-semibold text-foreground">Customize Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Adjust the width and height to fit your website's layout perfectly.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <h4 className="font-semibold text-foreground">Copy & Embed</h4>
                <p className="text-sm text-muted-foreground">
                  Copy the generated code and paste it into your website's HTML.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Built with modern web technologies for seamless integration</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
