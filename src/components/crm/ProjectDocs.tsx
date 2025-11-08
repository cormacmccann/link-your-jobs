import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, FileText, Pencil } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface ProjectDocsProps {
  projectId: string;
}

export function ProjectDocs({ projectId }: ProjectDocsProps) {
  const [isAddDocOpen, setIsAddDocOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [isEditingDoc, setIsEditingDoc] = useState(false);

  const { data: documents, refetch } = useQuery({
    queryKey: ["project-documents", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_documents")
        .select(`
          *,
          created_by_profile:profiles!project_documents_created_by_fkey (
            id,
            email,
            full_name
          )
        `)
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleAddDoc = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("project_documents").insert([{
      project_id: projectId,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      doc_type: "doc",
      created_by: user.id,
    }]);

    if (error) {
      toast.error("Failed to create document");
    } else {
      toast.success("Document created");
      setIsAddDocOpen(false);
      refetch();
    }
  };

  const handleUpdateDoc = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDoc) return;

    const formData = new FormData(e.currentTarget);

    const { error } = await supabase
      .from("project_documents")
      .update({
        title: formData.get("title") as string,
        content: formData.get("content") as string,
      })
      .eq("id", selectedDoc.id);

    if (error) {
      toast.error("Failed to update document");
    } else {
      toast.success("Document updated");
      setIsEditingDoc(false);
      setSelectedDoc(null);
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Documents & Files</h3>
        <Dialog open={isAddDocOpen} onOpenChange={setIsAddDocOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Document</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddDoc} className="space-y-4">
              <div>
                <Label htmlFor="title">Document Title</Label>
                <Input id="title" name="title" required placeholder="e.g., Project Requirements" />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" name="content" rows={10} placeholder="Write your document content here..." />
              </div>
              <Button type="submit" className="w-full">Create Document</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {selectedDoc && !isEditingDoc ? (
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">{selectedDoc.title}</h3>
              <p className="text-sm text-muted-foreground">
                Created by {selectedDoc.created_by_profile?.full_name || selectedDoc.created_by_profile?.email} on{" "}
                {format(new Date(selectedDoc.created_at), "MMM d, yyyy")}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditingDoc(true)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedDoc(null)}>
                Back to List
              </Button>
            </div>
          </div>
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-foreground">{selectedDoc.content || "No content"}</div>
          </div>
        </Card>
      ) : selectedDoc && isEditingDoc ? (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Edit Document</h3>
          <form onSubmit={handleUpdateDoc} className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Document Title</Label>
              <Input id="edit-title" name="title" required defaultValue={selectedDoc.title} />
            </div>
            <div>
              <Label htmlFor="edit-content">Content</Label>
              <Textarea id="edit-content" name="content" rows={15} defaultValue={selectedDoc.content || ""} />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">Save Changes</Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setIsEditingDoc(false);
                  setSelectedDoc(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents?.map((doc) => (
            <Card
              key={doc.id}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-primary"
              onClick={() => setSelectedDoc(doc)}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium mb-1 truncate">{doc.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(doc.created_at), "MMM d, yyyy")}
                  </p>
                  {doc.content && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{doc.content}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
          {(!documents || documents.length === 0) && (
            <Card className="p-12 text-center col-span-full">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No documents yet. Create one to get started!</p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
