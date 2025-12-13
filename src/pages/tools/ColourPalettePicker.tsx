import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, Copy, Check, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface ColorInfo {
  hex: string;
  rgb: string;
  count: number;
}

const ColourPalettePicker = () => {
  const [colors, setColors] = useState<ColorInfo[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const extractColors = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const maxSize = 100;
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const colorMap: Record<string, number> = {};
        
        for (let i = 0; i < data.length; i += 4) {
          const r = Math.round(data[i] / 32) * 32;
          const g = Math.round(data[i + 1] / 32) * 32;
          const b = Math.round(data[i + 2] / 32) * 32;
          const key = `${r},${g},${b}`;
          colorMap[key] = (colorMap[key] || 0) + 1;
        }

        const sortedColors = Object.entries(colorMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
          .map(([key, count]) => {
            const [r, g, b] = key.split(",").map(Number);
            const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
            return {
              hex: hex.toUpperCase(),
              rgb: `rgb(${r}, ${g}, ${b})`,
              count
            };
          });

        setColors(sortedColors);
      };
      img.src = e.target?.result as string;
      setImagePreview(e.target?.result as string);
    };
    
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      extractColors(file);
    }
  };

  const copyColor = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    toast.success(`Copied ${color}`);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const exportPalette = () => {
    const css = colors.map((c, i) => `--color-${i + 1}: ${c.hex};`).join("\n");
    navigator.clipboard.writeText(`:root {\n${css}\n}`);
    toast.success("CSS variables copied to clipboard!");
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
            <Palette className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Colour Palette Picker</h1>
          <p className="text-muted-foreground">Extract dominant colors from any image</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="palette-upload"
              />
              <label htmlFor="palette-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Upload your logo or image</p>
                <p className="text-sm text-muted-foreground">We'll extract the dominant colors</p>
              </label>
            </div>
          </CardContent>
        </Card>

        {imagePreview && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Your Image</h3>
                <img src={imagePreview} alt="Uploaded" className="w-full rounded-lg" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Extracted Palette</h3>
                  <Button variant="outline" size="sm" onClick={exportPalette}>
                    Export CSS
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => copyColor(color.hex, index)}
                      className="group relative aspect-square rounded-lg transition-transform hover:scale-105"
                      style={{ backgroundColor: color.hex }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 rounded-lg transition-opacity">
                        {copiedIndex === index ? (
                          <Check className="h-4 w-4 text-white" />
                        ) : (
                          <Copy className="h-4 w-4 text-white" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  {colors.slice(0, 4).map((color, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded" 
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="font-mono">{color.hex}</span>
                      </div>
                      <span className="text-muted-foreground font-mono text-xs">{color.rgb}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColourPalettePicker;
