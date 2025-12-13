import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, Download, Image, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState([80]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [fileName, setFileName] = useState("");

  const compressImage = useCallback((file: File, qualityValue: number) => {
    setIsCompressing(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          
          const compressedDataUrl = canvas.toDataURL("image/jpeg", qualityValue / 100);
          setCompressedImage(compressedDataUrl);
          
          const base64Length = compressedDataUrl.split(",")[1].length;
          const compressedBytes = (base64Length * 3) / 4;
          setCompressedSize(compressedBytes);
        }
        setIsCompressing(false);
      };
      img.src = e.target?.result as string;
      setOriginalImage(e.target?.result as string);
    };
    
    reader.readAsDataURL(file);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name.replace(/\.[^/.]+$/, "") + "_compressed.jpg");
      setOriginalSize(file.size);
      compressImage(file, quality[0]);
    }
  };

  const handleQualityChange = (value: number[]) => {
    setQuality(value);
    if (originalImage) {
      const canvas = document.createElement("canvas");
      const img = new window.Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", value[0] / 100);
          setCompressedImage(compressedDataUrl);
          const base64Length = compressedDataUrl.split(",")[1].length;
          setCompressedSize((base64Length * 3) / 4);
        }
      };
      img.src = originalImage;
    }
  };

  const downloadImage = () => {
    if (compressedImage) {
      const link = document.createElement("a");
      link.download = fileName;
      link.href = compressedImage;
      link.click();
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const savings = originalSize > 0 ? ((1 - compressedSize / originalSize) * 100).toFixed(1) : 0;

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
          <h1 className="text-3xl font-bold mb-2">Image Compressor</h1>
          <p className="text-muted-foreground">Reduce image file size while maintaining quality</p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Drop your image here or click to upload</p>
                <p className="text-sm text-muted-foreground">Supports JPG, PNG, WebP</p>
              </label>
            </div>
          </CardContent>
        </Card>

        {originalImage && (
          <>
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Quality: {quality[0]}%</Label>
                    <span className="text-sm text-muted-foreground">Lower = smaller file</span>
                  </div>
                  <Slider
                    value={quality}
                    onValueChange={handleQualityChange}
                    min={10}
                    max={100}
                    step={5}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Original</h3>
                  <img src={originalImage} alt="Original" className="w-full rounded-lg mb-2" />
                  <p className="text-sm text-muted-foreground">{formatSize(originalSize)}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Compressed</h3>
                  {isCompressing ? (
                    <div className="flex items-center justify-center h-48">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <>
                      <img src={compressedImage!} alt="Compressed" className="w-full rounded-lg mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {formatSize(compressedSize)} 
                        <span className="text-green-500 ml-2">(-{savings}%)</span>
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            <Button onClick={downloadImage} className="w-full" size="lg" disabled={isCompressing}>
              <Download className="h-4 w-4 mr-2" />
              Download Compressed Image
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageCompressor;
