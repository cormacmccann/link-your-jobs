import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Users, ExternalLink, Settings } from "lucide-react";
import { PortalBuilder } from "@/components/portals/PortalBuilder";

export function ClientPortalManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const currentOrgId = localStorage.getItem("currentOrgId");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPortalId, setSelectedPortalId] = useState<string | null>(null);
  const [newPortal, setNewPortal] = useState({
    portal_name: "",
    welcome_message: "",
    client_company_id: "",
    client_contact_id: "",
  });

  const { data: portals } = useQuery({
    queryKey: ["client-portals", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return [];

      const { data } = await supabase
        .from("client_portals")
        .select(`
          *,
          client_company:companies(name),
          client_contact:contacts(first_name, last_name, email)
        `)
        .eq("organization_id", currentOrgId)
        .order("created_at", { ascending: false });

      return (data || []) as any[];
    },
    enabled: !!currentOrgId,
  });

  const { data: companies } = useQuery({
    queryKey: ["companies-list", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return [];

      const { data } = await supabase
        .from("companies")
        .select("id, name")
        .eq("organization_id", currentOrgId);

      return (data || []) as any[];
    },
    enabled: !!currentOrgId,
  });

  const { data: contacts } = useQuery({
    queryKey: ["contacts-list", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return [];

      const { data } = await supabase
        .from("contacts")
        .select("id, first_name, last_name, email")
        .eq("organization_id", currentOrgId);

      return (data || []) as any[];
    },
    enabled: !!currentOrgId,
  });

  const createPortalMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("client_portals").insert({
        organization_id: currentOrgId,
        ...newPortal,
        client_company_id: newPortal.client_company_id || null,
        client_contact_id: newPortal.client_contact_id || null,
        created_by: user.id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Client portal created" });
      queryClient.invalidateQueries({ queryKey: ["client-portals", currentOrgId] });
      setNewPortal({ portal_name: "", welcome_message: "", client_company_id: "", client_contact_id: "" });
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: "Failed to create portal", description: error.message, variant: "destructive" });
    },
  });

  if (!currentOrgId) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          <p>Please select an organization</p>
        </CardContent>
      </Card>
    );
  }

  if (selectedPortalId) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Configure Portal</h2>
          <Button variant="outline" onClick={() => setSelectedPortalId(null)}>
            Back to Portals
          </Button>
        </div>
        <PortalBuilder portalId={selectedPortalId} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Client Onboarding Portals</h2>
          <p className="text-muted-foreground">Create branded portals for client onboarding with products, services, and support</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Portal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Client Portal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Portal Name</Label>
                <Input
                  value={newPortal.portal_name}
                  onChange={(e) => setNewPortal({ ...newPortal, portal_name: e.target.value })}
                  placeholder="e.g., Welcome to Onboarding"
                />
              </div>

              <div>
                <Label>Welcome Message</Label>
                <Textarea
                  value={newPortal.welcome_message}
                  onChange={(e) => setNewPortal({ ...newPortal, welcome_message: e.target.value })}
                  placeholder="Welcome message for clients..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Company (Optional)</Label>
                  <Select
                    value={newPortal.client_company_id}
                    onValueChange={(value) => setNewPortal({ ...newPortal, client_company_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {companies?.map((company: any) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Contact (Optional)</Label>
                  <Select
                    value={newPortal.client_contact_id}
                    onValueChange={(value) => setNewPortal({ ...newPortal, client_contact_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select contact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {contacts?.map((contact: any) => (
                        <SelectItem key={contact.id} value={contact.id}>
                          {contact.first_name} {contact.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={() => createPortalMutation.mutate()}
                disabled={!newPortal.portal_name || createPortalMutation.isPending}
                className="w-full"
              >
                Create Portal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {!portals || portals.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12 text-muted-foreground">
            <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No client portals yet</p>
            <p className="text-sm">Create your first portal to onboard clients</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portals.map((portal) => (
            <Card key={portal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{portal.portal_name}</CardTitle>
                    {portal.client_company && (
                      <CardDescription>{portal.client_company.name}</CardDescription>
                    )}
                  </div>
                  <Badge variant={portal.is_active ? "default" : "secondary"}>
                    {portal.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {portal.welcome_message || "No welcome message"}
                </p>

                {portal.client_contact && (
                  <div className="text-sm mb-4">
                    <span className="text-muted-foreground">Contact: </span>
                    <span>
                      {portal.client_contact.first_name} {portal.client_contact.last_name}
                    </span>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Open
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedPortalId(portal.id)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}