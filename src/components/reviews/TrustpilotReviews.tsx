import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, ExternalLink, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrustpilotReviewsProps {
  organizationId?: string;
  limit?: number;
  showHeader?: boolean;
}

export function TrustpilotReviews({ organizationId, limit = 6, showHeader = true }: TrustpilotReviewsProps) {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews", organizationId],
    queryFn: async () => {
      let query = supabase
        .from("reviews")
        .select("*")
        .order("review_date", { ascending: false });

      if (organizationId) {
        query = query.eq("organization_id", organizationId);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const averageRating = reviews?.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const totalReviews = reviews?.length || 0;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "fill-green-500 text-green-500" : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6 space-y-4">
              <div className="h-20 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {showHeader && (
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-6 py-3 rounded-full border border-green-500/20">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Trusted by Our Clients</span>
          </div>
          
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="flex items-baseline gap-2 justify-center">
                <span className="text-5xl font-bold">{averageRating}</span>
                <span className="text-muted-foreground">/5</span>
              </div>
              <div className="flex justify-center mt-2">
                {renderStars(Math.round(parseFloat(averageRating)))}
              </div>
            </div>
            
            <div className="h-16 w-px bg-border" />
            
            <div className="text-center">
              <div className="text-3xl font-bold">{totalReviews}</div>
              <div className="text-sm text-muted-foreground">Total Reviews</div>
            </div>
          </div>

          <Button variant="outline" asChild>
            <a href="https://uk.trustpilot.com/review/www.kamrok.com" target="_blank" rel="noopener noreferrer">
              View on Trustpilot <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews?.map((review) => (
          <Card key={review.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.reviewer_avatar || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {review.reviewer_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.reviewer_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.review_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                {review.verified && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Verified
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                {renderStars(review.rating)}
              </div>

              {review.title && (
                <CardTitle className="text-base">{review.title}</CardTitle>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-4">
                {review.content}
              </p>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm">{review.helpful_count} helpful</span>
                </div>
                
                {review.source_url && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={review.source_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!reviews || reviews.length === 0) && (
        <Card>
          <CardContent className="text-center py-12">
            <Star className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
            <p className="text-muted-foreground">Be the first to leave a review!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}