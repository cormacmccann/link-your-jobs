import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Loader2 } from "lucide-react";

interface AIEmailComposerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactName?: string;
  companyName?: string;
  onEmailGenerated?: (email: string) => void;
}

export function AIEmailComposer({ 
  open, 
  onOpenChange, 
  contactName = "", 
  companyName = "",
  onEmailGenerated 
}: AIEmailComposerProps) {
  const [loading, setLoading] = useState(false);
  const [purpose, setPurpose] = useState("introduction");
  const [tone, setTone] = useState("professional");
  const [context, setContext] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-email-composer', {
        body: {
          contactName,
          companyName,
          purpose,
          tone,
          context
        }
      });

      if (error) throw error;

      setGeneratedEmail(data.emailBody);
      if (onEmailGenerated) {
        onEmailGenerated(data.emailBody);
      }
      
      toast({
        title: "Email generated!",
        description: "Your AI-powered email is ready.",
      });
    } catch (error: any) {
      console.error('Error generating email:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate email",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Email Composer
          </DialogTitle>
          <DialogDescription>
            Generate personalized emails powered by AI
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Contact Name</Label>
              <Input value={contactName} disabled />
            </div>
            <div className="space-y-2">
              <Label>Company (Optional)</Label>
              <Input value={companyName} disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email Purpose</Label>
            <Select value={purpose} onValueChange={setPurpose}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="introduction">Introduction</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="meeting-request">Meeting Request</SelectItem>
                <SelectItem value="check-in">Check-in</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Additional Context (Optional)</Label>
            <Textarea
              placeholder="Add any specific details you want to include..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={3}
            />
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Email
              </>
            )}
          </Button>

          {generatedEmail && (
            <div className="space-y-2">
              <Label>Generated Email</Label>
              <Textarea
                value={generatedEmail}
                onChange={(e) => setGeneratedEmail(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                You can edit the generated email before sending
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}