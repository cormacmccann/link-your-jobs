import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Globe, Image } from "lucide-react";
import { Link } from "@/lib/router-compat";

export default function OpenGraphPreview() {
  const [ogData, setOgData] = useState({
    title: "Your Page Title Here",
    description: "This is a preview of how your page will appear when shared on social media. Make it compelling!",
    url: "https://example.com/page",
    image: "",
    siteName: "Your Site",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/tools" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tools
        </Link>

        <div className="w-full mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">OpenGraph Preview</h1>
            <p className="text-muted-foreground">See how your links will appear on social media</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="min-w-0">
              <CardHeader>
                <CardTitle>OpenGraph Tags</CardTitle>
                <CardDescription>Enter your meta tag values</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">og:title</Label>
                  <Input
                    id="title"
                    value={ogData.title}
                    onChange={(e) => setOgData({ ...ogData, title: e.target.value })}
                    placeholder="Page title"
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground">{ogData.title.length}/60 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">og:description</Label>
                  <Textarea
                    id="description"
                    value={ogData.description}
                    onChange={(e) => setOgData({ ...ogData, description: e.target.value })}
                    placeholder="Page description"
                    maxLength={160}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">{ogData.description.length}/160 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">og:url</Label>
                  <Input
                    id="url"
                    value={ogData.url}
                    onChange={(e) => setOgData({ ...ogData, url: e.target.value })}
                    placeholder="https://example.com/page"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">og:image URL</Label>
                  <Input
                    id="image"
                    value={ogData.image}
                    onChange={(e) => setOgData({ ...ogData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground">Recommended: 1200×630 pixels</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteName">og:site_name</Label>
                  <Input
                    id="siteName"
                    value={ogData.siteName}
                    onChange={(e) => setOgData({ ...ogData, siteName: e.target.value })}
                    placeholder="Your Site Name"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6 min-w-0">
              <Tabs defaultValue="facebook" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="facebook" className="flex-1">Facebook</TabsTrigger>
                  <TabsTrigger value="twitter" className="flex-1">Twitter/X</TabsTrigger>
                  <TabsTrigger value="linkedin" className="flex-1">LinkedIn</TabsTrigger>
                </TabsList>

                <TabsContent value="facebook">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Facebook Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-lg overflow-hidden bg-white">
                        {ogData.image ? (
                          <img 
                            src={ogData.image} 
                            alt="Preview" 
                            className="w-full h-52 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-52 bg-muted flex items-center justify-center">
                            <Image className="w-12 h-12 text-muted-foreground" />
                          </div>
                        )}
                        <div className="p-3 border-t">
                          <p className="text-xs text-gray-500 uppercase">{new URL(ogData.url || "https://example.com").hostname}</p>
                          <h3 className="font-semibold text-gray-900 line-clamp-2">{ogData.title || "Page Title"}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mt-1">{ogData.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="twitter">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Twitter/X Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-2xl overflow-hidden bg-white">
                        {ogData.image ? (
                          <img 
                            src={ogData.image} 
                            alt="Preview" 
                            className="w-full h-52 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-52 bg-muted flex items-center justify-center">
                            <Image className="w-12 h-12 text-muted-foreground" />
                          </div>
                        )}
                        <div className="p-3 border-t">
                          <h3 className="font-bold text-gray-900 line-clamp-1">{ogData.title || "Page Title"}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2">{ogData.description}</p>
                          <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {new URL(ogData.url || "https://example.com").hostname}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="linkedin">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">LinkedIn Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-lg overflow-hidden bg-white">
                        {ogData.image ? (
                          <img 
                            src={ogData.image} 
                            alt="Preview" 
                            className="w-full h-52 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-52 bg-muted flex items-center justify-center">
                            <Image className="w-12 h-12 text-muted-foreground" />
                          </div>
                        )}
                        <div className="p-3 border-t bg-gray-50">
                          <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">{ogData.title || "Page Title"}</h3>
                          <p className="text-xs text-gray-500 mt-1">{new URL(ogData.url || "https://example.com").hostname}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Generated Meta Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`<meta property="og:title" content="${ogData.title}" />
<meta property="og:description" content="${ogData.description}" />
<meta property="og:url" content="${ogData.url}" />
<meta property="og:image" content="${ogData.image}" />
<meta property="og:site_name" content="${ogData.siteName}" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${ogData.title}" />
<meta name="twitter:description" content="${ogData.description}" />
<meta name="twitter:image" content="${ogData.image}" />`}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
