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
              <h1 className="text-2xl font-bold text-foreground">Job Listings Manager</h1>
              <p className="text-sm text-muted-foreground">Manage and embed job listings anywhere</p>
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
              Job Listings Manager
              <span className="block text-primary mt-2">Store & Display Anywhere</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Manage your job listings in a centralized database and embed them on any website. 
              Add jobs manually or integrate with job board APIs.
            </p>
          </div>

          {/* Configurator */}
          <EmbedConfigurator />

          {/* Instructions */}
          <div className="mt-16 bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] border border-border">
            <h3 className="text-2xl font-semibold text-foreground mb-6">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <h4 className="font-semibold text-foreground">Enter Source URL</h4>
                <p className="text-sm text-muted-foreground">
                  Add your job board URL as a reference. This helps organize your listings by source.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <h4 className="font-semibold text-foreground">Add Jobs Manually</h4>
                <p className="text-sm text-muted-foreground">
                  Use the manual entry form to add job listings. All data is stored securely in your database.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <h4 className="font-semibold text-foreground">Embed & Display</h4>
                <p className="text-sm text-muted-foreground">
                  Copy the embed code to display your job listings on any website with automatic updates.
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">💡 Why No Automated Scraping?</h4>
              <p className="text-sm text-muted-foreground">
                LinkedIn and Indeed actively block automated scraping to protect their data. The proper way to integrate 
                is through their official APIs (which require API keys and authentication). Manual entry ensures you have 
                full control over your job listings without violating any Terms of Service.
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
