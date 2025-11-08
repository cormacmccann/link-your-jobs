import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, Trash2, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function Settings() {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isCreateOrgDialogOpen, setIsCreateOrgDialogOpen] = useState(false);
  const currentOrgId = localStorage.getItem("currentOrgId");

  const { data: currentOrg } = useQuery({
    queryKey: ["current-org", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return null;
      
      const { data, error } = await supabase
        .from("organizations")
        .select("*")
        .eq("id", currentOrgId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!currentOrgId,
  });

  const { data: orgMembers, refetch: refetchMembers } = useQuery({
    queryKey: ["org-members", currentOrgId],
    queryFn: async () => {
      if (!currentOrgId) return [];
      
      const { data, error } = await supabase
        .from("user_roles")
        .select(`
          *,
          profiles (
            id,
            email,
            full_name
          )
        `)
        .eq("organization_id", currentOrgId);

      if (error) throw error;
      return data;
    },
    enabled: !!currentOrgId,
  });

  const handleCreateOrg = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    const name = formData.get("name") as string;
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const { data: org, error: orgError } = await supabase
      .from("organizations")
      .insert({
        name,
        slug,
        created_by: user.id,
      })
      .select()
      .single();

    if (orgError) {
      toast.error("Failed to create organization");
      console.error(orgError);
      return;
    }

    // Add creator as owner
    const { error: roleError } = await supabase.from("user_roles").insert({
      user_id: user.id,
      organization_id: org.id,
      role: "owner",
    });

    if (roleError) {
      toast.error("Failed to set organization owner");
      console.error(roleError);
      return;
    }

    toast.success("Organization created successfully");
    setIsCreateOrgDialogOpen(false);
    localStorage.setItem("currentOrgId", org.id);
    window.location.reload();
  };

  const handleInviteUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;

    if (!currentOrgId) {
      toast.error("No organization selected");
      return;
    }

    // In a real app, you'd send an invitation email here
    toast.success(`Invitation sent to ${email} as ${role}`);
    setIsInviteDialogOpen(false);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-gobold uppercase tracking-tight mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your account and organization</p>
      </div>

      <Tabs defaultValue="organization" className="space-y-6">
        <TabsList>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="organization" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">Organization Details</h3>
                <p className="text-sm text-muted-foreground">Manage your organization settings</p>
              </div>
              <Dialog open={isCreateOrgDialogOpen} onOpenChange={setIsCreateOrgDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Org
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Organization</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCreateOrg} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Organization Name</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <Button type="submit" className="w-full">Create Organization</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            {currentOrg && (
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input value={currentOrg.name} readOnly />
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input value={currentOrg.slug} readOnly />
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">Team Members</h3>
                <p className="text-sm text-muted-foreground">Manage who has access to this organization</p>
              </div>
              <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
                    <Mail className="h-4 w-4 mr-2" />
                    Invite Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite Team Member</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleInviteUser} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select name="role" defaultValue="member">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">Owner</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="guest">Guest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full">Send Invitation</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-2">
              {orgMembers?.map((member: any) => (
                <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{member.profiles?.full_name || member.profiles?.email}</p>
                    <p className="text-sm text-muted-foreground">{member.profiles?.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={member.role === "owner" ? "default" : "secondary"}>
                      {member.role}
                    </Badge>
                    {member.role !== "owner" && (
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="Your email" />
              </div>
              <div>
                <Label>Full Name</Label>
                <Input placeholder="Your full name" />
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
