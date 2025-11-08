import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface ProjectMessagesProps {
  projectId: string;
  orgId: string;
}

export function ProjectMessages({ projectId, orgId }: ProjectMessagesProps) {
  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const { data: messageBoards, refetch: refetchBoards } = useQuery({
    queryKey: ["message-boards", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("message_boards")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: messages, refetch: refetchMessages } = useQuery({
    queryKey: ["messages", selectedBoard],
    queryFn: async () => {
      if (!selectedBoard) return [];
      
      const { data, error } = await supabase
        .from("messages")
        .select(`
          *,
          profiles!messages_created_by_fkey (
            id,
            email,
            full_name
          )
        `)
        .eq("message_board_id", selectedBoard)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!selectedBoard,
  });

  const handleAddMessageBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("message_boards").insert([{
      organization_id: orgId,
      project_id: projectId,
      title: formData.get("title") as string,
      created_by: user.id,
    }]);

    if (error) {
      toast.error("Failed to create message board");
    } else {
      toast.success("Message board created");
      setIsAddBoardOpen(false);
      refetchBoards();
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedBoard) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("messages").insert([{
      message_board_id: selectedBoard,
      content: newMessage,
      created_by: user.id,
    }]);

    if (error) {
      toast.error("Failed to send message");
    } else {
      setNewMessage("");
      refetchMessages();
    }
  };

  const selectedBoardData = messageBoards?.find(b => b.id === selectedBoard);

  return (
    <div className="space-y-6">
      {!selectedBoard ? (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Message Boards</h3>
            <Dialog open={isAddBoardOpen} onOpenChange={setIsAddBoardOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Board
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Message Board</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddMessageBoard} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Board Title</Label>
                    <Input id="title" name="title" required placeholder="e.g., General Discussion" />
                  </div>
                  <Button type="submit" className="w-full">Create Board</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {messageBoards?.map((board) => (
              <Card
                key={board.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-primary"
                onClick={() => setSelectedBoard(board.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{board.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      Created {format(new Date(board.created_at), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
            {(!messageBoards || messageBoards.length === 0) && (
              <Card className="p-12 text-center col-span-full">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No message boards yet. Create one to start discussions!</p>
              </Card>
            )}
          </div>
        </>
      ) : (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{selectedBoardData?.title}</h3>
            <Button variant="outline" size="sm" onClick={() => setSelectedBoard(null)}>
              Back to Boards
            </Button>
          </div>

          <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
            {messages?.map((message: any) => (
              <div key={message.id} className="p-4 border rounded-lg hover:bg-accent/5">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-sm">
                    {message.profiles?.full_name || message.profiles?.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(message.created_at), "MMM d, h:mm a")}
                  </p>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            ))}
            {(!messages || messages.length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No messages yet. Start the conversation!
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
