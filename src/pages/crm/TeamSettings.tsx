import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TeamInvitations } from "@/components/team/TeamInvitations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TeamSettings() {
  const { data: userOrg } = useQuery({
    queryKey: ["user-organization"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("user_roles")
        .select("organization_id")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (!userOrg) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Team Settings</h1>
        <p className="text-muted-foreground">Manage your team members and invitations</p>
      </div>

      <TeamInvitations organizationId={userOrg.organization_id} />

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>View and manage current team members</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Team member management coming soon</p>
        </CardContent>
      </Card>
    </div>
  );
}
