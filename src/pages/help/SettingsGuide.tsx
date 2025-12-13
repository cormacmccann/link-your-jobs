import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, Users, Palette, CreditCard } from "lucide-react";
import kamrokLogo from "@/assets/kamrok-logo.png";

export default function SettingsGuide() {
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
            <Settings className="h-8 w-8 text-acc-violet" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground">Configure your workspace</p>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <p className="text-lg">
            The Settings page is where you configure your organization's branding, manage team members, set up integrations, and control account preferences.
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6 mb-12">
          <div className="border rounded-xl p-6" id="branding">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="h-6 w-6 text-acc-violet" />
              <h2 className="text-xl font-semibold">Branding</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Customize how your organization appears across KAMROK and client portals.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> <strong>Logo:</strong> Upload your company logo</li>
              <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> <strong>Colors:</strong> Set primary and secondary brand colors</li>
              <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> <strong>Company Name:</strong> Display name shown in emails and portals</li>
              <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> <strong>Website:</strong> Your company website URL</li>
              <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> <strong>Description:</strong> Brief company description for client portals</li>
            </ul>
          </div>

          <div className="border rounded-xl p-6" id="team">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-acc-cyan" />
              <h2 className="text-xl font-semibold">Team Management</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Manage who has access to your KAMROK workspace.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><span className="text-acc-cyan">•</span> <strong>Invite Members:</strong> Send email invitations to new team members</li>
              <li className="flex items-center gap-2"><span className="text-acc-cyan">•</span> <strong>Roles:</strong> Assign Admin, Member, or Viewer roles</li>
              <li className="flex items-center gap-2"><span className="text-acc-cyan">•</span> <strong>Remove Members:</strong> Revoke access when needed</li>
              <li className="flex items-center gap-2"><span className="text-acc-cyan">•</span> <strong>Pending Invites:</strong> View and resend pending invitations</li>
            </ul>
          </div>

          <div className="border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-semibold">Integrations</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Connect external services to extend KAMROK's capabilities.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><span className="text-green-500">•</span> <strong>Stripe:</strong> Accept payments and create invoices</li>
              <li className="flex items-center gap-2"><span className="text-green-500">•</span> <strong>Email:</strong> Connect your email for CRM sync</li>
              <li className="flex items-center gap-2"><span className="text-green-500">•</span> <strong>Calendar:</strong> Sync events with Google/Outlook</li>
              <li className="flex items-center gap-2"><span className="text-green-500">•</span> <strong>Webhooks:</strong> Send data to external services</li>
            </ul>
          </div>
        </div>

        {/* How to Access */}
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Accessing Settings</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">1</span>
              <div>
                <p className="font-medium">Click your avatar in the top-right</p>
                <p className="text-sm text-muted-foreground">Opens the user menu dropdown.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">2</span>
              <div>
                <p className="font-medium">Click "Settings"</p>
                <p className="text-sm text-muted-foreground">Opens the main settings page.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">3</span>
              <div>
                <p className="font-medium">Navigate using tabs</p>
                <p className="text-sm text-muted-foreground">Switch between Branding, Team, Integrations, and other sections.</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="border rounded-xl p-6 bg-muted/30">
          <h3 className="font-semibold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/help/client-portals" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Client Portals</h4>
              <p className="text-sm text-muted-foreground">Use branding in portals</p>
            </Link>
            <Link to="/help/invoicing" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Invoicing</h4>
              <p className="text-sm text-muted-foreground">Set up Stripe integration</p>
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
