import { useState, useRef } from "react";
import { Link } from "@/lib/router-compat";
import { QrCode, Download, Copy, Check, ArrowLeft } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlowCard } from "@/components/ui/GlowCard";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("https://kamrok.com");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = (format: "png" | "svg") => {
    if (!qrRef.current) return;
    
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    if (format === "svg") {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.svg";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("SVG downloaded!");
    } else {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        canvas.width = size;
        canvas.height = size;
        ctx?.drawImage(img, 0, 0, size, size);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "qrcode.png";
        link.click();
        URL.revokeObjectURL(url);
        toast.success("PNG downloaded!");
      };
      img.src = url;
    }
  };

  const copyToClipboard = async () => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = async () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0, size, size);
      
      try {
        const blob = await new Promise<Blob>((resolve) => 
          canvas.toBlob((b) => resolve(b!), "image/png")
        );
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob })
        ]);
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      } catch {
        toast.error("Failed to copy - try downloading instead");
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="min-h-screen bg-bg-0 text-text-1">
      <div className="pt-10 pb-8 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Back Link */}
          <Link to="/tools" className="inline-flex items-center gap-2 text-text-2 hover:text-accent-violet transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tools</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-pink to-accent-violet flex items-center justify-center">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-gobold uppercase tracking-tight mb-2">
              QR Code Generator
            </h1>
            <p className="text-text-2">Create custom QR codes for your links, WiFi, or text</p>
          </div>

          {/* Tool Interface */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Controls */}
            <GlowCard glowColor="purple" customSize className="p-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="url" className="text-text-1 font-medium mb-2 block">
                    URL or Text
                  </Label>
                  <Input
                    id="url"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="bg-bg-1 border-border-1"
                  />
                </div>

                <div>
                  <Label className="text-text-1 font-medium mb-2 block">
                    Size: {size}px
                  </Label>
                  <Slider
                    value={[size]}
                    onValueChange={(v) => setSize(v[0])}
                    min={128}
                    max={512}
                    step={32}
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fgColor" className="text-text-1 font-medium mb-2 block">
                      Foreground Color
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="fgColor"
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-12 h-10 p-1 bg-bg-1 border-border-1"
                      />
                      <Input
                        type="text"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="flex-1 bg-bg-1 border-border-1 font-mono text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bgColor" className="text-text-1 font-medium mb-2 block">
                      Background Color
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="bgColor"
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-12 h-10 p-1 bg-bg-1 border-border-1"
                      />
                      <Input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="flex-1 bg-bg-1 border-border-1 font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>

            {/* Preview & Download */}
            <GlowCard glowColor="blue" customSize className="p-6">
              <div className="flex flex-col items-center">
                <div 
                  ref={qrRef}
                  className="p-4 rounded-lg mb-6"
                  style={{ backgroundColor: bgColor }}
                >
                  <QRCodeSVG
                    value={url || "https://kamrok.com"}
                    size={Math.min(size, 280)}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    level="H"
                  />
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    onClick={() => downloadQR("png")}
                    className="bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                  <Button
                    onClick={() => downloadQR("svg")}
                    variant="outline"
                    className="border-border-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download SVG
                  </Button>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="border-border-1"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 mr-2" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-text-2 mb-4">Need help with your digital marketing?</p>
            <Button asChild className="bg-gradient-to-r from-accent-pink to-accent-violet hover:opacity-90 text-white font-gobold uppercase">
              <Link to="/contact">Get a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
