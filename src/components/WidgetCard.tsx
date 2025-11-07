import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, ExternalLink, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface WidgetCardProps {
  source: {
    id: string;
    name: string;
    source_url: string;
    last_synced_at?: string;
    is_active: boolean;
    created_at: string;
  };
  onUpdate: () => void;
}

export const WidgetCard = ({ source, onUpdate }: WidgetCardProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Get job count for this source
  const { data: jobCount } = useQuery({
    queryKey: ['job-count', source.id],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('jobs')
        .select('*', { count: 'exact', head: true })
        .eq('job_source_id', source.id);
      
      if (error) throw error;
      return count || 0;
    },
  });

  const handleSync = async () => {
    setIsSyncing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('sync-jobs', {
        body: { 
          linkedinUrl: source.source_url,
          jobSourceId: source.id
        },
      });

      if (error) throw error;

      toast({
        title: "Sync Complete",
        description: data.message || `Synced ${data.synced} jobs`,
      });

      // Update last_synced_at
      await supabase
        .from('job_sources')
        .update({ last_synced_at: new Date().toISOString() })
        .eq('id', source.id);

      onUpdate();
      queryClient.invalidateQueries({ queryKey: ['job-count', source.id] });
    } catch (error) {
      console.error('Sync error:', error);
      toast({
        title: "Sync Failed",
        description: error instanceof Error ? error.message : "Failed to sync jobs",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${source.name}"? This will also delete all synced jobs from this source.`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from('job_sources')
        .delete()
        .eq('id', source.id);

      if (error) throw error;

      toast({
        title: "Widget Deleted",
        description: "Career widget and all jobs have been removed",
      });

      onUpdate();
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Error",
        description: "Failed to delete widget",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleView = () => {
    navigate(`/widget/${source.id}`);
  };

  return (
    <Card className="p-6 hover:shadow-[var(--shadow-card)] transition-[var(--transition-smooth)]">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {source.name}
            </h3>
            <a 
              href={source.source_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
            >
              {new URL(source.source_url).hostname}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          
          {source.is_active && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              Active
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div>
            <span className="font-medium text-foreground">{jobCount || 0}</span> jobs
          </div>
          {source.last_synced_at && (
            <div>
              Last synced {format(new Date(source.last_synced_at), 'MMM d, yyyy')}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleView}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Jobs
          </Button>
          
          <Button
            onClick={handleSync}
            disabled={isSyncing}
            size="sm"
            className="flex-1 bg-primary hover:bg-accent"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync'}
          </Button>
          
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            variant="destructive"
            size="sm"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
