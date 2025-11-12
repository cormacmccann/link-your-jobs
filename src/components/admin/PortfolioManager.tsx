import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Upload, Trash2, ExternalLink, GripVertical } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function PortfolioManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const currentOrgId = localStorage.getItem("currentOrgId");
  const [uploading, setUploading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: portfolioItems, isLoading } = useQuery({
    queryKey: ["portfolio-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("organization_id", currentOrgId)
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (values: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("portfolio_items").insert({
        ...values,
        organization_id: currentOrgId,
        created_by: user?.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Portfolio item created" });
      queryClient.invalidateQueries({ queryKey: ["portfolio-items"] });
      setIsDialogOpen(false);
      setEditingItem(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...values }: any) => {
      const { error } = await supabase
        .from("portfolio_items")
        .update(values)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Portfolio item updated" });
      queryClient.invalidateQueries({ queryKey: ["portfolio-items"] });
      setIsDialogOpen(false);
      setEditingItem(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Portfolio item deleted" });
      queryClient.invalidateQueries({ queryKey: ["portfolio-items"] });
    },
  });

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, itemId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `portfolio-${Date.now()}.${fileExt}`;
      const filePath = `portfolio-logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portal-assets")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("portal-assets")
        .getPublicUrl(filePath);

      if (itemId) {
        await updateMutation.mutateAsync({ id: itemId, logo_url: publicUrl });
      } else if (editingItem) {
        setEditingItem({ ...editingItem, logo_url: publicUrl });
      }

      toast({ title: "Logo uploaded successfully" });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = {
      client_name: formData.get("client_name"),
      client_url: formData.get("client_url"),
      industry: formData.get("industry"),
      description: formData.get("description"),
      project_type: formData.get("project_type"),
      logo_url: editingItem?.logo_url,
      is_featured: formData.get("is_featured") === "on",
      is_published: formData.get("is_published") === "on",
    };

    if (editingItem?.id) {
      updateMutation.mutate({ id: editingItem.id, ...values });
    } else {
      createMutation.mutate(values);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Portfolio Management</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingItem({})}>
                <Plus className="h-4 w-4 mr-2" />
                Add Portfolio Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingItem?.id ? "Edit" : "Add"} Portfolio Item
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Client Logo</Label>
                  <div className="mt-2 flex items-center gap-4">
                    {editingItem?.logo_url && (
                      <img
                        src={editingItem.logo_url}
                        alt="Logo"
                        className="h-16 w-16 object-contain rounded border"
                      />
                    )}
                    <div>
                      <input
                        type="file"
                        id="logo-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleLogoUpload(e)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        disabled={uploading}
                        asChild
                      >
                        <label htmlFor="logo-upload" className="cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          {uploading ? "Uploading..." : "Upload Logo"}
                        </label>
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="client_name">Client Name *</Label>
                  <Input
                    id="client_name"
                    name="client_name"
                    defaultValue={editingItem?.client_name}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="client_url">Website URL</Label>
                  <Input
                    id="client_url"
                    name="client_url"
                    type="url"
                    defaultValue={editingItem?.client_url}
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    name="industry"
                    defaultValue={editingItem?.industry}
                    placeholder="Technology, Hospitality, etc."
                  />
                </div>

                <div>
                  <Label htmlFor="project_type">Project Type</Label>
                  <Input
                    id="project_type"
                    name="project_type"
                    defaultValue={editingItem?.project_type}
                    placeholder="Website Design, Branding, etc."
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={editingItem?.description}
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_published"
                      name="is_published"
                      defaultChecked={editingItem?.is_published ?? true}
                    />
                    <Label htmlFor="is_published">Published</Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      id="is_featured"
                      name="is_featured"
                      defaultChecked={editingItem?.is_featured ?? false}
                    />
                    <Label htmlFor="is_featured">Featured</Label>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  {editingItem?.id ? "Update" : "Create"} Portfolio Item
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        ) : portfolioItems?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No portfolio items yet. Add your first one!
          </div>
        ) : (
          <div className="space-y-2">
            {portfolioItems?.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                
                {item.logo_url && (
                  <img
                    src={item.logo_url}
                    alt={item.client_name}
                    className="h-12 w-12 object-contain rounded border"
                  />
                )}
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{item.client_name}</h4>
                    {item.is_featured && (
                      <span className="text-xs px-2 py-0.5 bg-accent-violet/20 text-accent-violet rounded">
                        Featured
                      </span>
                    )}
                    {!item.is_published && (
                      <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    {item.industry && <span>{item.industry}</span>}
                    {item.client_url && (
                      <a
                        href={item.client_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-foreground"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Visit Site
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingItem(item);
                      setIsDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMutation.mutate(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
