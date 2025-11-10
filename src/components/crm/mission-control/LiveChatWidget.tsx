import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function LiveChatWidget() {
  const [config, setConfig] = useState({
    enabled: false,
    widgetColor: "#3b82f6",
    welcomeMessage: "Hi! How can we help you today?",
    position: "bottom-right",
    organizationId: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: orgs } = await supabase.rpc('get_user_organizations', {
        _user_id: user.id
      });

      if (orgs && orgs.length > 0) {
        setConfig(prev => ({ ...prev, organizationId: orgs[0].id }));
      }
    } catch (error) {
      console.error('Error loading config:', error);
    }
  };

  const embedCode = `<!-- Kamrok Live Chat Widget -->
<div id="kamrok-chat-widget"></div>
<script>
  (function() {
    var widgetId = '${config.organizationId}';
    var ws = new WebSocket('wss://nwmwwpwpokcwwjhgxwxe.supabase.co/functions/v1/chat-websocket?organizationId=' + widgetId);
    var visitorId = localStorage.getItem('kamrok_visitor_id') || Math.random().toString(36).substring(7);
    localStorage.setItem('kamrok_visitor_id', visitorId);
    
    // Create widget UI
    var bubble = document.createElement('div');
    bubble.style.cssText = 'position:fixed;${config.position === 'bottom-right' ? 'bottom:20px;right:20px' : 'bottom:20px;left:20px'};width:60px;height:60px;background:${config.widgetColor};border-radius:50%;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:9999;display:flex;align-items:center;justify-content:center;';
    bubble.innerHTML = '<svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';
    document.body.appendChild(bubble);
    
    var chatWindow = document.createElement('div');
    chatWindow.style.cssText = 'position:fixed;${config.position === 'bottom-right' ? 'bottom:90px;right:20px' : 'bottom:90px;left:20px'};width:350px;height:500px;background:white;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.15);z-index:9998;display:none;flex-direction:column;';
    chatWindow.innerHTML = '<div style="padding:16px;background:${config.widgetColor};color:white;border-radius:12px 12px 0 0;font-weight:600;">Live Chat</div><div id="messages" style="flex:1;overflow-y:auto;padding:16px;"></div><div style="padding:12px;border-top:1px solid #e5e7eb;"><input type="text" id="messageInput" placeholder="Type a message..." style="width:100%;padding:8px;border:1px solid #e5e7eb;border-radius:6px;"/></div>';
    document.body.appendChild(chatWindow);
    
    var messagesDiv = chatWindow.querySelector('#messages');
    var messageInput = chatWindow.querySelector('#messageInput');
    
    bubble.onclick = function() {
      chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
    };
    
    ws.onopen = function() {
      ws.send(JSON.stringify({
        type: 'init',
        visitorId: visitorId,
        metadata: { page: window.location.href, userAgent: navigator.userAgent }
      }));
    };
    
    ws.onmessage = function(event) {
      var data = JSON.parse(event.data);
      if (data.type === 'message') {
        var msgDiv = document.createElement('div');
        msgDiv.style.cssText = 'margin-bottom:12px;padding:8px 12px;border-radius:8px;' + (data.sender === 'visitor' ? 'background:#f3f4f6;margin-left:auto;max-width:70%;' : 'background:${config.widgetColor};color:white;max-width:70%;');
        msgDiv.textContent = data.content;
        messagesDiv.appendChild(msgDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      }
    };
    
    messageInput.onkeypress = function(e) {
      if (e.key === 'Enter' && messageInput.value.trim()) {
        ws.send(JSON.stringify({ type: 'message', content: messageInput.value }));
        messageInput.value = '';
      }
    };
  })();
</script>`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Copied!",
      description: "Embed code copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="enabled">Enable Live Chat</Label>
          <Switch
            id="enabled"
            checked={config.enabled}
            onCheckedChange={(enabled) => setConfig({ ...config, enabled })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Widget Color</Label>
          <div className="flex gap-2">
            <Input
              id="color"
              type="color"
              value={config.widgetColor}
              onChange={(e) => setConfig({ ...config, widgetColor: e.target.value })}
              className="w-20 h-10"
            />
            <Input
              value={config.widgetColor}
              onChange={(e) => setConfig({ ...config, widgetColor: e.target.value })}
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Welcome Message</Label>
          <Textarea
            id="message"
            value={config.welcomeMessage}
            onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <select
            id="position"
            value={config.position}
            onChange={(e) => setConfig({ ...config, position: e.target.value })}
            className="w-full rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="bottom-right">Bottom Right</option>
            <option value="bottom-left">Bottom Left</option>
          </select>
        </div>
      </div>

      {config.enabled && config.organizationId && (
        <Card className="p-4 bg-muted/50">
          <h3 className="font-semibold mb-2">Embed Code</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Copy and paste this code before the closing &lt;/body&gt; tag on your website
          </p>
          <div className="relative">
            <pre className="bg-background p-3 rounded-md text-xs overflow-x-auto max-h-[300px]">
              <code>{embedCode}</code>
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-2 right-2"
              onClick={copyEmbedCode}
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-4 bg-muted/50">
        <h3 className="font-semibold mb-2">Features</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>✓ Real-time WebSocket connections</li>
          <li>✓ Automatic lead capture and CRM integration</li>
          <li>✓ Mobile responsive design</li>
          <li>✓ Chat history and message persistence</li>
          <li>✓ Agent dashboard for managing conversations</li>
        </ul>
      </Card>
    </div>
  );
}
