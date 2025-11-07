import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Download, Scan, Send } from "lucide-react";

export default function PolicyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const { data: policy, isLoading } = useQuery({
    queryKey: ['policy', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('policies')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      if (data.website_url) setWebsiteUrl(data.website_url);
      return data;
    },
    enabled: !!id,
  });

  const { data: conversation } = useQuery({
    queryKey: ['conversation', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('policy_conversations')
        .select('*')
        .eq('policy_id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: cookies } = useQuery({
    queryKey: ['cookies', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('detected_cookies')
        .select('*')
        .eq('policy_id', id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const scanCookiesMutation = useMutation({
    mutationFn: async () => {
      if (!websiteUrl) {
        throw new Error('Please enter a website URL first');
      }

      // Update policy with website URL
      const { error: updateError } = await supabase
        .from('policies')
        .update({ website_url: websiteUrl })
        .eq('id', id);

      if (updateError) throw updateError;

      const { data, error } = await supabase.functions.invoke('scan-cookies', {
        body: { websiteUrl, policyId: id }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: "Scan complete",
        description: `Detected ${data.count} cookies on your website`,
      });
      queryClient.invalidateQueries({ queryKey: ['cookies', id] });
      queryClient.invalidateQueries({ queryKey: ['policy', id] });
    },
    onError: (error: any) => {
      toast({
        title: "Scan failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (msg: string) => {
      const { data, error } = await supabase.functions.invoke('policy-chat', {
        body: { 
          conversationId: conversation?.id,
          message: msg,
          policyType: policy?.policy_type
        }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversation', id] });
      setMessage("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const downloadPolicy = () => {
    if (!policy?.content) {
      toast({
        title: "No content",
        description: "Generate your policy first by completing the conversation",
        variant: "destructive"
      });
      return;
    }

    const blob = new Blob([policy.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${policy.policy_type}-policy.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Policy not found</p>
      </div>
    );
  }

  const messages = conversation?.messages || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/policies')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Policies
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h1 className="text-2xl font-bold mb-4 capitalize">
                {policy.policy_type.replace('_', ' ')} Policy Generator
              </h1>

              {/* Website URL Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Website URL</label>
                <div className="flex gap-2">
                  <Input
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    disabled={isScanning}
                  />
                  <Button
                    onClick={() => {
                      setIsScanning(true);
                      scanCookiesMutation.mutate();
                      setTimeout(() => setIsScanning(false), 2000);
                    }}
                    disabled={!websiteUrl || isScanning}
                  >
                    <Scan className="w-4 h-4 mr-2" />
                    {isScanning ? 'Scanning...' : 'Scan'}
                  </Button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Start the conversation by typing a message below
                  </p>
                ) : (
                  messages.map((msg: any, idx: number) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground ml-12'
                          : 'bg-muted mr-12'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (message.trim()) {
                        sendMessageMutation.mutate(message);
                      }
                    }
                  }}
                />
                <Button
                  onClick={() => sendMessageMutation.mutate(message)}
                  disabled={!message.trim() || sendMessageMutation.isPending}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Generated Policy Preview */}
            {policy.content && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Generated Policy</h2>
                  <Button onClick={downloadPolicy} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
                <Textarea
                  value={policy.content}
                  readOnly
                  rows={15}
                  className="font-mono text-sm"
                />
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Detected Cookies */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Detected Cookies</h2>
              {cookies && cookies.length > 0 ? (
                <div className="space-y-3">
                  {cookies.map((cookie) => (
                    <div key={cookie.id} className="border-b pb-3 last:border-0">
                      <p className="font-medium text-sm">{cookie.cookie_name}</p>
                      <p className="text-xs text-muted-foreground">{cookie.purpose}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs bg-primary/10 px-2 py-1 rounded">
                          {cookie.cookie_type}
                        </span>
                        <span className="text-xs bg-muted px-2 py-1 rounded">
                          {cookie.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No cookies detected yet. Scan your website above.
                </p>
              )}
            </Card>

            {/* Policy Info */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Policy Information</h2>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    policy.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {policy.status}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Version:</span>
                  <span className="ml-2">{policy.version}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <span className="ml-2">{new Date(policy.created_at).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Updated:</span>
                  <span className="ml-2">{new Date(policy.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}