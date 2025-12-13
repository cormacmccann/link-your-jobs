import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FolderKanban, MessageSquare, FileText, Milestone, Users } from "lucide-react";
import kamrokLogo from "@/assets/kamrok-logo.png";

export default function ProjectsGuide() {
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
            <FolderKanban className="h-8 w-8 text-acc-violet" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground">Basecamp-style project management</p>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <p className="text-lg">
            Projects in KAMROK are inspired by Basecamp's approach to project management. Each project is a container for discussions, tasks, milestones, and files - everything your team needs in one place.
          </p>
        </div>

        {/* Project Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="border rounded-xl p-6">
            <MessageSquare className="h-8 w-8 text-acc-violet mb-3" />
            <h3 className="font-semibold text-lg mb-2">Activity Feed</h3>
            <p className="text-muted-foreground text-sm">Threaded discussions for updates, questions, and decisions. @mention team members to get their attention.</p>
          </div>
          <div className="border rounded-xl p-6">
            <FileText className="h-8 w-8 text-acc-cyan mb-3" />
            <h3 className="font-semibold text-lg mb-2">Documents</h3>
            <p className="text-muted-foreground text-sm">Store project briefs, specifications, and reference materials. Everyone has access to the latest version.</p>
          </div>
          <div className="border rounded-xl p-6">
            <Milestone className="h-8 w-8 text-green-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Milestones</h3>
            <p className="text-muted-foreground text-sm">Set key dates and deliverables. Track progress toward major project goals.</p>
          </div>
          <div className="border rounded-xl p-6">
            <Users className="h-8 w-8 text-orange-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Team Members</h3>
            <p className="text-muted-foreground text-sm">Add specific team members to each project. They'll see project updates in their Stream.</p>
          </div>
        </div>

        {/* Creating a Project */}
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Creating a New Project</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">1</span>
              <div>
                <p className="font-medium">Click the + button and select "Project"</p>
                <p className="text-sm text-muted-foreground">From anywhere in the CRM, use the floating action button.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">2</span>
              <div>
                <p className="font-medium">Give it a name and description</p>
                <p className="text-sm text-muted-foreground">Be descriptive - this helps team members understand the project's purpose.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">3</span>
              <div>
                <p className="font-medium">Add team members</p>
                <p className="text-sm text-muted-foreground">Select who should have access to this project.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">4</span>
              <div>
                <p className="font-medium">Set a due date (optional)</p>
                <p className="text-sm text-muted-foreground">If the project has a deadline, add it here.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Working in a Project */}
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Working in a Project</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Posting Updates</h4>
              <p className="text-sm text-muted-foreground">Use the activity feed to share progress, ask questions, or make decisions. Team members are notified of new posts.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Creating Tasks from Posts</h4>
              <p className="text-sm text-muted-foreground">Turn any discussion point into an actionable task with one click. The task stays linked to the original post.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Tracking Milestones</h4>
              <p className="text-sm text-muted-foreground">Create milestone cards for key deliverables. Mark them complete as you hit each goal.</p>
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-6 bg-muted/30">
          <h3 className="font-semibold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/help/tasks" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Tasks</h4>
              <p className="text-sm text-muted-foreground">Managing project tasks</p>
            </Link>
            <Link to="/help/client-portals" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Client Portals</h4>
              <p className="text-sm text-muted-foreground">Share project updates with clients</p>
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
