import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, User, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function LiveChatDashboard() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    initChat();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);
      subscribeToMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const initChat = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      setUserId(user.id);

      const { data: orgs } = await supabase.rpc('get_user_organizations', {
        _user_id: user.id
      });

      if (orgs && orgs.length > 0) {
        loadConversations(orgs[0].id);
        subscribeToConversations(orgs[0].id);
      }
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  };

  const loadConversations = async (orgId: string) => {
    const { data, error } = await supabase
      .from('chat_conversations')
      .select('*')
      .eq('organization_id', orgId)
      .eq('status', 'active')
      .order('last_message_at', { ascending: false });

    if (error) {
      console.error('Error loading conversations:', error);
      return;
    }

    setConversations(data || []);
  };

  const loadMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
      return;
    }

    setMessages(data || []);
  };

  const subscribeToConversations = (orgId: string) => {
    const channel = supabase
      .channel('chat-conversations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_conversations',
          filter: `organization_id=eq.${orgId}`,
        },
        () => {
          loadConversations(orgId);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const subscribeToMessages = (conversationId: string) => {
    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: selectedConversation.id,
          message_content: newMessage,
          sender_type: 'agent',
          sender_id: userId,
          message_type: 'text',
        });

      if (error) throw error;

      await supabase
        .from('chat_conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', selectedConversation.id);

      setNewMessage("");
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="grid grid-cols-[300px,1fr] gap-4 h-[600px]">
      {/* Conversations List */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Active Chats ({conversations.length})</h3>
        <ScrollArea className="h-[520px]">
          <div className="space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedConversation?.id === conv.id
                    ? 'bg-primary/10 border border-primary'
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4" />
                  <span className="font-medium text-sm">
                    {conv.visitor_name || conv.visitor_email || `Visitor ${conv.visitor_id.slice(0, 8)}`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatTime(conv.last_message_at)}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Chat Window */}
      <Card className="p-4 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="border-b pb-3 mb-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    {selectedConversation.visitor_name || selectedConversation.visitor_email || 'Anonymous Visitor'}
                  </h3>
                  {selectedConversation.visitor_email && (
                    <p className="text-sm text-muted-foreground">{selectedConversation.visitor_email}</p>
                  )}
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  Active
                </Badge>
              </div>
            </div>

            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender_type === 'agent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender_type === 'agent'
                          ? 'bg-primary text-primary-foreground'
                          : msg.sender_type === 'system'
                          ? 'bg-muted text-muted-foreground italic'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{msg.message_content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(msg.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="flex gap-2 mt-4">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
              />
              <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a conversation to start chatting
          </div>
        )}
      </Card>
    </div>
  );
}
