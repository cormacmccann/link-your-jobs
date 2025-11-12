import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Star, Plus, Trash2, Edit, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ReviewManagerProps {
  organizationId: string;
}

export function ReviewManager({ organizationId }: ReviewManagerProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<any>(null);
  const [formData, setFormData] = useState({
    reviewer_name: "",
    reviewer_avatar: "",
    rating: 5,
    title: "",
    content: "",
    verified: false,
    source_url: "https://uk.trustpilot.com/review/www.kamrok.com",
  });

  const { data: reviews } = useQuery({
    queryKey: ["reviews", organizationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("organization_id", organizationId)
        .order("review_date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("reviews").insert({
        organization_id: organizationId,
        ...formData,
        review_date: new Date().toISOString(),
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Review added successfully" });
      queryClient.invalidateQueries({ queryKey: ["reviews", organizationId] });
      setFormData({
        reviewer_name: "",
        reviewer_avatar: "",
        rating: 5,
        title: "",
        content: "",
        verified: false,
        source_url: "https://uk.trustpilot.com/review/www.kamrok.com",
      });
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: "Failed to add review", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      const { error } = await supabase.from("reviews").delete().eq("id", reviewId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Review deleted" });
      queryClient.invalidateQueries({ queryKey: ["reviews", organizationId] });
    },
  });

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? "fill-green-500 text-green-500" : "text-muted-foreground"
            } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
            onClick={() => interactive && onChange?.(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Review Management</CardTitle>
            <CardDescription>Manage Trustpilot reviews for your organization</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Review
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Trustpilot Review</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Reviewer Name *</Label>
                    <Input
                      value={formData.reviewer_name}
                      onChange={(e) => setFormData({ ...formData, reviewer_name: e.target.value })}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <Label>Avatar URL (optional)</Label>
                    <Input
                      value={formData.reviewer_avatar}
                      onChange={(e) => setFormData({ ...formData, reviewer_avatar: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <Label>Rating *</Label>
                  <div className="mt-2">
                    {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }))}
                  </div>
                </div>

                <div>
                  <Label>Review Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Excellent service!"
                  />
                </div>

                <div>
                  <Label>Review Content *</Label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Share your experience..."
                    rows={5}
                  />
                </div>

                <div>
                  <Label>Trustpilot Review URL</Label>
                  <Input
                    value={formData.source_url}
                    onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                    placeholder="https://uk.trustpilot.com/review/..."
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={formData.verified}
                    onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="verified" className="cursor-pointer">
                    Verified Purchase
                  </Label>
                </div>

                <Button
                  onClick={() => createMutation.mutate()}
                  disabled={!formData.reviewer_name || !formData.content || createMutation.isPending}
                  className="w-full"
                >
                  Add Review
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {!reviews || reviews.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Star className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No reviews yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{review.reviewer_name}</span>
                      {review.verified && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Verified
                        </Badge>
                      )}
                    </div>
                    {renderStars(review.rating)}
                    {review.title && (
                      <p className="font-medium mt-2">{review.title}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">{review.content}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{new Date(review.review_date).toLocaleDateString()}</span>
                      {review.source_url && (
                        <a href={review.source_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                          View on Trustpilot <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMutation.mutate(review.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}