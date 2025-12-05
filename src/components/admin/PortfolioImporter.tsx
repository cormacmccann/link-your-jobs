import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Globe, Download, Sparkles, Image, FileText, Save } from "lucide-react";

interface ImportedData {
  client_name: string;
  client_url: string;
  logo_url: string | null;
  screenshot: string | null;
  description: string;
  industry: string;
  colors: Record<string, string>;
  branding: Record<string, any>;
}

export function PortfolioImporter() {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [importedData, setImportedData] = useState<ImportedData | null>(null);
  const [editedData, setEditedData] = useState<Partial<ImportedData>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleImport = async () => {
    if (!url.trim()) {
      toast({ title: "Error", description: "Please enter a URL", variant: "destructive" });
      return;
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      toast({ title: "Error", description: "Please enter a valid URL", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setImportedData(null);

    try {
      const { data, error } = await supabase.functions.invoke("import-portfolio-url", {
        body: { url },
      });

      if (error) throw error;

      if (data?.success) {
        setImportedData(data.data);
        setEditedData(data.data);
        toast({ title: "Success", description: "Website imported successfully" });
      } else {
        throw new Error(data?.error || "Import failed");
      }
    } catch (error) {
      console.error("Import error:", error);
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Failed to import website",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToPortfolio = async () => {
    if (!editedData.client_name) {
      toast({ title: "Error", description: "Client name is required", variant: "destructive" });
      return;
    }

    setIsSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get user's organization
      const { data: userRoles } = await supabase
        .from("user_roles")
        .select("organization_id")
        .eq("user_id", user.id)
        .limit(1)
        .single();

      if (!userRoles) throw new Error("No organization found");

      // Upload screenshot to storage if available
      let screenshotUrl = null;
      if (importedData?.screenshot) {
        try {
          // Convert base64 to blob
          const base64Data = importedData.screenshot.replace(/^data:image\/\w+;base64,/, "");
          const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
          const blob = new Blob([binaryData], { type: "image/png" });
          
          const fileName = `portfolio-screenshot-${Date.now()}.png`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("portal-assets")
            .upload(`portfolio-screenshots/${fileName}`, blob, {
              contentType: "image/png",
            });

          if (!uploadError && uploadData) {
            const { data: { publicUrl } } = supabase.storage
              .from("portal-assets")
              .getPublicUrl(`portfolio-screenshots/${fileName}`);
            screenshotUrl = publicUrl;
          }
        } catch (uploadErr) {
          console.error("Screenshot upload error:", uploadErr);
        }
      }

      // Insert portfolio item
      const { error: insertError } = await supabase.from("portfolio_items").insert({
        organization_id: userRoles.organization_id,
        created_by: user.id,
        client_name: editedData.client_name,
        client_url: editedData.client_url,
        logo_url: editedData.logo_url,
        description: editedData.description,
        industry: editedData.industry,
        screenshots: screenshotUrl ? [screenshotUrl] : [],
        is_published: false,
      });

      if (insertError) throw insertError;

      toast({ title: "Saved!", description: "Portfolio item created successfully" });
      setImportedData(null);
      setEditedData({});
      setUrl("");
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "Failed to save portfolio item",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent-violet" />
            AI Portfolio Importer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button onClick={handleImport} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Import
                </>
              )}
            </Button>
          </div>

          {isLoading && (
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Loader2 className="w-5 h-5 animate-spin text-accent-violet" />
              <div className="text-sm">
                <p className="font-medium">Analyzing website...</p>
                <p className="text-muted-foreground">Extracting logo, screenshot, and generating brief</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {importedData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Imported Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Preview Row */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Logo Preview */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Logo
                </Label>
                {importedData.logo_url ? (
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <img
                      src={importedData.logo_url}
                      alt="Logo"
                      className="max-h-20 max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="border rounded-lg p-4 bg-muted/50 text-muted-foreground text-sm">
                    No logo found
                  </div>
                )}
              </div>

              {/* Screenshot Preview */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Screenshot
                </Label>
                {importedData.screenshot ? (
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={importedData.screenshot}
                      alt="Screenshot"
                      className="w-full h-40 object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="border rounded-lg p-4 bg-muted/50 text-muted-foreground text-sm h-40 flex items-center justify-center">
                    No screenshot captured
                  </div>
                )}
              </div>
            </div>

            {/* Editable Fields */}
            <div className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Client Name</Label>
                  <Input
                    value={editedData.client_name || ""}
                    onChange={(e) => setEditedData({ ...editedData, client_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Input
                    value={editedData.industry || ""}
                    onChange={(e) => setEditedData({ ...editedData, industry: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Website URL</Label>
                <Input
                  value={editedData.client_url || ""}
                  onChange={(e) => setEditedData({ ...editedData, client_url: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Logo URL</Label>
                <Input
                  value={editedData.logo_url || ""}
                  onChange={(e) => setEditedData({ ...editedData, logo_url: e.target.value })}
                  placeholder="Paste logo URL or leave empty"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent-violet" />
                  AI-Generated Brief
                </Label>
                <Textarea
                  value={editedData.description || ""}
                  onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                  rows={4}
                  placeholder="Brief description of the project..."
                />
              </div>
            </div>

            {/* Brand Colors */}
            {importedData.colors && Object.keys(importedData.colors).length > 0 && (
              <div className="space-y-2">
                <Label>Detected Brand Colors</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(importedData.colors).map(([name, color]) => (
                    <div key={name} className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color }}
                      />
                      <span className="capitalize">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <Button
              onClick={handleSaveToPortfolio}
              disabled={isSaving}
              className="w-full"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save to Portfolio
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
