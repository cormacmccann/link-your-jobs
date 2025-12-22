import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Globe, 
  Palette, 
  ShoppingCart, 
  Rocket, 
  ArrowLeft,
  ArrowRight,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

const projectTypes = [
  { 
    id: 'website', 
    label: 'Website Design', 
    icon: Globe,
    description: 'New website or redesign'
  },
  { 
    id: 'branding', 
    label: 'Branding & Logo', 
    icon: Palette,
    description: 'Logo, brand identity, guidelines'
  },
  { 
    id: 'ecommerce', 
    label: 'E-commerce', 
    icon: ShoppingCart,
    description: 'Online store, product pages'
  },
  { 
    id: 'other', 
    label: 'Other Project', 
    icon: Rocket,
    description: 'Something else'
  },
];

export default function NewRequest() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    projectType: '',
    title: '',
    description: '',
    budget: '',
    timeline: '',
  });

  const handleSubmit = async () => {
    if (!formData.title || !formData.projectType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: userRole } = await supabase
        .from("user_roles")
        .select("organization_id")
        .eq("user_id", user.id)
        .single();

      if (!userRole?.organization_id) {
        throw new Error("No organization found");
      }

      // Create the project card
      const { error } = await supabase
        .from("cards")
        .insert({
          organization_id: userRole.organization_id,
          created_by: user.id,
          card_type: "project" as const,
          title: formData.title,
          description: `**Project Type:** ${formData.projectType}\n\n${formData.description}\n\n**Budget:** ${formData.budget || 'Not specified'}\n\n**Timeline:** ${formData.timeline || 'Not specified'}`,
          status: "active" as const,
          priority: "medium" as const,
        } as any);

      if (error) throw error;

      toast({
        title: "Request submitted!",
        description: "We'll review your project and get back to you soon.",
      });

      navigate("/portal/stream");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-6 -ml-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div 
            key={s}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              s <= step ? "bg-acc-violet" : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Step 1: Project Type */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">What type of project?</h1>
            <p className="text-muted-foreground mt-1">
              Select the category that best describes your project
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {projectTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = formData.projectType === type.id;
              
              return (
                <Card 
                  key={type.id}
                  className={cn(
                    "cursor-pointer transition-all hover:border-acc-violet/50",
                    isSelected && "border-acc-violet bg-acc-violet/5"
                  )}
                  onClick={() => setFormData({ ...formData, projectType: type.id })}
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center mb-3",
                      isSelected ? "bg-acc-violet text-white" : "bg-muted"
                    )}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium">{type.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Button 
            onClick={() => setStep(2)}
            disabled={!formData.projectType}
            className="w-full bg-acc-violet hover:bg-acc-violet/90"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Step 2: Project Details */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Tell us about your project</h1>
            <p className="text-muted-foreground mt-1">
              The more detail you provide, the better we can help
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Name *</Label>
              <Input
                id="title"
                placeholder="e.g., Company Website Redesign"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what you're looking for, any specific features, inspiration websites, etc."
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
              Back
            </Button>
            <Button 
              onClick={() => setStep(3)}
              disabled={!formData.title}
              className="flex-1 bg-acc-violet hover:bg-acc-violet/90"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Budget & Timeline */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Budget & Timeline</h1>
            <p className="text-muted-foreground mt-1">
              This helps us scope the project (optional)
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Input
                id="budget"
                placeholder="e.g., €2,000 - €5,000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Desired Timeline</Label>
              <Input
                id="timeline"
                placeholder="e.g., 4-6 weeks, by end of March"
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              />
            </div>
          </div>

          {/* Summary */}
          <Card className="bg-muted/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Type:</strong> {projectTypes.find(t => t.id === formData.projectType)?.label}</p>
              <p><strong>Project:</strong> {formData.title}</p>
              {formData.budget && <p><strong>Budget:</strong> {formData.budget}</p>}
              {formData.timeline && <p><strong>Timeline:</strong> {formData.timeline}</p>}
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
              Back
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-acc-violet hover:bg-acc-violet/90"
            >
              {loading ? "Submitting..." : "Submit Request"}
              <Check className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
