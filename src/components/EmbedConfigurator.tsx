import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { JobsDisplay } from "./JobsDisplay";
import { SyncJobsButton } from "./SyncJobsButton";
import { ManualJobEntry } from "./ManualJobEntry";

export const EmbedConfigurator = () => {
  const { toast } = useToast();
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const generateEmbedCode = () => {
    if (!linkedInUrl) return "";
    
    // Generate embed code that points to our app with the LinkedIn URL as a parameter
    const embedUrl = `${window.location.origin}/?linkedin=${encodeURIComponent(linkedInUrl)}`;
    
    return `<iframe 
  src="${embedUrl}" 
  width="100%" 
  height="800px" 
  frameborder="0" 
  allowfullscreen
  title="LinkedIn Careers Widget">
</iframe>`;
  };

  const embedCode = generateEmbedCode();

  const handleCopy = async () => {
    if (!embedCode) {
      toast({
        title: "No code to copy",
        description: "Please enter a LinkedIn URL first",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Embed code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Configuration Panel */}
      <Card className="p-6 space-y-6 shadow-[var(--shadow-card)] border-border">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Configure Your Jobs Feed</h2>
            <p className="text-muted-foreground">Enter your source URL to manage job listings</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin-url" className="text-foreground">
              Source URL (LinkedIn, Indeed, or Custom)
            </Label>
            <div className="relative">
              <Input
                id="linkedin-url"
                type="url"
                placeholder="https://www.linkedin.com/company/your-company/jobs/"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
                className="pr-10 transition-[var(--transition-smooth)] focus:ring-2 focus:ring-primary"
              />
              <ExternalLink className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              Note: LinkedIn and Indeed block automated scraping. Use manual entry below.
            </p>
          </div>
        </div>

        {/* Embed Code Display */}
        <div className="space-y-2">
          <Label className="text-foreground">Embed Code</Label>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm text-foreground border border-border">
              <code>{embedCode || "// Configure your embed to generate code"}</code>
            </pre>
            <Button
              size="sm"
              onClick={handleCopy}
              disabled={!embedCode}
              className="absolute top-2 right-2 bg-primary hover:bg-accent transition-[var(--transition-smooth)]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Manual Job Entry */}
      <ManualJobEntry linkedinUrl={linkedInUrl} />

      {/* Jobs Display */}
      <Card className="p-6 shadow-[var(--shadow-card)] border-border">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Synced Jobs</h2>
          <p className="text-muted-foreground">Jobs pulled from LinkedIn and stored in your database</p>
        </div>
        
        <JobsDisplay linkedinUrl={linkedInUrl} />
      </Card>
    </div>
  );
};
