import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Brain, TrendingUp, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ContactInsightsPanelProps {
  contactId: string;
  organizationId: string;
}

export function ContactInsightsPanel({ contactId, organizationId }: ContactInsightsPanelProps) {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<any>(null);
  const [score, setScore] = useState<any>(null);
  const { toast } = useToast();

  const loadInsights = async () => {
    setLoading(true);
    try {
      const [insightsRes, scoreRes] = await Promise.all([
        supabase.functions.invoke('ai-contact-insights', {
          body: { contactId, organizationId }
        }),
        supabase.functions.invoke('ai-lead-scoring', {
          body: { contactId, organizationId }
        })
      ]);

      if (insightsRes.error) throw insightsRes.error;
      if (scoreRes.error) throw scoreRes.error;

      setInsights(insightsRes.data);
      setScore(scoreRes.data);
    } catch (error: any) {
      console.error('Error loading insights:', error);
      toast({
        title: "Error",
        description: "Failed to load AI insights",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, [contactId]);

  const getEngagementColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'hot': return 'bg-red-500';
      case 'warm': return 'bg-orange-500';
      case 'cold': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Lead Score
          </CardTitle>
          <CardDescription>AI-powered contact scoring</CardDescription>
        </CardHeader>
        <CardContent>
          {score && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overall Score</span>
                <span className={`text-3xl font-bold ${getScoreColor(score.totalScore)}`}>
                  {score.totalScore}/100
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-foreground">{score.engagementScore}</div>
                  <div className="text-xs text-muted-foreground">Engagement</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{score.fitScore}</div>
                  <div className="text-xs text-muted-foreground">Fit</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{score.activityScore}</div>
                  <div className="text-xs text-muted-foreground">Activity</div>
                </div>
              </div>
              <Badge className={getScoreColor(score.totalScore)}>
                Grade: {score.grade}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Insights
          </CardTitle>
          <CardDescription>Smart recommendations and analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights && (
            <>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium">Engagement Level</span>
                  <Badge className={getEngagementColor(insights.engagementLevel)}>
                    {insights.engagementLevel}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Key Insights
                </h4>
                <ul className="space-y-2">
                  {Array.isArray(insights.insights) && insights.insights.map((insight: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Recommended Actions
                </h4>
                <ul className="space-y-2">
                  {Array.isArray(insights.nextActions) && insights.nextActions.map((action: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {Array.isArray(insights.risks) && insights.risks.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-orange-500">
                      <AlertCircle className="h-4 w-4" />
                      Risk Factors
                    </h4>
                    <ul className="space-y-2">
                      {insights.risks.map((risk: string, i: number) => (
                        <li key={i} className="text-sm text-orange-500 flex items-start gap-2">
                          <span>⚠</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </>
          )}

          <Button onClick={loadInsights} variant="outline" className="w-full">
            Refresh Insights
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}