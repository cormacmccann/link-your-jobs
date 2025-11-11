import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, CheckCircle, HelpCircle, Flag, Plus, User } from "lucide-react";
import { format } from "date-fns";

interface ProjectActivityFeedProps {
  projectId: string;
  orgId: string;
}

export function ProjectActivityFeed({ projectId, orgId }: ProjectActivityFeedProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newPostContent, setNewPostContent] = useState("");
  const [postType, setPostType] = useState<"update" | "question" | "decision" | "milestone">("update");
  const [assignedTo, setAssignedTo] = useState<string>("");

  const { data: posts } = useQuery({
    queryKey: ["project-posts", projectId],
    queryFn: async () => {
      const { data } = await supabase
        .from("project_posts")
        .select(`
          *,
          creator:profiles!project_posts_created_by_fkey(full_name),
          assigned_user:profiles!project_posts_assigned_to_fkey(full_name)
        `)
        .eq("project_id", projectId)
        .is("parent_post_id", null)
        .order("created_at", { ascending: false });

      return (data || []) as any[];
    },
  });

  const { data: teamMembers } = useQuery({
    queryKey: ["team-members", orgId],
    queryFn: async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("user_id, profiles(id, full_name)")
        .eq("organization_id", orgId);

      return (data || []) as any[];
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("project_posts").insert({
        project_id: projectId,
        organization_id: orgId,
        content: newPostContent,
        post_type: postType,
        assigned_to: assignedTo || null,
        created_by: user.id,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Post created" });
      queryClient.invalidateQueries({ queryKey: ["project-posts", projectId] });
      setNewPostContent("");
      setAssignedTo("");
      setPostType("update");
    },
    onError: (error: Error) => {
      toast({ title: "Failed to create post", description: error.message, variant: "destructive" });
    },
  });

  const getPostIcon = (type: string) => {
    switch (type) {
      case "question": return <HelpCircle className="h-4 w-4" />;
      case "decision": return <Flag className="h-4 w-4" />;
      case "milestone": return <CheckCircle className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getPostBadgeVariant = (type: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case "question": return "secondary";
      case "decision": return "destructive";
      case "milestone": return "default";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">New Post</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Select value={postType} onValueChange={(value: any) => setPostType(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="question">Question</SelectItem>
                <SelectItem value="decision">Decision</SelectItem>
                <SelectItem value="milestone">Milestone</SelectItem>
              </SelectContent>
            </Select>

            {teamMembers && teamMembers.length > 0 && (
              <Select value={assignedTo} onValueChange={setAssignedTo}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Assign to someone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No assignment</SelectItem>
                  {teamMembers.map((member: any) => (
                    <SelectItem key={member.user_id} value={member.user_id}>
                      {member.profiles?.full_name || "Unknown"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <Textarea
            placeholder="What's happening with this project?"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            rows={4}
          />

          <Button 
            onClick={() => createPostMutation.mutate()}
            disabled={!newPostContent.trim() || createPostMutation.isPending}
          >
            <Plus className="h-4 w-4 mr-2" />
            Post Update
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        {posts?.map((post) => (
          <Card key={post.id} className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {post.creator?.full_name?.split(" ").map((n: string) => n[0]).join("") || <User className="h-5 w-5" />}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold">{post.creator?.full_name || "Unknown"}</span>
                  <Badge variant={getPostBadgeVariant(post.post_type)} className="gap-1">
                    {getPostIcon(post.post_type)}
                    {post.post_type}
                  </Badge>
                  {post.assigned_user && (
                    <Badge variant="outline" className="gap-1">
                      <User className="h-3 w-3" />
                      {post.assigned_user.full_name}
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(post.created_at), "MMM d, h:mm a")}
                  </span>
                </div>

                <p className="text-sm whitespace-pre-wrap">{post.content}</p>
              </div>
            </div>
          </Card>
        ))}

        {(!posts || posts.length === 0) && (
          <Card className="p-8 text-center text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No activity yet. Post the first update!</p>
          </Card>
        )}
      </div>
    </div>
  );
}