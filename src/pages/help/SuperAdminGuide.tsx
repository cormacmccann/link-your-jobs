import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Users, Building2, CreditCard, FileSearch, AlertTriangle } from "lucide-react";
import kamrokLogo from "@/assets/kamrok-logo.png";

export default function SuperAdminGuide() {
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
          <div className="p-3 rounded-xl bg-red-500/10">
            <Shield className="h-8 w-8 text-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Super Admin</h1>
            <p className="text-muted-foreground">Platform-wide administration (Restricted)</p>
          </div>
        </div>

        {/* Access Warning */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-600 dark:text-red-400">Restricted Access</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Super Admin access is limited to platform administrators. This section requires 2FA authentication. If you believe you should have access, contact your platform administrator.
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <p className="text-lg">
            The Super Admin dashboard provides platform-wide management capabilities for KAMROK administrators. This includes user management, billing oversight, and system configuration.
          </p>
        </div>

        {/* Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="border rounded-xl p-6">
            <Building2 className="h-8 w-8 text-acc-violet mb-3" />
            <h3 className="font-semibold text-lg mb-2">Organization Management</h3>
            <p className="text-muted-foreground text-sm">View and manage all organizations on the platform. Update settings, view usage, and configure limits.</p>
          </div>
          <div className="border rounded-xl p-6">
            <Users className="h-8 w-8 text-acc-cyan mb-3" />
            <h3 className="font-semibold text-lg mb-2">User Administration</h3>
            <p className="text-muted-foreground text-sm">Manage users across organizations. Impersonate for support, force password resets, disable accounts.</p>
          </div>
          <div className="border rounded-xl p-6">
            <CreditCard className="h-8 w-8 text-green-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Billing & Subscriptions</h3>
            <p className="text-muted-foreground text-sm">View all subscriptions, manage pricing plans, process refunds, and handle billing inquiries.</p>
          </div>
          <div className="border rounded-xl p-6">
            <FileSearch className="h-8 w-8 text-orange-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Audit Logs</h3>
            <p className="text-muted-foreground text-sm">Complete audit trail of all platform actions. Track changes, logins, and administrative actions.</p>
          </div>
        </div>

        {/* Security Requirements */}
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Requirements
          </h2>
          <ul className="space-y-3">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center font-semibold">1</span>
              <div>
                <p className="font-medium">Two-Factor Authentication (2FA)</p>
                <p className="text-sm text-muted-foreground">Super Admin access requires 2FA to be enabled on your account.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center font-semibold">2</span>
              <div>
                <p className="font-medium">IP Allowlist</p>
                <p className="text-sm text-muted-foreground">Access may be restricted to specific IP addresses for added security.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center font-semibold">3</span>
              <div>
                <p className="font-medium">Session Timeout</p>
                <p className="text-sm text-muted-foreground">Super Admin sessions expire after 30 minutes of inactivity.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center font-semibold">4</span>
              <div>
                <p className="font-medium">Action Logging</p>
                <p className="text-sm text-muted-foreground">All Super Admin actions are logged with timestamp and user ID.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Portfolio Importer */}
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">AI Portfolio Importer</h2>
          <p className="text-muted-foreground mb-4">
            Super Admins have access to the AI-powered portfolio importer that can:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> Scrape websites to extract client information</li>
            <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> Auto-detect and download client logos</li>
            <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> Capture full-page screenshots</li>
            <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> Generate AI-written project descriptions</li>
            <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> Auto-classify industries</li>
          </ul>
        </div>

        <div className="border rounded-xl p-6 bg-muted/30">
          <h3 className="font-semibold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/help/settings" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Settings</h4>
              <p className="text-sm text-muted-foreground">Regular account settings</p>
            </Link>
            <Link to="/help/faq" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">FAQ</h4>
              <p className="text-sm text-muted-foreground">Common questions</p>
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
