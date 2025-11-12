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
import { OrganizationBranding } from "@/components/crm/OrganizationBranding";
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
        <h1 className="text-3xl font-bold uppercase tracking-tight mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your workspace and team</p>
      </div>

      <Tabs defaultValue="workspace" className="space-y-6">
        <TabsList>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="workspace" className="space-y-6">
          <Card className="p-6 bg-card/40 backdrop-blur-xl border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">Workspace Details</h3>
                <p className="text-sm text-muted-foreground">Your personal workspace for organizing projects</p>
              </div>
            </div>
            {currentOrg && (
              <div className="space-y-4">
                <div>
                  <Label>Workspace Name</Label>
                  <Input value={currentOrg.name} readOnly className="bg-card/40 backdrop-blur-xl border-white/10" />
                </div>
                <p className="text-xs text-muted-foreground">
                  This workspace was automatically created for you when you signed up. You can invite team members to collaborate on projects.
                </p>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <OrganizationBranding />
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card className="p-6 bg-card/40 backdrop-blur-xl border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">Team Members</h3>
                <p className="text-sm text-muted-foreground">Invite people to collaborate on your projects</p>
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
          <Card className="p-6 bg-card/40 backdrop-blur-xl border-white/10">
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
