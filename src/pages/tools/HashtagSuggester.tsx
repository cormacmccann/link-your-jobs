import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Hash, Copy, RefreshCw, Check } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const hashtagDatabase: Record<string, string[]> = {
  general: ["trending", "viral", "fyp", "explore", "instagood", "photooftheday", "love", "follow", "instadaily", "picoftheday"],
  business: ["entrepreneur", "business", "success", "motivation", "startup", "smallbusiness", "hustle", "goals", "growth", "mindset", "leadership", "businessowner", "ceo", "marketing", "sales"],
  tech: ["technology", "tech", "coding", "programming", "developer", "software", "ai", "innovation", "digital", "data", "startup", "cybersecurity", "webdevelopment", "machinelearning", "cloud"],
  marketing: ["digitalmarketing", "marketing", "socialmedia", "branding", "contentmarketing", "seo", "advertising", "marketingtips", "socialmediamarketing", "growthhacking", "emailmarketing", "influencer"],
  design: ["design", "graphicdesign", "uidesign", "uxdesign", "webdesign", "creative", "art", "designer", "creativity", "illustration", "logo", "brandidentity", "typography", "dribbble", "behance"],
  photography: ["photography", "photo", "photographer", "photooftheday", "naturephotography", "portrait", "landscape", "streetphotography", "travel", "canon", "nikon", "lightroom", "photoshoot", "visualart"],
  fitness: ["fitness", "gym", "workout", "fitnessmotivation", "health", "training", "bodybuilding", "fit", "exercise", "healthylifestyle", "fitfam", "nutrition", "wellness", "crossfit", "yoga"],
  food: ["food", "foodie", "foodporn", "instafood", "foodphotography", "cooking", "homemade", "delicious", "recipe", "yummy", "healthyfood", "vegan", "foodblogger", "chef", "dinner"],
  travel: ["travel", "wanderlust", "travelgram", "adventure", "explore", "vacation", "travelphotography", "instatravel", "tourism", "roadtrip", "nature", "beach", "mountains", "backpacking", "travelblogger"],
  fashion: ["fashion", "style", "ootd", "fashionblogger", "instafashion", "streetstyle", "fashionista", "outfit", "mensfashion", "womensfashion", "luxury", "beauty", "model", "shopping", "trends"],
  realestate: ["realestate", "realtor", "property", "home", "househunting", "forsale", "dreamhome", "investment", "architecture", "interiordesign", "homedesign", "luxuryhomes", "newhome", "mortgage"],
};

const sizeModifiers: Record<string, string[]> = {
  niche: ["tips", "community", "daily", "life", "lover", "world", "style", "goals", "vibes", "mood"],
  location: ["ireland", "dublin", "uk", "london", "usa", "europe", "worldwide", "local"],
};

export default function HashtagSuggester() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("general");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateHashtags = () => {
    setIsGenerating(true);
    
    const baseHashtags = hashtagDatabase[category] ?? hashtagDatabase["general"] ?? [];
    const results = new Set<string>();
    
    // Add keyword-based hashtags
    if (keyword.trim()) {
      const keywords = keyword.toLowerCase().split(/[\s,]+/).filter(Boolean);
      keywords.forEach(kw => {
        results.add(kw.replace(/[^a-z0-9]/g, ""));
        // Add variations
        (sizeModifiers["niche"] ?? []).forEach(mod => {
          if (Math.random() > 0.6) {
            results.add(kw.replace(/[^a-z0-9]/g, "") + mod);
          }
        });
      });
    }
    
    // Add category hashtags (randomly select subset)
    const shuffled = [...baseHashtags].sort(() => Math.random() - 0.5);
    shuffled.slice(0, 15).forEach(tag => results.add(tag));
    
    // Add some general engagement hashtags
    const generalTags = hashtagDatabase["general"] ?? [];
    generalTags.slice(0, 5).forEach(tag => {
      if (Math.random() > 0.5) results.add(tag);
    });
    
    setTimeout(() => {
      setHashtags(Array.from(results).slice(0, 30));
      setIsGenerating(false);
    }, 500);
  };

  const copyAll = () => {
    const text = hashtags.map(h => `#${h}`).join(" ");
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("All hashtags copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const copyHashtag = (tag: string) => {
    navigator.clipboard.writeText(`#${tag}`);
    toast.success(`Copied #${tag}`);
  };

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter(h => h !== tag));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/tools" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tools
        </Link>

        <div className="w-full mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Hashtag Suggester</h1>
            <p className="text-muted-foreground">Generate relevant hashtags for your social media posts</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Generate Hashtags</CardTitle>
              <CardDescription>Enter keywords and select a category to get suggestions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keyword">Keywords</Label>
                <Input
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g., web design, Dublin, startup"
                />
                <p className="text-xs text-muted-foreground">Separate multiple keywords with commas</p>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="photography">Photography</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="realestate">Real Estate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={generateHashtags} className="w-full" disabled={isGenerating}>
                {isGenerating ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Hash className="w-4 h-4 mr-2" />
                )}
                Generate Hashtags
              </Button>
            </CardContent>
          </Card>

          {hashtags.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Hashtags</CardTitle>
                    <CardDescription>{hashtags.length} hashtags • Click to copy, double-click to remove</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={generateHashtags}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                    <Button size="sm" onClick={copyAll}>
                      {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      Copy All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {hashtags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-sm py-1.5 px-3"
                      onClick={() => copyHashtag(tag)}
                      onDoubleClick={() => removeHashtag(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">Copy-ready format:</p>
                  <p className="text-sm text-muted-foreground break-all">
                    {hashtags.map(h => `#${h}`).join(" ")}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Hashtag Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Instagram allows up to 30 hashtags per post</p>
              <p>• Mix popular and niche hashtags for better reach</p>
              <p>• Avoid banned or spam-flagged hashtags</p>
              <p>• Use relevant hashtags that match your content</p>
              <p>• Update your hashtag strategy regularly</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
