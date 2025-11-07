import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { JobsDisplay } from "@/components/JobsDisplay";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function WidgetView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: source, isLoading } = useQuery({
    queryKey: ['job-source', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_sources')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!source) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Widget not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{source.name}</h1>
          <p className="text-muted-foreground">{source.source_url}</p>
        </div>

        <JobsDisplay jobSourceId={id!} />
      </div>
    </div>
  );
}
