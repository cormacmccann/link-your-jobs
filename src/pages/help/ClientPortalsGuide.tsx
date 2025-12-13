import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Palette, FileQuestion, Ticket } from "lucide-react";
import kamrokLogo from "@/assets/kamrok-logo.png";

export default function ClientPortalsGuide() {
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
            <Building2 className="h-8 w-8 text-acc-violet" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Client Portals</h1>
            <p className="text-muted-foreground">Branded onboarding experiences</p>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <p className="text-lg">
            Create custom-branded portals for client onboarding. Collect information, share documents, accept payments, and provide support - all in one place.
          </p>
        </div>

        {/* Portal Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="border rounded-xl p-6">
            <Palette className="h-8 w-8 text-acc-violet mb-3" />
            <h3 className="font-semibold text-lg mb-2">Custom Branding</h3>
            <p className="text-muted-foreground text-sm">Add your logo, colors, and custom domain. Portals look like they're part of your brand.</p>
          </div>
          <div className="border rounded-xl p-6">
            <FileQuestion className="h-8 w-8 text-acc-cyan mb-3" />
            <h3 className="font-semibold text-lg mb-2">Questionnaires</h3>
            <p className="text-muted-foreground text-sm">Multi-step forms to collect client information. Progress is saved automatically.</p>
          </div>
          <div className="border rounded-xl p-6">
            <Ticket className="h-8 w-8 text-orange-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Support Tickets</h3>
            <p className="text-muted-foreground text-sm">Let clients submit support tickets directly. Set monthly limits per client.</p>
          </div>
          <div className="border rounded-xl p-6">
            <Building2 className="h-8 w-8 text-green-500 mb-3" />
            <h3 className="font-semibold text-lg mb-2">Products & Services</h3>
            <p className="text-muted-foreground text-sm">Showcase your offerings. Upsell additional services.</p>
          </div>
        </div>

        {/* Creating a Portal */}
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Creating a Client Portal</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">1</span>
              <div>
                <p className="font-medium">Go to Settings → Client Portals</p>
                <p className="text-sm text-muted-foreground">Or access from Mission Control.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">2</span>
              <div>
                <p className="font-medium">Click "Create Portal"</p>
                <p className="text-sm text-muted-foreground">Start with a blank portal or use a template.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">3</span>
              <div>
                <p className="font-medium">Configure branding</p>
                <p className="text-sm text-muted-foreground">Add logo, set colors, write welcome message.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">4</span>
              <div>
                <p className="font-medium">Add sections</p>
                <p className="text-sm text-muted-foreground">Add questionnaires, how-to guides, products, or documents.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">5</span>
              <div>
                <p className="font-medium">Link to a client</p>
                <p className="text-sm text-muted-foreground">Assign the portal to a contact or company.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">6</span>
              <div>
                <p className="font-medium">Share the link</p>
                <p className="text-sm text-muted-foreground">Send your client the portal URL. They can access without logging in.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Portal Sections */}
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Available Section Types</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Questionnaires</h4>
              <p className="text-sm text-muted-foreground">Multi-step forms with various field types. Clients can save progress and return later.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">How-To Guides</h4>
              <p className="text-sm text-muted-foreground">Instructions with text, images, and video embeds. Perfect for onboarding.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Product Catalog</h4>
              <p className="text-sm text-muted-foreground">Showcase products or services with images and pricing.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Document Sharing</h4>
              <p className="text-sm text-muted-foreground">Upload files for clients to download. Track views.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Payment Section</h4>
              <p className="text-sm text-muted-foreground">Link to invoices for easy payment collection.</p>
            </div>
          </div>
        </div>

        {/* Support Tickets */}
        <div className="bg-muted/50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold mb-4">💡 Support Ticket Limits</h3>
          <p className="text-sm text-muted-foreground">
            You can set a monthly limit on how many support tickets each client can submit. This is useful for tiered service plans. Set to "unlimited" for full access.
          </p>
        </div>

        <div className="border rounded-xl p-6 bg-muted/30">
          <h3 className="font-semibold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/help/people" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">People & Companies</h4>
              <p className="text-sm text-muted-foreground">Link portals to clients</p>
            </Link>
            <Link to="/help/settings" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Settings</h4>
              <p className="text-sm text-muted-foreground">Configure branding options</p>
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
