import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import kamrokLogo from "@/assets/kamrok-logo.png";

export default function TodayGuide() {
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
            <Calendar className="h-8 w-8 text-acc-cyan" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Today View</h1>
            <p className="text-muted-foreground">Focus on what matters right now</p>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <p className="text-lg">
            The Today view is your personal command center. It shows everything that needs your attention today - cards assigned to you, items due today, and overdue tasks that need immediate action.
          </p>
        </div>

        {/* What You'll See */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border rounded-xl p-6 border-red-500/20 bg-red-500/5">
            <AlertTriangle className="h-8 w-8 text-red-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Overdue</h3>
            <p className="text-muted-foreground text-sm">Cards past their due date. These need immediate attention.</p>
          </div>
          <div className="border rounded-xl p-6 border-acc-cyan/20 bg-acc-cyan/5">
            <Clock className="h-8 w-8 text-acc-cyan mb-3" />
            <h3 className="font-semibold text-lg mb-2">Due Today</h3>
            <p className="text-muted-foreground text-sm">Everything scheduled to be completed today.</p>
          </div>
          <div className="border rounded-xl p-6 border-green-500/20 bg-green-500/5">
            <CheckCircle className="h-8 w-8 text-green-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Assigned to Me</h3>
            <p className="text-muted-foreground text-sm">All cards where you're the assignee.</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">How the Today View Works</h2>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-cyan/20 text-acc-cyan rounded-full flex items-center justify-center font-semibold">1</span>
              <div>
                <p className="font-medium">Automatic Updates</p>
                <p className="text-sm text-muted-foreground">The Today view refreshes automatically as you complete tasks and as deadlines approach.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-cyan/20 text-acc-cyan rounded-full flex items-center justify-center font-semibold">2</span>
              <div>
                <p className="font-medium">Quick Actions</p>
                <p className="text-sm text-muted-foreground">Complete tasks, reschedule items, or reassign cards right from this view.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-cyan/20 text-acc-cyan rounded-full flex items-center justify-center font-semibold">3</span>
              <div>
                <p className="font-medium">Priority Focus</p>
                <p className="text-sm text-muted-foreground">Overdue items appear first, followed by today's tasks, helping you prioritize effectively.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Tips */}
        <div className="bg-muted/50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold mb-4">💡 Pro Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Check your Today view first thing every morning to plan your day</li>
            <li>• Use keyboard shortcuts to quickly navigate and complete tasks</li>
            <li>• If a task can't be done today, reschedule it instead of leaving it overdue</li>
            <li>• The Today view counts in the navigation help you see what needs attention at a glance</li>
          </ul>
        </div>

        <div className="border rounded-xl p-6 bg-muted/30">
          <h3 className="font-semibold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/help/stream" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">The Stream</h4>
              <p className="text-sm text-muted-foreground">See all your cards in one view</p>
            </Link>
            <Link to="/help/tasks" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Tasks</h4>
              <p className="text-sm text-muted-foreground">Managing your tasks effectively</p>
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
