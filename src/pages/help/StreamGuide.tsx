import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LayoutDashboard, Filter, Plus, Eye, GripVertical } from "lucide-react";
import kamrokLogo from "@/assets/kamrok-logo.png";

const features = [
  {
    icon: Eye,
    title: "Unified View",
    description: "See all your cards in one place - projects, tasks, deals, and support tickets. No more switching between different views."
  },
  {
    icon: Filter,
    title: "Smart Filtering",
    description: "Filter by card type, status, assignee, due date, or any combination. Save your favorite filters for quick access."
  },
  {
    icon: Plus,
    title: "Quick Creation",
    description: "Create any type of card with just a few clicks. The floating action button is always accessible."
  },
  {
    icon: GripVertical,
    title: "Drag & Drop",
    description: "Reorder cards by priority with simple drag and drop. Your custom order is saved automatically."
  },
];

export default function StreamGuide() {
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
            <LayoutDashboard className="h-8 w-8 text-acc-violet" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">The Stream</h1>
            <p className="text-muted-foreground">Your unified view of everything happening</p>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <p className="text-lg">
            The Stream is the heart of KAMROK. It's where all your cards live - projects, tasks, deals, support tickets, and notes. Think of it as your mission control center where you can see and manage everything at a glance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="border rounded-xl p-6">
              <feature.icon className="h-8 w-8 text-acc-violet mb-3" />
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* How to Create a Card */}
        <div className="border rounded-xl p-6 mb-8" id="create-card">
          <h2 className="text-xl font-semibold mb-4">How to Create a Card</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">1</span>
              <div>
                <p className="font-medium">Click the + button</p>
                <p className="text-sm text-muted-foreground">Find the floating action button in the bottom-right corner of the screen.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">2</span>
              <div>
                <p className="font-medium">Choose a card type</p>
                <p className="text-sm text-muted-foreground">Select from Project, Task, Deal, Support Ticket, Note, or Milestone.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">3</span>
              <div>
                <p className="font-medium">Fill in the details</p>
                <p className="text-sm text-muted-foreground">Add a title, description, due date, and assign to a team member.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">4</span>
              <div>
                <p className="font-medium">Save and track</p>
                <p className="text-sm text-muted-foreground">Your card appears in the Stream immediately. Click it anytime to view or edit details.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Filtering */}
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Filtering Your Stream</h2>
          <p className="text-muted-foreground mb-4">
            Use the filter bar at the top of the Stream to narrow down what you see:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> <strong>Type:</strong> Show only projects, tasks, deals, etc.</li>
            <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> <strong>Status:</strong> Filter by open, in progress, completed</li>
            <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> <strong>Assignee:</strong> See cards assigned to specific people</li>
            <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> <strong>Due Date:</strong> Focus on overdue or upcoming items</li>
            <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> <strong>Priority:</strong> Show only high-priority cards</li>
          </ul>
        </div>

        {/* Related Articles */}
        <div className="border rounded-xl p-6 bg-muted/30">
          <h3 className="font-semibold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/help/today" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Today View</h4>
              <p className="text-sm text-muted-foreground">Focus on what's due today</p>
            </Link>
            <Link to="/help/tasks" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Tasks</h4>
              <p className="text-sm text-muted-foreground">Managing your tasks</p>
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
