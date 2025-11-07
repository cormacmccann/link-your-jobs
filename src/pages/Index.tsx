import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

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
              <h1 className="text-2xl font-bold text-foreground">AI Job Sync</h1>
              <p className="text-sm text-muted-foreground">Extract & embed jobs from any career site</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              AI-Powered Job Sync Platform
              <span className="block text-primary mt-2">For Teams & Recruiters</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create an account to save multiple career widgets, sync jobs automatically, and embed them anywhere.
            </p>
            <Button 
              size="lg"
              className="bg-primary hover:bg-accent text-lg px-8 py-6"
              onClick={() => window.location.href = '/auth'}
            >
              Get Started Free
            </Button>
          </div>

          {/* Instructions */}
          <div className="mt-16 bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] border border-border">
            <h3 className="text-2xl font-semibold text-foreground mb-6">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <h4 className="font-semibold text-foreground">Enter Career Page URL</h4>
                <p className="text-sm text-muted-foreground">
                  Paste any job board URL (LinkedIn, Indeed, company career pages) and click "Sync Jobs Now".
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <h4 className="font-semibold text-foreground">AI Extracts Jobs</h4>
                <p className="text-sm text-muted-foreground">
                  Our AI intelligently reads the page and extracts all job listings, titles, locations, and details.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <h4 className="font-semibold text-foreground">Store & Display</h4>
                <p className="text-sm text-muted-foreground">
                  Jobs are saved to your database. Copy the embed code to display them on any website.
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="text-2xl">✨</span> AI-Powered Extraction
              </h4>
              <p className="text-sm text-muted-foreground">
                Unlike traditional scraping that gets blocked, our AI understands page content and intelligently extracts 
                job data from any career site - no matter the structure. Works with LinkedIn, Indeed, and custom career pages.
              </p>
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
