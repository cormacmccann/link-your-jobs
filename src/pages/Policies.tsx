import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Policies() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: policies, isLoading } = useQuery({
    queryKey: ['policies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('policies')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const createNewPolicy = async (policyType: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to create a policy",
          variant: "destructive"
        });
        return;
      }

      // Create new policy
      const { data: policy, error: policyError } = await supabase
        .from('policies')
        .insert({
          user_id: user.id,
          policy_type: policyType,
          website_url: '',
          status: 'draft'
        })
        .select()
        .single();

      if (policyError) throw policyError;

      // Create conversation for this policy
      const { data: conversation, error: conversationError } = await supabase
        .from('policy_conversations')
        .insert({
          policy_id: policy.id,
          messages: [],
          answers: {}
        })
        .select()
        .single();

      if (conversationError) throw conversationError;

      navigate(`/policies/${policy.id}`);
    } catch (error: any) {
      console.error('Error creating policy:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const policyTypes = [
    { type: 'privacy', label: 'Privacy Policy', icon: '🔒' },
    { type: 'cookie', label: 'Cookie Policy', icon: '🍪' },
    { type: 'terms', label: 'Terms of Service', icon: '📄' },
    { type: 'gdpr', label: 'GDPR Compliance', icon: '🇪🇺' },
    { type: 'ccpa', label: 'CCPA Compliance', icon: '🇺🇸' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Policy Generator</h1>
          <p className="text-muted-foreground">Create and manage legal policies for your websites</p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Create New Policy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {policyTypes.map((policy) => (
              <Card
                key={policy.type}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => createNewPolicy(policy.type)}
              >
                <div className="text-4xl mb-3">{policy.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{policy.label}</h3>
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Create
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Policies</h2>
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : policies && policies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {policies.map((policy) => (
                <Card
                  key={policy.id}
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/policies/${policy.id}`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <FileText className="w-8 h-8 text-primary" />
                    <span className={`px-2 py-1 text-xs rounded ${
                      policy.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {policy.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 capitalize">
                    {policy.policy_type.replace('_', ' ')} Policy
                  </h3>
                  {policy.website_name && (
                    <p className="text-sm text-muted-foreground mb-1">{policy.website_name}</p>
                  )}
                  {policy.website_url && (
                    <p className="text-xs text-muted-foreground truncate">{policy.website_url}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-3">
                    v{policy.version} • {new Date(policy.updated_at).toLocaleDateString()}
                  </p>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No policies yet. Create your first one above!</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}