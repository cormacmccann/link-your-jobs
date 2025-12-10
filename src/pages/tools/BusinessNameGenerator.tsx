import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Sparkles, RefreshCw, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const prefixes = ["Nova", "Apex", "Zen", "Flux", "Pulse", "Core", "Peak", "Edge", "Bold", "Swift", "Bright", "Clear", "Prime", "True", "Pure", "Smart", "Next", "Pro", "Max", "Ultra"];
const suffixes = ["Labs", "Hub", "Co", "HQ", "Works", "Studio", "Digital", "Media", "Tech", "Solutions", "Creative", "Agency", "Group", "Ventures", "Partners", "Collective", "Space", "Zone", "Base", "Point"];
const industryWords: Record<string, string[]> = {
  tech: ["Code", "Byte", "Data", "Cloud", "Cyber", "Logic", "Stack", "Dev", "Net", "Sync"],
  creative: ["Pixel", "Canvas", "Design", "Art", "Color", "Vision", "Create", "Craft", "Story", "Brand"],
  health: ["Vita", "Care", "Well", "Health", "Life", "Fit", "Heal", "Glow", "Pure", "Balance"],
  finance: ["Capital", "Wealth", "Trust", "Fund", "Growth", "Asset", "Profit", "Value", "Equity", "Invest"],
  food: ["Fresh", "Taste", "Flavor", "Kitchen", "Bistro", "Harvest", "Savor", "Spice", "Blend", "Feast"],
  retail: ["Shop", "Store", "Market", "Goods", "Trade", "Style", "Fashion", "Trend", "Select", "Choice"],
};

export default function BusinessNameGenerator() {
  const [keywords, setKeywords] = useState("");
  const [industry, setIndustry] = useState("tech");
  const [names, setNames] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNames = () => {
    setIsGenerating(true);
    const results: string[] = [];
    const words = keywords.split(/[\s,]+/).filter(Boolean);
    const industryTerms = industryWords[industry] || industryWords.tech;
    
    // Generate various combinations
    for (let i = 0; i < 12; i++) {
      const style = i % 6;
      let name = "";
      
      switch (style) {
        case 0: // Prefix + Keyword
          if (words.length > 0) {
            const word = words[Math.floor(Math.random() * words.length)];
            name = prefixes[Math.floor(Math.random() * prefixes.length)] + word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          } else {
            name = prefixes[Math.floor(Math.random() * prefixes.length)] + industryTerms[Math.floor(Math.random() * industryTerms.length)];
          }
          break;
        case 1: // Keyword + Suffix
          if (words.length > 0) {
            const word = words[Math.floor(Math.random() * words.length)];
            name = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() + " " + suffixes[Math.floor(Math.random() * suffixes.length)];
          } else {
            name = industryTerms[Math.floor(Math.random() * industryTerms.length)] + " " + suffixes[Math.floor(Math.random() * suffixes.length)];
          }
          break;
        case 2: // Industry + Suffix
          name = industryTerms[Math.floor(Math.random() * industryTerms.length)] + suffixes[Math.floor(Math.random() * suffixes.length)];
          break;
        case 3: // Prefix + Industry
          name = prefixes[Math.floor(Math.random() * prefixes.length)] + industryTerms[Math.floor(Math.random() * industryTerms.length)];
          break;
        case 4: // Two Keywords combined
          if (words.length >= 2) {
            const w1 = words[Math.floor(Math.random() * words.length)];
            const w2 = words[Math.floor(Math.random() * words.length)];
            name = w1.charAt(0).toUpperCase() + w1.slice(1).toLowerCase() + w2.charAt(0).toUpperCase() + w2.slice(1).toLowerCase();
          } else {
            name = prefixes[Math.floor(Math.random() * prefixes.length)] + " " + suffixes[Math.floor(Math.random() * suffixes.length)];
          }
          break;
        case 5: // Prefix + Suffix
          name = prefixes[Math.floor(Math.random() * prefixes.length)] + " " + suffixes[Math.floor(Math.random() * suffixes.length)];
          break;
      }
      
      if (name && !results.includes(name)) {
        results.push(name);
      }
    }
    
    setTimeout(() => {
      setNames(results);
      setIsGenerating(false);
    }, 500);
  };

  const copyName = (name: string, index: number) => {
    navigator.clipboard.writeText(name);
    setCopiedIndex(index);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/tools" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tools
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Business Name Generator</h1>
            <p className="text-muted-foreground">Get creative name ideas for your new venture</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Generate Names</CardTitle>
              <CardDescription>Enter keywords and select your industry to generate name ideas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords (optional)</Label>
                <Input
                  id="keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g., fast, green, smart, cloud"
                />
                <p className="text-xs text-muted-foreground">Separate multiple keywords with commas or spaces</p>
              </div>

              <div className="space-y-2">
                <Label>Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="creative">Creative / Design</SelectItem>
                    <SelectItem value="health">Health & Wellness</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="food">Food & Beverage</SelectItem>
                    <SelectItem value="retail">Retail / E-commerce</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={generateNames} className="w-full" disabled={isGenerating}>
                {isGenerating ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                Generate Names
              </Button>
            </CardContent>
          </Card>

          {names.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Name Ideas</CardTitle>
                  <Button variant="ghost" size="sm" onClick={generateNames}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {names.map((name, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <span className="font-medium">{name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyName(name, index)}
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <p className="text-center text-sm text-muted-foreground mt-8">
            Tip: Check domain availability and trademark status before committing to a name
          </p>
        </div>
      </div>
    </div>
  );
}
