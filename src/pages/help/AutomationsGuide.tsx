import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, Play, GitBranch, Mail } from "lucide-react";
import kamrokLogo from "@/assets/kamrok-logo.png";

const triggerTypes = [
  { name: "Card Created", description: "When a new card is created" },
  { name: "Card Updated", description: "When a card is modified" },
  { name: "Status Changed", description: "When card status changes" },
  { name: "Email Received", description: "When you receive an email" },
  { name: "Time-Based", description: "At scheduled times" },
];

const actionTypes = [
  { name: "Send Email", description: "Send an automated email" },
  { name: "Create Card", description: "Create a new task/project" },
  { name: "Update Status", description: "Change a card's status" },
  { name: "Assign User", description: "Assign to a team member" },
  { name: "Webhook", description: "Call external API" },
];

export default function AutomationsGuide() {
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
          <div className="p-3 rounded-xl bg-acc-violet/10">
            <Zap className="h-8 w-8 text-acc-violet" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Automations</h1>
            <p className="text-muted-foreground">Automate repetitive tasks</p>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <p className="text-lg">
            Build powerful automations with our visual drag-and-drop builder. Create workflows that trigger based on events and perform actions automatically.
          </p>
        </div>

        {/* How It Works */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="border rounded-xl p-6 text-center">
            <Play className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Trigger</h3>
            <p className="text-sm text-muted-foreground">Something happens that starts the workflow</p>
          </div>
          <div className="border rounded-xl p-6 text-center">
            <GitBranch className="h-8 w-8 text-acc-cyan mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Conditions</h3>
            <p className="text-sm text-muted-foreground">Optional filters to control when actions run</p>
          </div>
          <div className="border rounded-xl p-6 text-center">
            <Zap className="h-8 w-8 text-acc-violet mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Actions</h3>
            <p className="text-sm text-muted-foreground">What happens when the workflow runs</p>
          </div>
        </div>

        {/* Triggers & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="border rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Available Triggers</h3>
            <ul className="space-y-3">
              {triggerTypes.map((trigger, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div>
                    <p className="font-medium text-sm">{trigger.name}</p>
                    <p className="text-xs text-muted-foreground">{trigger.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="border rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-4">Available Actions</h3>
            <ul className="space-y-3">
              {actionTypes.map((action, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-acc-violet rounded-full" />
                  <div>
                    <p className="font-medium text-sm">{action.name}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Creating an Automation */}
        <div className="border rounded-xl p-6 mb-8" id="create">
          <h2 className="text-xl font-semibold mb-4">Creating an Automation</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">1</span>
              <div>
                <p className="font-medium">Go to Mission Control → Automations</p>
                <p className="text-sm text-muted-foreground">Access the automation builder from Mission Control.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">2</span>
              <div>
                <p className="font-medium">Click "New Automation"</p>
                <p className="text-sm text-muted-foreground">Opens the visual workflow builder.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">3</span>
              <div>
                <p className="font-medium">Add a trigger</p>
                <p className="text-sm text-muted-foreground">Drag a trigger node onto the canvas and configure when it fires.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">4</span>
              <div>
                <p className="font-medium">Add conditions (optional)</p>
                <p className="text-sm text-muted-foreground">Filter when the automation should run.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">5</span>
              <div>
                <p className="font-medium">Add actions</p>
                <p className="text-sm text-muted-foreground">Define what happens when the automation runs.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">6</span>
              <div>
                <p className="font-medium">Save and enable</p>
                <p className="text-sm text-muted-foreground">Your automation starts running immediately.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Example Automation */}
        <div className="bg-muted/50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold mb-4">💡 Example: New Lead Notification</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Trigger:</strong> Card Created (type = Deal)</p>
            <p><strong>Condition:</strong> Stage = "Lead"</p>
            <p><strong>Action:</strong> Send email to sales@company.com with deal details</p>
            <p className="text-muted-foreground pt-2">This automation notifies your sales team whenever a new lead enters the pipeline.</p>
          </div>
        </div>

        <div className="border rounded-xl p-6 bg-muted/30">
          <h3 className="font-semibold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/help/deals" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Deals</h4>
              <p className="text-sm text-muted-foreground">Automate your sales pipeline</p>
            </Link>
            <Link to="/help/tasks" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Tasks</h4>
              <p className="text-sm text-muted-foreground">Auto-create follow-up tasks</p>
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
