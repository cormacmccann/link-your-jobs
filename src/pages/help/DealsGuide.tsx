import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import kamrokLogo from "@/assets/kamrok-logo.png";

const stages = [
  { name: "Lead", color: "bg-gray-500", description: "Initial contact, qualifying the opportunity" },
  { name: "Qualified", color: "bg-blue-500", description: "Confirmed as a good fit, ready for proposal" },
  { name: "Proposal", color: "bg-yellow-500", description: "Proposal sent, awaiting response" },
  { name: "Negotiation", color: "bg-orange-500", description: "In active discussions about terms" },
  { name: "Won", color: "bg-green-500", description: "Deal closed successfully" },
  { name: "Lost", color: "bg-red-500", description: "Deal did not close" },
];

export default function DealsGuide() {
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
            <Target className="h-8 w-8 text-acc-violet" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Deals Pipeline</h1>
            <p className="text-muted-foreground">Track opportunities from lead to close</p>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <p className="text-lg">
            The Deals feature helps you track sales opportunities through your pipeline. Visualize where each deal stands, forecast revenue, and never let an opportunity slip through the cracks.
          </p>
        </div>

        {/* Pipeline Stages */}
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Pipeline Stages</h2>
          <div className="space-y-3">
            {stages.map((stage, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                <div>
                  <p className="font-medium">{stage.name}</p>
                  <p className="text-sm text-muted-foreground">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Creating a Deal */}
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Creating a New Deal</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">1</span>
              <div>
                <p className="font-medium">Click + and select "Deal"</p>
                <p className="text-sm text-muted-foreground">Start from the floating action button or from the Stream.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">2</span>
              <div>
                <p className="font-medium">Add deal details</p>
                <p className="text-sm text-muted-foreground">Give it a name, set the value, and link to a contact/company.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">3</span>
              <div>
                <p className="font-medium">Set the stage</p>
                <p className="text-sm text-muted-foreground">Choose the current stage of the deal in your pipeline.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">4</span>
              <div>
                <p className="font-medium">Add expected close date</p>
                <p className="text-sm text-muted-foreground">When do you expect this deal to close? This helps with forecasting.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="border rounded-xl p-6 text-center">
            <TrendingUp className="h-8 w-8 text-acc-violet mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Pipeline View</h3>
            <p className="text-sm text-muted-foreground">Drag deals between stages in the kanban view</p>
          </div>
          <div className="border rounded-xl p-6 text-center">
            <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Value Tracking</h3>
            <p className="text-sm text-muted-foreground">See total value at each stage</p>
          </div>
          <div className="border rounded-xl p-6 text-center">
            <BarChart3 className="h-8 w-8 text-acc-cyan mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Forecasting</h3>
            <p className="text-sm text-muted-foreground">Predict revenue based on probability</p>
          </div>
        </div>

        <div className="border rounded-xl p-6 bg-muted/30">
          <h3 className="font-semibold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/help/people" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">People & Companies</h4>
              <p className="text-sm text-muted-foreground">Link deals to contacts</p>
            </Link>
            <Link to="/help/invoicing" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Invoicing</h4>
              <p className="text-sm text-muted-foreground">Invoice when deals close</p>
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
