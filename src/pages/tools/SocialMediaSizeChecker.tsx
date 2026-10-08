import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SizeSpec {
  name: string;
  width: number;
  height: number;
  ratio?: string;
  notes?: string;
}

interface PlatformData {
  name: string;
  color: string;
  sizes: SizeSpec[];
}

const platforms: Record<string, PlatformData> = {
  instagram: {
    name: "Instagram",
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    sizes: [
      { name: "Square Post", width: 1080, height: 1080, ratio: "1:1" },
      { name: "Portrait Post", width: 1080, height: 1350, ratio: "4:5" },
      { name: "Landscape Post", width: 1080, height: 566, ratio: "1.91:1" },
      { name: "Story / Reel", width: 1080, height: 1920, ratio: "9:16" },
      { name: "Profile Picture", width: 320, height: 320, ratio: "1:1" },
      { name: "Carousel", width: 1080, height: 1080, ratio: "1:1", notes: "Up to 10 images" },
    ],
  },
  facebook: {
    name: "Facebook",
    color: "bg-blue-600",
    sizes: [
      { name: "Feed Image", width: 1200, height: 630, ratio: "1.91:1" },
      { name: "Square Post", width: 1200, height: 1200, ratio: "1:1" },
      { name: "Story", width: 1080, height: 1920, ratio: "9:16" },
      { name: "Cover Photo", width: 820, height: 312, notes: "Displays at 820x312 on desktop" },
      { name: "Profile Picture", width: 170, height: 170, ratio: "1:1" },
      { name: "Event Cover", width: 1920, height: 1005, ratio: "1.91:1" },
    ],
  },
  tiktok: {
    name: "TikTok",
    color: "bg-black",
    sizes: [
      { name: "Video", width: 1080, height: 1920, ratio: "9:16" },
      { name: "Profile Picture", width: 200, height: 200, ratio: "1:1" },
      { name: "Thumbnail", width: 1080, height: 1920, ratio: "9:16" },
    ],
  },
  twitter: {
    name: "X (Twitter)",
    color: "bg-black",
    sizes: [
      { name: "Single Image", width: 1200, height: 675, ratio: "16:9" },
      { name: "Two Images", width: 700, height: 800, ratio: "7:8" },
      { name: "Header Image", width: 1500, height: 500, ratio: "3:1" },
      { name: "Profile Picture", width: 400, height: 400, ratio: "1:1" },
      { name: "Card Image", width: 800, height: 418, ratio: "1.91:1" },
    ],
  },
  linkedin: {
    name: "LinkedIn",
    color: "bg-blue-700",
    sizes: [
      { name: "Feed Image", width: 1200, height: 627, ratio: "1.91:1" },
      { name: "Square Post", width: 1200, height: 1200, ratio: "1:1" },
      { name: "Cover Photo", width: 1584, height: 396, ratio: "4:1" },
      { name: "Profile Picture", width: 400, height: 400, ratio: "1:1" },
      { name: "Company Logo", width: 300, height: 300, ratio: "1:1" },
      { name: "Article Cover", width: 744, height: 400 },
    ],
  },
  youtube: {
    name: "YouTube",
    color: "bg-red-600",
    sizes: [
      { name: "Thumbnail", width: 1280, height: 720, ratio: "16:9" },
      { name: "Channel Banner", width: 2560, height: 1440, notes: "Safe area: 1546x423" },
      { name: "Profile Picture", width: 800, height: 800, ratio: "1:1" },
      { name: "Video", width: 1920, height: 1080, ratio: "16:9" },
      { name: "Shorts", width: 1080, height: 1920, ratio: "9:16" },
    ],
  },
  pinterest: {
    name: "Pinterest",
    color: "bg-red-500",
    sizes: [
      { name: "Pin Image", width: 1000, height: 1500, ratio: "2:3" },
      { name: "Square Pin", width: 1000, height: 1000, ratio: "1:1" },
      { name: "Long Pin", width: 1000, height: 2100, ratio: "1:2.1", notes: "Max ratio 1:2.1" },
      { name: "Profile Picture", width: 165, height: 165, ratio: "1:1" },
      { name: "Board Cover", width: 222, height: 150 },
    ],
  },
};

export default function SocialMediaSizeChecker() {
  const [copiedSize, setCopiedSize] = useState<string | null>(null);

  const copySize = (spec: SizeSpec) => {
    const text = `${spec.width} x ${spec.height}`;
    navigator.clipboard.writeText(text);
    setCopiedSize(`${spec.name}-${spec.width}`);
    toast.success(`Copied: ${text}`);
    setTimeout(() => setCopiedSize(null), 2000);
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
            <h1 className="text-3xl font-bold mb-2">Social Media Size Checker</h1>
            <p className="text-muted-foreground">Quick reference for image and video dimensions</p>
          </div>

          <Tabs defaultValue="instagram" className="w-full">
            <TabsList className="w-full flex-wrap h-auto gap-1 mb-6">
              {Object.entries(platforms).map(([key, platform]) => (
                <TabsTrigger key={key} value={key} className="flex-1 min-w-[100px]">
                  {platform.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(platforms).map(([key, platform]) => (
              <TabsContent key={key} value={key}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${platform.color}`} />
                      <div>
                        <CardTitle>{platform.name} Sizes</CardTitle>
                        <CardDescription>Recommended image dimensions in pixels</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {platform.sizes.map((spec) => (
                        <div
                          key={spec.name}
                          className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-medium">{spec.name}</h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => copySize(spec)}
                            >
                              {copiedSize === `${spec.name}-${spec.width}` ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                          <div className="text-2xl font-bold text-primary">
                            {spec.width} × {spec.height}
                          </div>
                          {spec.ratio && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Aspect ratio: {spec.ratio}
                            </p>
                          )}
                          {spec.notes && (
                            <p className="text-xs text-muted-foreground mt-2 italic">
                              {spec.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Pro Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Always export images in the highest quality your platform supports</p>
              <p>• Use PNG for graphics with transparency, JPEG for photos</p>
              <p>• Keep text within the safe zones for mobile viewing</p>
              <p>• Test your content on multiple devices before posting</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
