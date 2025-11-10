import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';

const connections = new Map();

serve(async (req) => {
  const { headers } = req;
  const upgradeHeader = headers.get("upgrade") || "";

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 });
  }

  const url = new URL(req.url);
  const organizationId = url.searchParams.get('organizationId');

  if (!organizationId) {
    return new Response("Missing organizationId", { status: 400 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  let conversationId: string;
  let visitorId: string;

  socket.onopen = () => {
    console.log('WebSocket connection opened');
  };

  socket.onmessage = async (event) => {
    try {
      const data = JSON.parse(event.data);

      if (data.type === 'init') {
        visitorId = data.visitorId;
        
        console.log('Initializing chat for visitor:', visitorId);
        
        // Find or create conversation
        let { data: conversation } = await supabase
          .from('chat_conversations')
          .select('*')
          .eq('visitor_id', visitorId)
          .eq('organization_id', organizationId)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (!conversation) {
          const { data: newConv } = await supabase
            .from('chat_conversations')
            .insert({
              organization_id: organizationId,
              visitor_id: visitorId,
              visitor_metadata: data.metadata || {},
              visitor_name: data.visitorName,
              visitor_email: data.visitorEmail,
              first_message_at: new Date().toISOString(),
              last_message_at: new Date().toISOString(),
            })
            .select()
            .single();
          conversation = newConv;
        }

        conversationId = conversation.id;
        connections.set(visitorId, socket);

        // Send welcome message
        socket.send(JSON.stringify({
          type: 'message',
          sender: 'system',
          content: 'Welcome! How can we help you today?',
          timestamp: new Date().toISOString(),
        }));

        // Load recent messages
        const { data: messages } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true })
          .limit(50);

        if (messages && messages.length > 0) {
          socket.send(JSON.stringify({
            type: 'history',
            messages: messages,
          }));
        }
      }

      if (data.type === 'message') {
        console.log('Received message from visitor:', visitorId);
        
        // Save message to database
        const { data: savedMessage } = await supabase
          .from('chat_messages')
          .insert({
            conversation_id: conversationId,
            message_content: data.content,
            sender_type: 'visitor',
            message_type: 'text',
          })
          .select()
          .single();

        // Echo back to sender
        socket.send(JSON.stringify({
          type: 'message',
          id: savedMessage.id,
          sender: 'visitor',
          content: data.content,
          timestamp: savedMessage.created_at,
        }));
        
        // Update last message timestamp
        await supabase
          .from('chat_conversations')
          .update({ 
            last_message_at: new Date().toISOString(),
            visitor_email: data.visitorEmail || null,
            visitor_name: data.visitorName || null,
          })
          .eq('id', conversationId);
      }

      if (data.type === 'agent_message') {
        // Save agent message
        await supabase
          .from('chat_messages')
          .insert({
            conversation_id: conversationId,
            message_content: data.content,
            sender_type: 'agent',
            sender_id: data.agentId,
            message_type: 'text',
          });

        // Send to visitor
        const visitorSocket = connections.get(visitorId);
        if (visitorSocket) {
          visitorSocket.send(JSON.stringify({
            type: 'message',
            sender: 'agent',
            content: data.content,
            timestamp: new Date().toISOString(),
          }));
        }
      }
    } catch (error) {
      console.error('Error handling message:', error);
      socket.send(JSON.stringify({
        type: 'error',
        message: 'Failed to process message',
      }));
    }
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed for:', visitorId);
    connections.delete(visitorId);
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  return response;
});
