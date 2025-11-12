import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image as ImageIcon } from "lucide-react";

export function OrganizationBranding() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const currentOrgId = localStorage.getItem("currentOrgId");
  const [uploading, setUploading] = useState(false);

  const { data: organization } = useQuery({
    queryKey: ["organization-branding", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return null;
      const { data, error } = await supabase
        .from("organizations")
        .select("*")
        .eq("id", currentOrgId)
        .single();
      if (error) throw error;
      return data as any;
    },
    enabled: !!currentOrgId,
  });

  const updateOrgMutation = useMutation({
    mutationFn: async (updates: any) => {
      if (!currentOrgId) throw new Error("No organization selected");
      const { error } = await supabase
        .from("organizations")
        .update(updates)
        .eq("id", currentOrgId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Organization updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["organization-branding", currentOrgId] });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to update organization", description: error.message, variant: "destructive" });
    },
  });

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentOrgId) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${currentOrgId}-${Date.now()}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portal-assets")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("portal-assets")
        .getPublicUrl(filePath);

      await updateOrgMutation.mutateAsync({ logo_url: publicUrl });
    } catch (error: any) {
      toast({ title: "Failed to upload logo", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Branding</CardTitle>
        <CardDescription>Customize your organization's appearance and branding</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Company Logo</Label>
          <div className="mt-2 flex items-center gap-4">
            {organization?.logo_url ? (
              <img
                src={organization.logo_url}
                alt="Company logo"
                className="h-20 w-20 object-contain rounded border"
              />
            ) : (
              <div className="h-20 w-20 border-2 border-dashed rounded flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <div>
              <input
                type="file"
                id="logo-upload"
                className="hidden"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={uploading}
              />
              <Button asChild variant="outline" disabled={uploading}>
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? "Uploading..." : "Upload Logo"}
                </label>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="primary-color">Primary Color</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="primary-color"
                type="color"
                value={organization?.primary_color || "#3b82f6"}
                onChange={(e) => updateOrgMutation.mutate({ primary_color: e.target.value })}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={organization?.primary_color || "#3b82f6"}
                onChange={(e) => updateOrgMutation.mutate({ primary_color: e.target.value })}
                placeholder="#3b82f6"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="secondary-color">Secondary Color</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="secondary-color"
                type="color"
                value={organization?.secondary_color || "#8b5cf6"}
                onChange={(e) => updateOrgMutation.mutate({ secondary_color: e.target.value })}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={organization?.secondary_color || "#8b5cf6"}
                onChange={(e) => updateOrgMutation.mutate({ secondary_color: e.target.value })}
                placeholder="#8b5cf6"
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="website-url">Website URL</Label>
          <Input
            id="website-url"
            type="url"
            value={organization?.website_url || ""}
            onChange={(e) => updateOrgMutation.mutate({ website_url: e.target.value })}
            placeholder="https://yourcompany.com"
          />
        </div>

        <div>
          <Label htmlFor="company-description">Company Description</Label>
          <Textarea
            id="company-description"
            value={organization?.company_description || ""}
            onChange={(e) => updateOrgMutation.mutate({ company_description: e.target.value })}
            placeholder="Tell your clients about your company..."
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
}
