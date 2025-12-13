import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const MetaTagPreview = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const titleLength = title.length;
  const descLength = description.length;
  
  const titleStatus = titleLength === 0 ? "empty" : titleLength > 60 ? "long" : titleLength < 30 ? "short" : "good";
  const descStatus = descLength === 0 ? "empty" : descLength > 160 ? "long" : descLength < 120 ? "short" : "good";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-500";
      case "short": return "text-yellow-500";
      case "long": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  const displayUrl = url || "https://example.com/page";
  const displayTitle = title || "Your Page Title";
  const displayDesc = description || "Your meta description will appear here. Make it compelling to improve click-through rates from search results.";

  const copyMetaTags = () => {
    const tags = `<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${url}">

<!-- Open Graph -->
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">

<!-- Twitter -->
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">`;
    
    navigator.clipboard.writeText(tags);
    setCopied(true);
    toast.success("Meta tags copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/tools" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Meta Tag Preview</h1>
          <p className="text-muted-foreground">See how your page will appear in Google search results</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="title">Page Title</Label>
                  <span className={`text-xs ${getStatusColor(titleStatus)}`}>
                    {titleLength}/60 characters
                  </span>
                </div>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your page title..."
                  maxLength={70}
                />
                {titleStatus === "long" && (
                  <p className="text-xs text-red-500 mt-1">Title may be truncated in search results</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="description">Meta Description</Label>
                  <span className={`text-xs ${getStatusColor(descStatus)}`}>
                    {descLength}/160 characters
                  </span>
                </div>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter your meta description..."
                  rows={3}
                  maxLength={170}
                />
                {descStatus === "long" && (
                  <p className="text-xs text-red-500 mt-1">Description may be truncated in search results</p>
                )}
              </div>

              <div>
                <Label htmlFor="url" className="mb-2 block">Page URL</Label>
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/your-page"
                />
              </div>

              <Button onClick={copyMetaTags} className="w-full">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy Meta Tags
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Google Search Preview</h3>
                <div className="p-4 bg-white rounded-lg border">
                  <div className="text-sm text-green-700 mb-1 truncate">
                    {displayUrl}
                  </div>
                  <h3 className="text-xl text-blue-800 hover:underline cursor-pointer mb-1 line-clamp-1">
                    {displayTitle}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {displayDesc}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">SEO Tips</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Keep titles between 50-60 characters for best display</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Descriptions should be 120-160 characters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Include your main keyword near the beginning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Write compelling copy to improve click-through rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Each page should have unique meta tags</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaTagPreview;
