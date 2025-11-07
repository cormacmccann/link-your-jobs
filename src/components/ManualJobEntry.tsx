import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";

interface ManualJobEntryProps {
  linkedinUrl: string;
}

export const ManualJobEntry = ({ linkedinUrl }: ManualJobEntryProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    job_title: "",
    company_name: "",
    job_url: "",
    location: "",
    job_type: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!linkedinUrl) {
      toast({
        title: "Missing Source URL",
        description: "Please enter a source URL first",
        variant: "destructive",
      });
      return;
    }

    if (!formData.job_title || !formData.company_name || !formData.job_url) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in job title, company name, and job URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from('jobs').insert({
        ...formData,
        linkedin_url: linkedinUrl,
        posted_date: new Date().toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Job Added",
        description: "Job listing has been added successfully",
      });

      // Reset form
      setFormData({
        job_title: "",
        company_name: "",
        job_url: "",
        location: "",
        job_type: "",
        description: "",
      });

      // Refresh jobs list
      queryClient.invalidateQueries({ queryKey: ['jobs', linkedinUrl] });

    } catch (error) {
      console.error('Error adding job:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add job",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-6 shadow-[var(--shadow-card)] border-border">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Manual Job Entry</h3>
        <p className="text-sm text-muted-foreground">
          Add job listings manually when automated sync isn't available
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="job_title" className="text-foreground">
              Job Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="job_title"
              value={formData.job_title}
              onChange={(e) => handleChange('job_title', e.target.value)}
              placeholder="Software Engineer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_name" className="text-foreground">
              Company Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="company_name"
              value={formData.company_name}
              onChange={(e) => handleChange('company_name', e.target.value)}
              placeholder="Acme Corp"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="job_url" className="text-foreground">
            Job URL <span className="text-destructive">*</span>
          </Label>
          <Input
            id="job_url"
            type="url"
            value={formData.job_url}
            onChange={(e) => handleChange('job_url', e.target.value)}
            placeholder="https://example.com/jobs/123"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-foreground">
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Remote / London, UK"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="job_type" className="text-foreground">
              Job Type
            </Label>
            <Input
              id="job_type"
              value={formData.job_type}
              onChange={(e) => handleChange('job_type', e.target.value)}
              placeholder="Full-time / Contract"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-foreground">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Job description and requirements..."
            rows={4}
            className="resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading || !linkedinUrl}
          className="w-full bg-primary hover:bg-accent transition-[var(--transition-smooth)]"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          {isLoading ? 'Adding Job...' : 'Add Job Listing'}
        </Button>
      </form>
    </Card>
  );
};
