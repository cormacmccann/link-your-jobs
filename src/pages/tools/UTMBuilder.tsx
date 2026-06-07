import { useState } from "react";
import { Link } from "react-router-dom";
import { Link2, Copy, Check, ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlowCard } from "@/components/ui/GlowCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import kamrokLogo from "/kamrok-logo.png";

const UTMBuilder = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  const commonSources = [
    { value: "google", label: "Google" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "twitter", label: "Twitter/X" },
    { value: "tiktok", label: "TikTok" },
    { value: "email", label: "Email" },
    { value: "newsletter", label: "Newsletter" },
  ];

  const commonMediums = [
    { value: "cpc", label: "CPC (Paid Search)" },
    { value: "social", label: "Social" },
    { value: "email", label: "Email" },
    { value: "organic", label: "Organic" },
    { value: "referral", label: "Referral" },
    { value: "display", label: "Display" },
    { value: "affiliate", label: "Affiliate" },
  ];

  const generateUrl = () => {
    if (!baseUrl) return "";
    
    try {
      const url = new URL(baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`);
      
      if (source) url.searchParams.set("utm_source", source);
      if (medium) url.searchParams.set("utm_medium", medium);
      if (campaign) url.searchParams.set("utm_campaign", campaign);
      if (term) url.searchParams.set("utm_term", term);
      if (content) url.searchParams.set("utm_content", content);
      
      return url.toString();
    } catch {
      return "";
    }
  };

  const generatedUrl = generateUrl();

  const copyToClipboard = async () => {
    if (!generatedUrl) {
      toast.error("Enter a URL first");
      return;
    }
    
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      toast.success("URL copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  const FieldLabel = ({ label, tooltip }: { label: string; tooltip: string }) => (
    <div className="flex items-center gap-2 mb-2">
      <Label className="text-text-1 font-medium">{label}</Label>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="w-4 h-4 text-text-2 cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-0/80 backdrop-blur-xl border-b border-border-1">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={kamrokLogo} alt="KAMROK" className="h-8 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-text-2 hover:text-text-1 transition-colors text-sm">Home</Link>
            <Link to="/tools" className="text-accent-violet font-medium text-sm">Free Tools</Link>
            <Link to="/services/web-design" className="text-text-2 hover:text-text-1 transition-colors text-sm">Services</Link>
            <Link to="/contact" className="text-text-2 hover:text-text-1 transition-colors text-sm">Contact</Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Back Link */}
          <Link to="/tools" className="inline-flex items-center gap-2 text-text-2 hover:text-accent-violet transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tools</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center">
              <Link2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight mb-2">
              UTM Builder
            </h1>
            <p className="text-text-2">Create trackable campaign URLs for Google Analytics</p>
          </div>

          {/* Tool Interface */}
          <GlowCard glowColor="purple" customSize className="p-6 md:p-8">
            <div className="space-y-6">
              {/* Base URL */}
              <div>
                <FieldLabel 
                  label="Website URL *" 
                  tooltip="The full URL of the page you want to link to" 
                />
                <Input
                  type="url"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://example.com/landing-page"
                  className="bg-bg-1 border-border-1"
                />
              </div>

              {/* Source */}
              <div>
                <FieldLabel 
                  label="Campaign Source *" 
                  tooltip="Where the traffic is coming from (e.g., google, facebook, newsletter)" 
                />
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value.toLowerCase().replace(/\s/g, "_"))}
                    placeholder="e.g., google, facebook, newsletter"
                    className="flex-1 bg-bg-1 border-border-1"
                  />
                  <Select onValueChange={(v) => setSource(v)}>
                    <SelectTrigger className="w-[140px] bg-bg-1 border-border-1">
                      <SelectValue placeholder="Quick pick" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonSources.map((s) => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Medium */}
              <div>
                <FieldLabel 
                  label="Campaign Medium *" 
                  tooltip="The marketing medium (e.g., cpc, email, social)" 
                />
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={medium}
                    onChange={(e) => setMedium(e.target.value.toLowerCase().replace(/\s/g, "_"))}
                    placeholder="e.g., cpc, email, social"
                    className="flex-1 bg-bg-1 border-border-1"
                  />
                  <Select onValueChange={(v) => setMedium(v)}>
                    <SelectTrigger className="w-[140px] bg-bg-1 border-border-1">
                      <SelectValue placeholder="Quick pick" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonMediums.map((m) => (
                        <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Campaign */}
              <div>
                <FieldLabel 
                  label="Campaign Name *" 
                  tooltip="The name of your campaign (e.g., spring_sale, product_launch)" 
                />
                <Input
                  type="text"
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value.toLowerCase().replace(/\s/g, "_"))}
                  placeholder="e.g., spring_sale, product_launch"
                  className="bg-bg-1 border-border-1"
                />
              </div>

              {/* Term (Optional) */}
              <div>
                <FieldLabel 
                  label="Campaign Term (Optional)" 
                  tooltip="Used for paid search keywords" 
                />
                <Input
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value.toLowerCase().replace(/\s/g, "+"))}
                  placeholder="e.g., running+shoes"
                  className="bg-bg-1 border-border-1"
                />
              </div>

              {/* Content (Optional) */}
              <div>
                <FieldLabel 
                  label="Campaign Content (Optional)" 
                  tooltip="Differentiate between similar content or links (e.g., logo_link, text_link)" 
                />
                <Input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value.toLowerCase().replace(/\s/g, "_"))}
                  placeholder="e.g., logo_link, header_cta"
                  className="bg-bg-1 border-border-1"
                />
              </div>
            </div>

            {/* Generated URL */}
            {generatedUrl && (
              <div className="mt-8 pt-8 border-t border-border-1">
                <Label className="text-text-1 font-medium mb-2 block">Generated URL</Label>
                <div className="relative">
                  <div className="bg-bg-1 border border-border-1 rounded-lg p-4 pr-12 font-mono text-sm break-all text-accent-cyan">
                    {generatedUrl}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={copyToClipboard}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <Button
                  onClick={copyToClipboard}
                  className="w-full mt-4 bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 text-white font-gobold uppercase"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy URL to Clipboard
                </Button>
              </div>
            )}
          </GlowCard>

          {/* What are UTMs */}
          <div className="mt-8 p-6 bg-bg-1/50 rounded-xl border border-border-1">
            <h3 className="font-gobold uppercase text-text-1 mb-3">What are UTM Parameters?</h3>
            <p className="text-sm text-text-2 mb-4">
              UTM parameters are tags added to your URLs that help you track where your website traffic 
              comes from in Google Analytics. They're essential for measuring marketing campaign effectiveness.
            </p>
            <ul className="space-y-2 text-sm text-text-2">
              <li><strong className="text-text-1">utm_source:</strong> The referrer (e.g., google, facebook)</li>
              <li><strong className="text-text-1">utm_medium:</strong> Marketing medium (e.g., cpc, email, social)</li>
              <li><strong className="text-text-1">utm_campaign:</strong> Product, promo code, or campaign name</li>
              <li><strong className="text-text-1">utm_term:</strong> Identify paid search keywords</li>
              <li><strong className="text-text-1">utm_content:</strong> Differentiate similar content/links</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-text-2 mb-4">Need help with your marketing strategy?</p>
            <Button asChild className="bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 text-white font-gobold uppercase">
              <Link to="/contact">Get a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UTMBuilder;
