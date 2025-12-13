import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Rocket, 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  Target, 
  CheckSquare,
  Receipt,
  MessageCircle,
  Zap,
  Building2,
  Settings,
  Shield,
  Wrench,
  HelpCircle,
  ArrowRight,
  BookOpen
} from "lucide-react";
import kamrokLogo from "@/assets/kamrok-logo.png";

const categories = [
  {
    title: "Getting Started",
    icon: Rocket,
    description: "Quick start guides and first steps",
    articles: [
      { title: "Quick Start Guide", href: "/help/getting-started" },
      { title: "Creating Your First Project", href: "/help/getting-started#first-project" },
      { title: "Inviting Team Members", href: "/help/getting-started#team" },
    ]
  },
  {
    title: "CRM Features",
    icon: LayoutDashboard,
    description: "Master the core CRM functionality",
    articles: [
      { title: "The Stream", href: "/help/stream" },
      { title: "Today View", href: "/help/today" },
      { title: "People & Companies", href: "/help/people" },
      { title: "Projects", href: "/help/projects" },
      { title: "Deals Pipeline", href: "/help/deals" },
      { title: "Tasks", href: "/help/tasks" },
    ]
  },
  {
    title: "Power Tools",
    icon: Zap,
    description: "Advanced features for power users",
    articles: [
      { title: "Invoicing & Payments", href: "/help/invoicing" },
      { title: "Live Chat Widget", href: "/help/live-chat" },
      { title: "Automations", href: "/help/automations" },
      { title: "Client Portals", href: "/help/client-portals" },
    ]
  },
  {
    title: "Account & Settings",
    icon: Settings,
    description: "Configure your workspace",
    articles: [
      { title: "Account Settings", href: "/help/settings" },
      { title: "Team Management", href: "/help/settings#team" },
      { title: "Branding", href: "/help/settings#branding" },
    ]
  },
  {
    title: "Free Tools",
    icon: Wrench,
    description: "Get the most from our free tools",
    articles: [
      { title: "Tools Overview", href: "/help/free-tools" },
      { title: "QR Code Generator", href: "/help/free-tools#qr" },
      { title: "Invoice Creator", href: "/help/free-tools#invoice" },
    ]
  },
  {
    title: "Support",
    icon: HelpCircle,
    description: "Get help when you need it",
    articles: [
      { title: "FAQ", href: "/help/faq" },
      { title: "Contact Support", href: "/contact" },
      { title: "Super Admin Guide", href: "/help/super-admin" },
    ]
  },
];

const popularArticles = [
  { title: "How to create your first card", href: "/help/stream#create-card", icon: LayoutDashboard },
  { title: "Setting up Live Chat on your website", href: "/help/live-chat#setup", icon: MessageCircle },
  { title: "Creating and sending invoices", href: "/help/invoicing#create", icon: Receipt },
  { title: "Building workflow automations", href: "/help/automations#create", icon: Zap },
  { title: "Managing client portals", href: "/help/client-portals", icon: Building2 },
];

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={kamrokLogo} alt="KAMROK" className="h-8" />
          </Link>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/crm">Go to CRM</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-acc-violet/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-acc-violet" />
            <h1 className="text-3xl md:text-4xl font-bold">KAMROK Help Center</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Everything you need to know about using KAMROK. Find guides, tutorials, and answers to common questions.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search for help articles..." 
              className="pl-12 h-12 text-lg rounded-full border-2 focus-visible:ring-acc-violet"
            />
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold mb-6">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {popularArticles.map((article, index) => (
              <Link 
                key={index}
                to={article.href}
                className="flex items-center gap-3 p-4 rounded-lg border hover:border-acc-violet hover:bg-acc-violet/5 transition-colors group"
              >
                <article.icon className="h-5 w-5 text-muted-foreground group-hover:text-acc-violet" />
                <span className="text-sm font-medium">{article.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-acc-violet/10">
                    <category.icon className="h-6 w-6 text-acc-violet" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <Link 
                        to={article.href}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        <ArrowRight className="h-3 w-3" />
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground mb-6">Our support team is here to help you get the most out of KAMROK.</p>
          <Button asChild size="lg" className="bg-acc-violet hover:bg-acc-violet/90">
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} KAMROK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
