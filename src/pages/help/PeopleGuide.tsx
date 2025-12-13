import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Building2, UserPlus, Search } from "lucide-react";
import kamrokLogo from "@/assets/kamrok-logo.png";

export default function PeopleGuide() {
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
            <Users className="h-8 w-8 text-acc-violet" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">People & Companies</h1>
            <p className="text-muted-foreground">Managing your contacts and organizations</p>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <p className="text-lg">
            The People section is your CRM directory. Manage contacts (individual people) and companies (organizations) in one place, with easy linking between them.
          </p>
        </div>

        {/* Two Tabs Explained */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="border rounded-xl p-6">
            <Users className="h-8 w-8 text-acc-violet mb-3" />
            <h3 className="font-semibold text-lg mb-2">Contacts</h3>
            <p className="text-muted-foreground mb-4">Individual people you work with - clients, leads, partners, vendors.</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Name and contact details</li>
              <li>• Link to a company</li>
              <li>• Job title and role</li>
              <li>• Communication history</li>
            </ul>
          </div>
          <div className="border rounded-xl p-6">
            <Building2 className="h-8 w-8 text-acc-cyan mb-3" />
            <h3 className="font-semibold text-lg mb-2">Companies</h3>
            <p className="text-muted-foreground mb-4">Organizations and businesses you work with.</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Company name and website</li>
              <li>• Industry classification</li>
              <li>• All contacts at the company</li>
              <li>• Related deals and projects</li>
            </ul>
          </div>
        </div>

        {/* Adding Contacts */}
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Adding a New Contact
          </h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">1</span>
              <div>
                <p className="font-medium">Go to People → Contacts</p>
                <p className="text-sm text-muted-foreground">Navigate to the People section and ensure you're on the Contacts tab.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">2</span>
              <div>
                <p className="font-medium">Click "Add Contact"</p>
                <p className="text-sm text-muted-foreground">Find the button in the top-right corner of the contacts list.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">3</span>
              <div>
                <p className="font-medium">Fill in contact details</p>
                <p className="text-sm text-muted-foreground">Add name, email, phone, and optionally link to a company.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-acc-violet text-white rounded-full flex items-center justify-center font-semibold">4</span>
              <div>
                <p className="font-medium">Save and continue</p>
                <p className="text-sm text-muted-foreground">Your contact is now available for deals, projects, and invoices.</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Searching */}
        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Search className="h-5 w-5" />
            Finding People & Companies
          </h2>
          <p className="text-muted-foreground mb-4">
            Use the search bar at the top of either tab to quickly find who you're looking for:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> Search by name, email, or phone number</li>
            <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> Filter by company or industry</li>
            <li className="flex items-center gap-2"><span className="text-acc-violet">•</span> Sort by recently added or alphabetically</li>
          </ul>
        </div>

        <div className="border rounded-xl p-6 bg-muted/30">
          <h3 className="font-semibold mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/help/deals" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Deals</h4>
              <p className="text-sm text-muted-foreground">Link contacts to deals</p>
            </Link>
            <Link to="/help/invoicing" className="p-4 border rounded-lg hover:border-acc-violet transition-colors bg-background">
              <h4 className="font-medium">Invoicing</h4>
              <p className="text-sm text-muted-foreground">Invoice your contacts</p>
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
