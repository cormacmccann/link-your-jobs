import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, LogOut, Briefcase } from "lucide-react";
import { useState } from "react";
import { AddWidgetDialog } from "./AddWidgetDialog";
import { WidgetCard } from "./WidgetCard";
import { useToast } from "@/hooks/use-toast";

export const Dashboard = () => {
  const { toast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);

  const { data: jobSources, refetch } = useQuery({
    queryKey: ['job-sources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_sources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-elegant)]">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Career Widgets Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage your job sync sources</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Your Career Widgets</h2>
            <p className="text-muted-foreground">
              Add job boards to automatically sync and display listings
            </p>
          </div>
          
          <Button 
            onClick={() => setShowAddDialog(true)}
            className="bg-primary hover:bg-accent gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Widget
          </Button>
        </div>

        {/* Widgets Grid */}
        {!jobSources || jobSources.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Career Widgets Yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Add your first career widget to start syncing job listings from LinkedIn, Indeed, or any job board.
              </p>
              <Button 
                onClick={() => setShowAddDialog(true)}
                className="bg-primary hover:bg-accent gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Your First Widget
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobSources.map((source) => (
              <WidgetCard 
                key={source.id} 
                source={source}
                onUpdate={() => refetch()}
              />
            ))}
          </div>
        )}
      </main>

      <AddWidgetDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={() => {
          refetch();
          setShowAddDialog(false);
        }}
      />
    </div>
  );
};
