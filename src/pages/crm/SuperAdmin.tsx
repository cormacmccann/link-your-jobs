import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building2, CreditCard, Shield, CheckCircle, XCircle, Clock, Briefcase, Mail, Sparkles } from "lucide-react";
import { PortfolioManager } from "@/components/admin/PortfolioManager";
import { ContactSubmissions } from "@/components/admin/ContactSubmissions";
import { PortfolioImporter } from "@/components/admin/PortfolioImporter";

export default function SuperAdmin() {
  const { data: userRoles } = useQuery({
    queryKey: ["user-roles-check"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      return data as any[];
    },
  });

  const isSuperAdmin = userRoles?.some((r: any) => r.role === "super_admin");

  const { data: allOrganizations } = useQuery({
    queryKey: ["all-organizations"],
    queryFn: async () => {
      const { data } = await supabase
        .from("organizations")
        .select(`
          *,
          user_roles(count)
        `)
        .order("created_at", { ascending: false });

      return (data || []) as any[];
    },
    enabled: isSuperAdmin,
  });

  const { data: allUsers } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select(`
          *,
          user_roles(role, organization_id)
        `)
        .order("created_at", { ascending: false });

      return (data || []) as any[];
    },
    enabled: isSuperAdmin,
  });

  const { data: invitations } = useQuery({
    queryKey: ["all-invitations"],
    queryFn: async () => {
      const { data } = await supabase
        .from("invitations" as any)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      return (data || []) as any[];
    },
    enabled: isSuperAdmin,
  });

  if (!isSuperAdmin) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="p-12 text-center">
            <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">
              You don't have super admin permissions to access this area.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = {
    totalOrgs: allOrganizations?.length || 0,
    totalUsers: allUsers?.length || 0,
    pendingInvites: invitations?.filter((i: any) => i.status === "pending").length || 0,
    activeSubscriptions: 0, // TODO: Implement subscription tracking
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
        </div>
        <p className="text-muted-foreground">Manage your CRM platform and public website</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Organizations</p>
                <p className="text-3xl font-bold">{stats.totalOrgs}</p>
              </div>
              <Building2 className="h-10 w-10 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
              </div>
              <Users className="h-10 w-10 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Invites</p>
                <p className="text-3xl font-bold">{stats.pendingInvites}</p>
              </div>
              <Clock className="h-10 w-10 text-orange-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Subscriptions</p>
                <p className="text-3xl font-bold">{stats.activeSubscriptions}</p>
              </div>
              <CreditCard className="h-10 w-10 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="organizations">
        <TabsList>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
          <TabsTrigger value="portfolio">
            <Briefcase className="h-4 w-4 mr-2" />
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="importer">
            <Sparkles className="h-4 w-4 mr-2" />
            AI Importer
          </TabsTrigger>
          <TabsTrigger value="contacts">
            <Mail className="h-4 w-4 mr-2" />
            Contact Forms
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organizations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Organizations</CardTitle>
              <CardDescription>Manage all organizations in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allOrganizations?.map((org) => (
                  <div key={org.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{org.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {org.user_roles?.[0]?.count || 0} members
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allUsers?.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{user.full_name || user.email}</h4>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex gap-2 mt-2">
                        {user.user_roles?.map((role: any, idx: number) => (
                          <Badge key={idx} variant="secondary">
                            {role.role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit Roles</Button>
                      <Button variant="outline" size="sm">Suspend</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invitations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations</CardTitle>
              <CardDescription>Review and manage pending invitations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invitations?.map((invite: any) => (
                  <div key={invite.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{invite.email}</h4>
                      <div className="flex gap-2 items-center mt-1">
                        <Badge variant="secondary">{invite.role}</Badge>
                        <Badge
                          variant={invite.status === "pending" ? "outline" : invite.status === "accepted" ? "default" : "destructive"}
                        >
                          {invite.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio">
          <PortfolioManager />
        </TabsContent>

        <TabsContent value="importer">
          <PortfolioImporter />
        </TabsContent>

        <TabsContent value="contacts">
          <ContactSubmissions />
        </TabsContent>
      </Tabs>
    </div>
  );
}