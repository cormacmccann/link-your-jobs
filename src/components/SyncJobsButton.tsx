import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface SyncJobsButtonProps {
  linkedinUrl: string;
  disabled?: boolean;
}

export const SyncJobsButton = ({ linkedinUrl, disabled }: SyncJobsButtonProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleSync = async () => {
    if (!linkedinUrl) {
      toast({
        title: "Missing URL",
        description: "Please enter a job board URL first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log('Starting job sync for:', linkedinUrl);

    try {
      const { data, error } = await supabase.functions.invoke('sync-jobs', {
        body: { linkedinUrl },
      });

      if (error) throw error;

      console.log('Sync response:', data);

      const successMessage = data.synced 
        ? `Successfully synced ${data.synced} job${data.synced !== 1 ? 's' : ''}${data.errors ? ` (${data.errors} failed)` : ''}`
        : data.message || 'Sync completed';

      toast({
        title: "Sync Complete",
        description: successMessage,
      });

      // Refresh the jobs list
      queryClient.invalidateQueries({ queryKey: ['jobs', linkedinUrl] });

    } catch (error) {
      console.error('Error syncing jobs:', error);
      toast({
        title: "Sync Failed",
        description: error instanceof Error ? error.message : "Failed to sync jobs",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSync}
      disabled={disabled || isLoading || !linkedinUrl}
      className="bg-primary hover:bg-accent transition-[var(--transition-smooth)]"
    >
      <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
      {isLoading ? 'Syncing...' : 'Sync Jobs Now'}
    </Button>
  );
};
