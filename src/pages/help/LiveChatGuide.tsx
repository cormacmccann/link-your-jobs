import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Code, Bell, Users } from "lucide-react";
import kamrokLogo from "@/assets/kamrok-logo.png";

export default function LiveChatGuide() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/help" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Help Center
          </Link>
          <Link to="/">
            <img src={kamrokLogo} alt="KAMROK" className="h-8" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-acc-cyan/10">
            <MessageCircle className="h-8 w-8 text-acc-cyan" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Live Chat</h1>
            <p className="text-muted-foreground">Real-time customer communication</p>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <p className="text-lg">
            Add a live chat widget to your website and manage conversations in real-time. Convert visitors to leads and provide instant support.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="border rounded-xl p-6">
            <MessageCircle className="h-8 w-8 text-acc-cyan mb-3" />
            <h3 className="font-semibold text-lg mb-2">Real-Time Messaging</h3>
            <p className="text-muted-foreground text-sm">Instant communication with website visitors using WebSocket technology.</p>
          </div>
          <div className="border rounded-xl p-6">
            <Users className="h-8 w-8 text-acc-violet mb-3" />
            <h3 className="font-semibold text-lg mb-2">Visitor Tracking</h3>
            <p className="text-muted-foreground text-sm">See which page visitors are on, their browser, and location.</p>
          </div>
          <div className="border rounded-xl p-6">
            <Bell className="h-8 w-8 text-orange-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Notifications</h3>
            <p className="text-muted-foreground text-sm">Get notified of new chats so you never miss a conversation.</p>
          </div>
          <div className="border rounded-xl p-6">
            <Code className="h-8 w-8 text-green-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Easy Embed</h3>
            <p className="text-muted-foreground text-sm">Add one line of code to your website to enable chat.</p>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="border rounded-xl p-6 mb-8" id="setup">
          <h2 className="text-xl font-semibold mb-4">Setting Up Live Chat</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-cyan text-white rounded-full flex items-center justify-center font-semibold">1</span>
              <div>
                <p className="font-medium">Go to Mission Control → Live Chat</p>
                <p className="text-sm text-muted-foreground">Access the Live Chat dashboard from the Mission Control menu.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-cyan text-white rounded-full flex items-center justify-center font-semibold">2</span>
              <div>
                <p className="font-medium">Copy the embed code</p>
                <p className="text-sm text-muted-foreground">Find your unique widget code in the setup section.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-cyan text-white rounded-full flex items-center justify-center font-semibold">3</span>
              <div>
                <p className="font-medium">Add to your website</p>
                <p className="text-sm text-muted-foreground">Paste the code before the closing &lt;/body&gt; tag on your website.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-cyan text-white rounded-full flex items-center justify-center font-semibold">4</span>
              <div>
                <p className="font-medium">Customize appearance (optional)</p>
                <p className="text-sm text-muted-foreground">Match the widget colors to your brand.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Embed Code Example */}
        <div className="border rounded-xl p-6 mb-8 bg-gray-900 text-gray-100">
          <h3 className="font-semibold mb-4 text-gray-100">Example Embed Code</h3>
          <pre className="text-sm overflow-x-auto">
            <code>{`<script src="https://kamrok.dev/chat-widget.js" 
  data-org-id="your-org-id">
</script>`}</code>
          </pre>
        </div>

        {/* Managing Conversations */}
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Managing Conversations</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Responding to Chats</h4>
              <p className="text-sm text-muted-foreground">When a visitor sends a message, it appears in your Live Chat dashboard. Click to respond in real-time.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Converting to Contacts</h4>
              <p className="text-sm text-muted-foreground">When a visitor provides their email, you can convert them to a CRM contact with one click.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Chat History</h4>
              <p className="text-sm text-muted-foreground">All conversations are saved. View past chats linked to contacts in your CRM.</p>
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-6 bg-muted/30">
          <h3 className="font-semibold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/help/people" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">People & Companies</h4>
              <p className="text-sm text-muted-foreground">Convert chat visitors to contacts</p>
            </Link>
            <Link to="/help/automations" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Automations</h4>
              <p className="text-sm text-muted-foreground">Auto-respond to common questions</p>
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center border-t pt-8">
          <p className="text-muted-foreground mb-4">Was this article helpful?</p>
          <div className="flex justify-center gap-4">
            <Button variant="outline">👍 Yes</Button>
            <Button variant="outline">👎 No</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
