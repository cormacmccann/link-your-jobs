import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Rocket, Users, FolderPlus, CheckCircle } from "lucide-react";
import kamrokLogo from "@/assets/kamrok-logo.png";

const steps = [
  {
    title: "1. Create Your Account",
    description: "Sign up for KAMROK using your email address. You'll receive a confirmation email to verify your account.",
    tips: [
      "Use a business email for team collaboration",
      "Choose a strong password",
      "Enable two-factor authentication for added security"
    ]
  },
  {
    title: "2. Set Up Your Organization",
    description: "After signing in, you'll be prompted to create your organization. This is your workspace where all your team's data lives.",
    tips: [
      "Add your company logo for branding",
      "Set your primary brand colors",
      "Add a company description for client portals"
    ]
  },
  {
    title: "3. Invite Your Team",
    description: "Collaboration is key! Invite team members to join your organization so everyone can work together.",
    tips: [
      "Team members receive an email invitation",
      "Assign roles to control access levels",
      "You can always add more team members later"
    ]
  },
  {
    title: "4. Create Your First Card",
    description: "Cards are the heart of KAMROK. Create your first project, task, or deal to get started.",
    tips: [
      "Start with a simple project card",
      "Add a due date to stay organized",
      "Assign it to yourself or a team member"
    ]
  },
];

export default function GettingStarted() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/help" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Help Center
            </Link>
          </div>
          <Link to="/">
            <img src={kamrokLogo} alt="KAMROK" className="h-8" />
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-acc-violet/10">
            <Rocket className="h-8 w-8 text-acc-violet" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Getting Started with KAMROK</h1>
            <p className="text-muted-foreground">Your complete guide to setting up and using KAMROK</p>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg">
            Welcome to KAMROK! This guide will walk you through everything you need to know to get started with our all-in-one CRM and project management platform.
          </p>

          <div className="my-8 p-6 bg-acc-cyan/10 rounded-xl border border-acc-cyan/20">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-acc-cyan" />
              What you'll learn
            </h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>How to create and configure your account</li>
              <li>Setting up your organization</li>
              <li>Inviting team members</li>
              <li>Creating your first project</li>
            </ul>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-8 mt-12">
          {steps.map((step, index) => (
            <div key={index} className="border rounded-xl p-6" id={index === 0 ? "account" : index === 2 ? "team" : undefined}>
              <h2 className="text-xl font-semibold mb-3">{step.title}</h2>
              <p className="text-muted-foreground mb-4">{step.description}</p>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">💡 Tips</h4>
                <ul className="space-y-1">
                  {step.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-acc-violet">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Video Placeholder */}
        <div className="my-12 border-2 border-dashed rounded-xl p-12 text-center">
          <div className="text-muted-foreground">
            <p className="text-lg font-medium mb-2">📹 Video Tutorial Coming Soon</p>
            <p className="text-sm">We're working on a comprehensive video walkthrough</p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="border rounded-xl p-6 bg-muted/30">
          <h3 className="font-semibold mb-4">Next Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/help/stream" className="p-4 border rounded-lg hover:border-acc-violet transition-colors">
              <h4 className="font-medium">Learn about the Stream</h4>
              <p className="text-sm text-muted-foreground">Your unified view of all cards</p>
            </Link>
            <Link to="/help/projects" className="p-4 border rounded-lg hover:border-acc-violet transition-colors">
              <h4 className="font-medium">Create a Project</h4>
              <p className="text-sm text-muted-foreground">Organize work with projects</p>
            </Link>
          </div>
        </div>

        {/* Feedback */}
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
