import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckSquare, Clock, User, Flag } from "lucide-react";
import kamrokLogo from "@/assets/kamrok-logo.png";

export default function TasksGuide() {
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
          <div className="p-3 rounded-xl bg-green-500/10">
            <CheckSquare className="h-8 w-8 text-green-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Tasks</h1>
            <p className="text-muted-foreground">Get things done, your way</p>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <p className="text-lg">
            Tasks in KAMROK are flexible - assign them to specific people, leave them unassigned for anyone to grab, or assign to multiple team members. They integrate seamlessly with projects and appear in your Stream.
          </p>
        </div>

        {/* Task Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border rounded-xl p-6">
            <User className="h-8 w-8 text-acc-violet mb-3" />
            <h3 className="font-semibold text-lg mb-2">Assigned Tasks</h3>
            <p className="text-muted-foreground text-sm">Assign to a specific person. They'll see it in their Today view.</p>
          </div>
          <div className="border rounded-xl p-6">
            <CheckSquare className="h-8 w-8 text-acc-cyan mb-3" />
            <h3 className="font-semibold text-lg mb-2">Grab-it Tasks</h3>
            <p className="text-muted-foreground text-sm">Leave unassigned. Anyone on the team can claim it.</p>
          </div>
          <div className="border rounded-xl p-6">
            <Flag className="h-8 w-8 text-orange-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Priority Levels</h3>
            <p className="text-muted-foreground text-sm">Set low, medium, high, or urgent priority.</p>
          </div>
        </div>

        {/* Creating Tasks */}
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Creating a Task</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">1</span>
              <div>
                <p className="font-medium">Click + and select "Task"</p>
                <p className="text-sm text-muted-foreground">Or create from within a project for automatic linking.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">2</span>
              <div>
                <p className="font-medium">Write a clear title</p>
                <p className="text-sm text-muted-foreground">Start with a verb: "Review proposal", "Send invoice", "Update website"</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">3</span>
              <div>
                <p className="font-medium">Set a due date</p>
                <p className="text-sm text-muted-foreground">Tasks without due dates can still be tracked but won't appear in "Due Today".</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">4</span>
              <div>
                <p className="font-medium">Assign (or don't)</p>
                <p className="text-sm text-muted-foreground">Assign to a specific person, or leave it for anyone to grab.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Task Workflow */}
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Task Workflow
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">Open</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-3 py-1 bg-blue-200 dark:bg-blue-900 rounded-full text-sm">In Progress</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-3 py-1 bg-yellow-200 dark:bg-yellow-900 rounded-full text-sm">In Review</span>
            <span className="text-muted-foreground">→</span>
            <span className="px-3 py-1 bg-green-200 dark:bg-green-900 rounded-full text-sm">Completed</span>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Click the status badge on any task to quickly move it through the workflow.
          </p>
        </div>

        {/* Tips */}
        <div className="bg-muted/50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold mb-4">💡 Pro Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Use the Today view to focus on what's due now</li>
            <li>• Add detailed descriptions for complex tasks</li>
            <li>• Link tasks to projects to keep everything organized</li>
            <li>• Set recurring due dates for regular tasks</li>
            <li>• Use comments to collaborate without endless emails</li>
          </ul>
        </div>

        <div className="border rounded-xl p-6 bg-muted/30">
          <h3 className="font-semibold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/help/today" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Today View</h4>
              <p className="text-sm text-muted-foreground">See all your tasks for today</p>
            </Link>
            <Link to="/help/projects" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Projects</h4>
              <p className="text-sm text-muted-foreground">Organize tasks in projects</p>
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
