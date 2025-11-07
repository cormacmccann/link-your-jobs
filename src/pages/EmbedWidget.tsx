import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Briefcase, Clock } from "lucide-react";
import { format } from "date-fns";

interface EmbedConfig {
  showLogo?: boolean;
  showLocation?: boolean;
  showJobType?: boolean;
  showDescription?: boolean;
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonStyle?: "filled" | "outline";
}

export default function EmbedWidget() {
  const { id } = useParams<{ id: string }>();

  const { data: jobSource } = useQuery({
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
  });

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs-embed', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('job_source_id', id)
        .order('posted_date', { ascending: false, nullsFirst: false });
      
      if (error) throw error;
      return data;
    },
  });

  const config: EmbedConfig = (jobSource?.embed_config as EmbedConfig) || {};

  if (isLoading) {
    return (
      <div className="p-4 space-y-4" style={{ backgroundColor: config.backgroundColor }}>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="p-8 text-center" style={{ backgroundColor: config.backgroundColor, color: config.textColor }}>
        <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No jobs available at the moment</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4" style={{ backgroundColor: config.backgroundColor }}>
      <style>{`
        :root {
          --embed-primary: ${config.primaryColor || 'hsl(221.2, 83.2%, 53.3%)'};
          --embed-bg: ${config.backgroundColor || 'hsl(0, 0%, 100%)'};
          --embed-text: ${config.textColor || 'hsl(222.2, 84%, 4.9%)'};
        }
      `}</style>

      {jobs.map((job) => (
        <Card 
          key={job.id} 
          className="p-6 hover:shadow-lg transition-shadow"
          style={{ borderColor: 'hsl(214.3, 31.8%, 91.4%)' }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div>
                <h3 
                  className="text-xl font-semibold mb-1"
                  style={{ color: config.textColor }}
                >
                  {job.job_title}
                </h3>
                <p 
                  className="font-medium"
                  style={{ color: config.primaryColor }}
                >
                  {job.company_name}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm" style={{ color: config.textColor }}>
                {config.showLocation && job.location && (
                  <div className="flex items-center gap-1 opacity-70">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                )}
                {config.showJobType && job.job_type && (
                  <Badge variant="secondary">{job.job_type}</Badge>
                )}
                {job.posted_date && (
                  <div className="flex items-center gap-1 opacity-70">
                    <Clock className="w-4 h-4" />
                    Posted {format(new Date(job.posted_date), 'MMM d, yyyy')}
                  </div>
                )}
              </div>

              {config.showDescription && job.description && (
                <p className="line-clamp-2 opacity-70" style={{ color: config.textColor }}>
                  {job.description}
                </p>
              )}
            </div>

            <a
              href={job.job_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: config.buttonStyle === 'filled' ? config.primaryColor : 'transparent',
                color: config.buttonStyle === 'filled' ? 'white' : config.primaryColor,
                border: config.buttonStyle === 'outline' ? `2px solid ${config.primaryColor}` : 'none'
              }}
            >
              View Job
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
}