import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Upload, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PortalBuilderProps {
  portalId: string;
}

export function PortalBuilder({ portalId }: PortalBuilderProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const currentOrgId = localStorage.getItem("currentOrgId");
  const [uploading, setUploading] = useState(false);
  const [newProduct, setNewProduct] = useState({ product_name: "", product_description: "", price: 0 });
  const [newService, setNewService] = useState({ service_name: "", service_description: "", price: 0, duration: "" });

  const { data: portal } = useQuery({
    queryKey: ["portal-details", portalId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_portals")
        .select("*")
        .eq("id", portalId)
        .single();
      if (error) throw error;
      return data as any;
    },
  });

  const { data: products } = useQuery({
    queryKey: ["portal-products", portalId],
    queryFn: async () => {
      const { data } = await supabase
        .from("portal_products" as any)
        .select("*")
        .eq("portal_id", portalId)
        .order("display_order");
      return (data || []) as any[];
    },
  });

  const { data: services } = useQuery({
    queryKey: ["portal-services", portalId],
    queryFn: async () => {
      const { data } = await supabase
        .from("portal_services" as any)
        .select("*")
        .eq("portal_id", portalId)
        .order("display_order");
      return (data || []) as any[];
    },
  });

  const updatePortalMutation = useMutation({
    mutationFn: async (updates: any) => {
      const { error } = await supabase
        .from("client_portals")
        .update(updates)
        .eq("id", portalId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Portal updated" });
      queryClient.invalidateQueries({ queryKey: ["portal-details", portalId] });
    },
  });

  const addProductMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("portal_products" as any).insert({
        portal_id: portalId,
        organization_id: currentOrgId,
        ...newProduct,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Product added" });
      queryClient.invalidateQueries({ queryKey: ["portal-products", portalId] });
      setNewProduct({ product_name: "", product_description: "", price: 0 });
    },
  });

  const addServiceMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("portal_services" as any).insert({
        portal_id: portalId,
        organization_id: currentOrgId,
        ...newService,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Service added" });
      queryClient.invalidateQueries({ queryKey: ["portal-services", portalId] });
      setNewService({ service_name: "", service_description: "", price: 0, duration: "" });
    },
  });

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `portal-${portalId}-${Date.now()}.${fileExt}`;
      const filePath = `portal-logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portal-assets")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("portal-assets")
        .getPublicUrl(filePath);

      await updatePortalMutation.mutateAsync({ logo_url: publicUrl });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="branding">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portal Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Portal Logo</Label>
                <div className="mt-2 flex items-center gap-4">
                  {portal?.logo_url ? (
                    <img src={portal.logo_url} alt="Portal logo" className="h-20 w-20 object-contain rounded border" />
                  ) : (
                    <div className="h-20 w-20 border-2 border-dashed rounded flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <input type="file" id="portal-logo" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    <Button asChild variant="outline" disabled={uploading}>
                      <label htmlFor="portal-logo" className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        {uploading ? "Uploading..." : "Upload Logo"}
                      </label>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Primary Color</Label>
                  <Input
                    type="color"
                    value={portal?.primary_color || "#3b82f6"}
                    onChange={(e) => updatePortalMutation.mutate({ primary_color: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Secondary Color</Label>
                  <Input
                    type="color"
                    value={portal?.secondary_color || "#8b5cf6"}
                    onChange={(e) => updatePortalMutation.mutate({ secondary_color: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Custom Domain</Label>
                <Input
                  value={portal?.custom_domain || ""}
                  onChange={(e) => updatePortalMutation.mutate({ custom_domain: e.target.value })}
                  placeholder="portal.yourcompany.com"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Products Showcase</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Product</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Product Name</Label>
                        <Input
                          value={newProduct.product_name}
                          onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={newProduct.product_description}
                          onChange={(e) => setNewProduct({ ...newProduct, product_description: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Price</Label>
                        <Input
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                        />
                      </div>
                      <Button onClick={() => addProductMutation.mutate()} className="w-full">
                        Add Product
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {products?.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{product.product_name}</p>
                      <p className="text-sm text-muted-foreground">${product.price}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Services Showcase</CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Service</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Service Name</Label>
                        <Input
                          value={newService.service_name}
                          onChange={(e) => setNewService({ ...newService, service_name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={newService.service_description}
                          onChange={(e) => setNewService({ ...newService, service_description: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Price</Label>
                          <Input
                            type="number"
                            value={newService.price}
                            onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) })}
                          />
                        </div>
                        <div>
                          <Label>Duration</Label>
                          <Input
                            value={newService.duration}
                            onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                            placeholder="per month"
                          />
                        </div>
                      </div>
                      <Button onClick={() => addServiceMutation.mutate()} className="w-full">
                        Add Service
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {services?.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{service.service_name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${service.price} {service.duration}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portal Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Products</Label>
                  <p className="text-sm text-muted-foreground">Display products in the portal</p>
                </div>
                <Switch
                  checked={portal?.show_products}
                  onCheckedChange={(checked) => updatePortalMutation.mutate({ show_products: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Services</Label>
                  <p className="text-sm text-muted-foreground">Display services in the portal</p>
                </div>
                <Switch
                  checked={portal?.show_services}
                  onCheckedChange={(checked) => updatePortalMutation.mutate({ show_services: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow Support Tickets</Label>
                  <p className="text-sm text-muted-foreground">Let clients create support tickets</p>
                </div>
                <Switch
                  checked={portal?.allow_support_tickets}
                  onCheckedChange={(checked) => updatePortalMutation.mutate({ allow_support_tickets: checked })}
                />
              </div>

              <div>
                <Label>Monthly Support Ticket Limit</Label>
                <p className="text-sm text-muted-foreground mb-2">Set to -1 for unlimited</p>
                <Input
                  type="number"
                  value={portal?.support_ticket_limit ?? -1}
                  onChange={(e) => updatePortalMutation.mutate({ support_ticket_limit: parseInt(e.target.value) })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
