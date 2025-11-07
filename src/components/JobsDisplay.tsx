import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Briefcase, Clock } from "lucide-react";
import { format } from "date-fns";

interface Job {
  id: string;
  company_name: string;
  job_title: string;
  job_url: string;
  location?: string;
  job_type?: string;
  description?: string;
  posted_date?: string;
  last_synced_at: string;
  created_at: string;
}

interface JobsDisplayProps {
  linkedinUrl?: string;
  jobSourceId?: string;
}

export const JobsDisplay = ({ linkedinUrl, jobSourceId }: JobsDisplayProps) => {
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['jobs', linkedinUrl, jobSourceId],
    queryFn: async () => {
      let query = supabase
        .from('jobs')
        .select('*')
        .order('posted_date', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });

      if (jobSourceId) {
        query = query.eq('job_source_id', jobSourceId);
      } else if (linkedinUrl) {
        query = query.eq('linkedin_url', linkedinUrl);
      } else {
        return [];
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Job[];
    },
    enabled: !!(linkedinUrl || jobSourceId),
  });

  if (!linkedinUrl && !jobSourceId) {
    return (
      <div className="text-center py-12">
        <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Enter a LinkedIn URL to view synced jobs</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border-destructive">
        <p className="text-destructive">Error loading jobs: {error.message}</p>
      </Card>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Jobs Found</h3>
        <p className="text-muted-foreground mb-4">
          No jobs have been synced yet.
        </p>
        <p className="text-sm text-muted-foreground">
          Click "Sync" to fetch the latest job listings.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {jobs.length} Job{jobs.length !== 1 ? 's' : ''} Found
        </h3>
        {jobs.length > 0 && (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Last synced: {format(new Date(jobs[0].last_synced_at), 'MMM d, yyyy HH:mm')}
          </p>
        )}
      </div>

      {jobs.map((job) => (
        <Card 
          key={job.id} 
          className="p-6 hover:shadow-[var(--shadow-card)] transition-[var(--transition-smooth)] border-border"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {job.job_title}
                </h3>
                <p className="text-primary font-medium">{job.company_name}</p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                {job.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                )}
                {job.job_type && (
                  <Badge variant="secondary">{job.job_type}</Badge>
                )}
                {job.posted_date && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Posted {format(new Date(job.posted_date), 'MMM d, yyyy')}
                  </div>
                )}
              </div>

              {job.description && (
                <p className="text-muted-foreground line-clamp-2">
                  {job.description}
                </p>
              )}
            </div>

            <a
              href={job.job_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-[var(--transition-smooth)] font-medium"
            >
              View Job
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
};
