import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const EmbedConfigurator = () => {
  const { toast } = useToast();
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [width, setWidth] = useState("100%");
  const [height, setHeight] = useState("600");
  const [copied, setCopied] = useState(false);

  const generateEmbedCode = () => {
    if (!linkedInUrl) return "";
    
    return `<iframe 
  src="${linkedInUrl}" 
  width="${width}" 
  height="${height}px" 
  frameborder="0" 
  allowfullscreen
  title="LinkedIn Careers">
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
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Configuration Panel */}
      <Card className="p-6 space-y-6 shadow-[var(--shadow-card)] border-border">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Configure Your Embed</h2>
          <p className="text-muted-foreground">Customize your LinkedIn careers widget</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin-url" className="text-foreground">
              LinkedIn Careers URL
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
              Enter your company's LinkedIn careers page URL
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width" className="text-foreground">
                Width
              </Label>
              <Input
                id="width"
                type="text"
                placeholder="100%"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="transition-[var(--transition-smooth)]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height" className="text-foreground">
                Height (px)
              </Label>
              <Input
                id="height"
                type="number"
                placeholder="600"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="transition-[var(--transition-smooth)]"
              />
            </div>
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

      {/* Preview Panel */}
      <Card className="p-6 space-y-4 shadow-[var(--shadow-card)] border-border">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Live Preview</h2>
          <p className="text-muted-foreground">See how your embed will look</p>
        </div>

        <div className="border-2 border-dashed border-border rounded-lg p-4 min-h-[500px] bg-muted/30">
          {linkedInUrl ? (
            <iframe
              src={linkedInUrl}
              width={width}
              height={`${height}px`}
              frameBorder="0"
              allowFullScreen
              title="LinkedIn Careers Preview"
              className="w-full rounded-md"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-center">
                Enter a LinkedIn URL to see the preview
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
