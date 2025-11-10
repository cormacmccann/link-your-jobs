import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function LiveChatWidget() {
  const [config, setConfig] = useState({
    enabled: false,
    widgetColor: "#3b82f6",
    welcomeMessage: "Hi! How can we help you today?",
    position: "bottom-right",
  });
  const { toast } = useToast();

  const embedCode = `<script>
  (function() {
    var chatWidget = document.createElement('div');
    chatWidget.id = 'kamrok-chat-widget';
    chatWidget.style.cssText = 'position:fixed;${config.position.includes('right') ? 'right' : 'left'}:20px;bottom:20px;z-index:9999;';
    document.body.appendChild(chatWidget);
    
    var script = document.createElement('script');
    script.src = '${window.location.origin}/chat-widget.js';
    script.dataset.color = '${config.widgetColor}';
    script.dataset.message = '${config.welcomeMessage}';
    document.body.appendChild(script);
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

      {config.enabled && (
        <Card className="p-4 bg-muted/50">
          <h3 className="font-semibold mb-2">Embed Code</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Copy and paste this code before the closing &lt;/body&gt; tag on your website
          </p>
          <div className="relative">
            <pre className="bg-background p-3 rounded-md text-xs overflow-x-auto">
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

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          <Eye className="h-4 w-4 mr-2" />
          Preview Widget
        </Button>
        <Button className="flex-1">Save Settings</Button>
      </div>

      <Card className="p-4 bg-muted/50">
        <h3 className="font-semibold mb-2">Features</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>✓ Real-time conversations with visitors</li>
          <li>✓ Automatic lead capture and CRM integration</li>
          <li>✓ Mobile responsive design</li>
          <li>✓ Offline message collection</li>
          <li>✓ File sharing support</li>
          <li>✓ Chat history and transcripts</li>
        </ul>
      </Card>
    </div>
  );
}
