import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wrench, QrCode, FileText, Palette, Calculator, Lock, Share2 } from "lucide-react";
import kamrokLogo from "@/assets/kamrok-logo.png";

const toolCategories = [
  {
    name: "Business Essentials",
    icon: FileText,
    tools: [
      { name: "Email Signature Generator", href: "/tools/email-signature", description: "Create professional email signatures" },
      { name: "Invoice Creator", href: "/tools/invoice-creator", description: "Generate invoices for clients" },
      { name: "Quotation Maker", href: "/tools/quotation-maker", description: "Create professional quotes" },
      { name: "Business Name Generator", href: "/tools/business-name", description: "AI-powered name suggestions" },
    ]
  },
  {
    name: "Marketing & SEO",
    icon: Share2,
    tools: [
      { name: "UTM Builder", href: "/tools/utm-builder", description: "Track campaign links" },
      { name: "Meta Tag Preview", href: "/tools/meta-tag", description: "Preview search results" },
      { name: "OpenGraph Preview", href: "/tools/opengraph", description: "See social share cards" },
      { name: "Hashtag Suggester", href: "/tools/hashtag-suggester", description: "Find trending hashtags" },
      { name: "Email Subject Tester", href: "/tools/email-subject", description: "Test email open rates" },
    ]
  },
  {
    name: "Design & Dev",
    icon: Palette,
    tools: [
      { name: "QR Code Generator", href: "/tools/qr-code", description: "Create QR codes instantly" },
      { name: "Image Compressor", href: "/tools/image-compressor", description: "Optimize images for web" },
      { name: "Colour Palette Picker", href: "/tools/colour-palette", description: "Generate color schemes" },
      { name: "Favicon Generator", href: "/tools/favicon", description: "Create website favicons" },
    ]
  },
  {
    name: "Security",
    icon: Lock,
    tools: [
      { name: "Password Generator", href: "/tools/password-generator", description: "Create secure passwords" },
      { name: "Password Strength Checker", href: "/tools/password-strength", description: "Test password security" },
    ]
  },
  {
    name: "Calculators",
    icon: Calculator,
    tools: [
      { name: "Break-Even Calculator", href: "/tools/break-even", description: "Calculate your break-even point" },
      { name: "VAT Calculator", href: "/tools/vat-calculator", description: "Calculate VAT amounts" },
      { name: "Hourly Rate Calculator", href: "/tools/hourly-rate", description: "Find your ideal rate" },
    ]
  },
];

export default function FreeToolsGuide() {
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
            <Wrench className="h-8 w-8 text-acc-violet" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Free Tools</h1>
            <p className="text-muted-foreground">24+ free business tools</p>
          </div>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <p className="text-lg">
            KAMROK offers a collection of free tools to help you run your business more efficiently. No account required - just use them!
          </p>
        </div>

        {/* CTA to Tools */}
        <div className="border rounded-xl p-6 mb-12 bg-gradient-to-r from-acc-violet/10 to-acc-cyan/10 text-center">
          <h2 className="text-xl font-semibold mb-4">Explore All Tools</h2>
          <p className="text-muted-foreground mb-6">Visit our Tools Hub to browse and use all 24+ free tools.</p>
          <Button asChild size="lg" className="bg-acc-violet hover:bg-acc-violet/90">
            <Link to="/tools">Go to Tools Hub</Link>
          </Button>
        </div>

        {/* Tool Categories */}
        <div className="space-y-8">
          {toolCategories.map((category, index) => (
            <div key={index} className="border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <category.icon className="h-6 w-6 text-acc-violet" />
                <h2 className="text-xl font-semibold">{category.name}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.tools.map((tool, toolIndex) => (
                  <Link 
                    key={toolIndex}
                    to={tool.href}
                    className="p-4 border rounded-lg hover:border-acc-violet transition-colors"
                  >
                    <h3 className="font-medium">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* QR Code Example */}
        <div className="border rounded-xl p-6 mt-8" id="qr">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Popular: QR Code Generator
          </h2>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-acc-violet text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <span>Go to Tools → QR Code Generator</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-acc-violet text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <span>Enter your URL or text</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-acc-violet text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <span>Customize colors (optional)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-acc-violet text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
              <span>Download as PNG or SVG</span>
            </li>
          </ol>
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
