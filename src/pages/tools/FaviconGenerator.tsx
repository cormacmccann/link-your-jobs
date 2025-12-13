import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, Download, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const FAVICON_SIZES = [16, 32, 48, 64, 128, 180, 192, 512];

interface GeneratedFavicon {
  size: number;
  dataUrl: string;
}

const FaviconGenerator = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [favicons, setFavicons] = useState<GeneratedFavicon[]>([]);

  const generateFavicons = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const generated: GeneratedFavicon[] = [];
        
        FAVICON_SIZES.forEach((size) => {
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, size, size);
            generated.push({
              size,
              dataUrl: canvas.toDataURL("image/png")
            });
          }
        });
        
        setFavicons(generated);
      };
      img.src = e.target?.result as string;
      setOriginalImage(e.target?.result as string);
    };
    
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      generateFavicons(file);
    }
  };

  const downloadFavicon = (favicon: GeneratedFavicon) => {
    const link = document.createElement("a");
    link.download = `favicon-${favicon.size}x${favicon.size}.png`;
    link.href = favicon.dataUrl;
    link.click();
  };

  const downloadAll = async () => {
    for (const favicon of favicons) {
      const link = document.createElement("a");
      link.download = `favicon-${favicon.size}x${favicon.size}.png`;
      link.href = favicon.dataUrl;
      link.click();
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    toast.success("All favicons downloaded!");
  };

  const copyHtmlCode = () => {
    const code = `<!-- Favicon -->
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png">`;
    
    navigator.clipboard.writeText(code);
    toast.success("HTML code copied to clipboard!");
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
            <Image className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Favicon Generator</h1>
          <p className="text-muted-foreground">Generate all favicon sizes from a single image</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="favicon-upload"
              />
              <label htmlFor="favicon-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Upload your logo or icon</p>
                <p className="text-sm text-muted-foreground">Square images work best (512x512 recommended)</p>
              </label>
            </div>
          </CardContent>
        </Card>

        {originalImage && favicons.length > 0 && (
          <>
            <div className="flex gap-4 mb-6">
              <Button onClick={downloadAll} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download All Sizes
              </Button>
              <Button variant="outline" onClick={copyHtmlCode}>
                Copy HTML Code
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Generated Favicons</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {favicons.map((favicon) => (
                    <button
                      key={favicon.size}
                      onClick={() => downloadFavicon(favicon)}
                      className="p-4 border border-border rounded-lg hover:border-primary transition-colors text-center group"
                    >
                      <div className="flex items-center justify-center h-16 mb-2">
                        <img 
                          src={favicon.dataUrl} 
                          alt={`${favicon.size}x${favicon.size}`}
                          className="max-w-full max-h-full"
                          style={{ width: Math.min(favicon.size, 64), height: Math.min(favicon.size, 64) }}
                        />
                      </div>
                      <p className="text-sm font-medium">{favicon.size}x{favicon.size}</p>
                      <p className="text-xs text-muted-foreground group-hover:text-primary">Click to download</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-medium mb-2">Usage Guide</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>16x16, 32x32</strong> - Standard browser tab icons</li>
                  <li>• <strong>48x48, 64x64</strong> - Windows taskbar</li>
                  <li>• <strong>180x180</strong> - Apple Touch Icon (iOS)</li>
                  <li>• <strong>192x192, 512x512</strong> - Android & PWA icons</li>
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default FaviconGenerator;
