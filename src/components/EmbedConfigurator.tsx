import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Copy, Check, Palette } from "lucide-react";

interface EmbedConfig {
  showLogo?: boolean;
  showLocation?: boolean;
  showJobType?: boolean;
  showDescription?: boolean;
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonStyle?: "filled" | "outline";
  headerText?: string;
  fontFamily?: string;
}

interface EmbedConfiguratorProps {
  jobSourceId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentConfig?: EmbedConfig;
}

export const EmbedConfigurator = ({ 
  jobSourceId, 
  open, 
  onOpenChange,
  currentConfig = {}
}: EmbedConfiguratorProps) => {
  const [config, setConfig] = useState<EmbedConfig>({
    showLogo: true,
    showLocation: true,
    showJobType: true,
    showDescription: true,
    primaryColor: "#3b82f6",
    backgroundColor: "#ffffff",
    textColor: "#1e293b",
    buttonStyle: "filled",
    headerText: "Latest Job Openings",
    fontFamily: "Inter",
    ...currentConfig
  });
  const [copied, setCopied] = useState(false);

  const embedUrl = `https://link-your-jobs.lovable.app/embed/${jobSourceId}`;
  const embedCode = `<iframe src="${embedUrl}" width="100%" height="600" frameborder="0"></iframe>`;

  const handleSave = async () => {
    const { error } = await supabase
      .from('job_sources')
      .update({ embed_config: config as any })
      .eq('id', jobSourceId);

    if (error) {
      toast.error("Failed to save configuration");
      return;
    }

    toast.success("Embed configuration saved");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Embed code copied!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configure Embed Widget</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="customize">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customize">Customize</TabsTrigger>
            <TabsTrigger value="embed">Embed Code</TabsTrigger>
          </TabsList>

          <TabsContent value="customize" className="space-y-6 mt-4">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Widget Header
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="headerText">Header Text</Label>
                <Input
                  id="headerText"
                  type="text"
                  value={config.headerText}
                  onChange={(e) => setConfig({ ...config, headerText: e.target.value })}
                  placeholder="Latest Job Openings"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontFamily">Font Family</Label>
                <Select
                  value={config.fontFamily}
                  onValueChange={(value) => setConfig({ ...config, fontFamily: value })}
                >
                  <SelectTrigger id="fontFamily">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter (Modern)</SelectItem>
                    <SelectItem value="Roboto">Roboto (Clean)</SelectItem>
                    <SelectItem value="Open Sans">Open Sans (Friendly)</SelectItem>
                    <SelectItem value="Lato">Lato (Professional)</SelectItem>
                    <SelectItem value="Montserrat">Montserrat (Bold)</SelectItem>
                    <SelectItem value="Poppins">Poppins (Rounded)</SelectItem>
                    <SelectItem value="Playfair Display">Playfair Display (Elegant)</SelectItem>
                    <SelectItem value="Merriweather">Merriweather (Serif)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Display Options</h3>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="showLocation">Show Location</Label>
                <Switch
                  id="showLocation"
                  checked={config.showLocation}
                  onCheckedChange={(checked) => setConfig({ ...config, showLocation: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="showJobType">Show Job Type</Label>
                <Switch
                  id="showJobType"
                  checked={config.showJobType}
                  onCheckedChange={(checked) => setConfig({ ...config, showJobType: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="showDescription">Show Description</Label>
                <Switch
                  id="showDescription"
                  checked={config.showDescription}
                  onCheckedChange={(checked) => setConfig({ ...config, showDescription: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="buttonStyle">Button Style</Label>
                <Select
                  value={config.buttonStyle}
                  onValueChange={(value: "filled" | "outline") => setConfig({ ...config, buttonStyle: value })}
                >
                  <SelectTrigger id="buttonStyle">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="filled">Filled</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Colors</h3>
              
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={config.primaryColor}
                    onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                    placeholder="#3b82f6"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={config.backgroundColor}
                    onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                    placeholder="#ffffff"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="textColor">Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="textColor"
                    type="color"
                    value={config.textColor}
                    onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={config.textColor}
                    onChange={(e) => setConfig({ ...config, textColor: e.target.value })}
                    placeholder="#1e293b"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full">
              Save Configuration
            </Button>
          </TabsContent>

          <TabsContent value="embed" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Embed URL</Label>
              <div className="flex gap-2">
                <Input value={embedUrl} readOnly className="font-mono text-sm" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(embedUrl);
                    toast.success("URL copied!");
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Embed Code</Label>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  {embedCode}
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <h4 className="font-semibold text-sm">How to use:</h4>
              <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                <li>Copy the embed code above</li>
                <li>Paste it into your website's HTML</li>
                <li>The widget will automatically display your job listings</li>
                <li>Jobs sync automatically every 24 hours at 2 AM</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};