import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import kamrokLogo from "@/assets/kamrok-logo.png";

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I create an account?",
        a: "Click 'Sign Up' on the homepage, enter your email and password, and verify your email address. You'll then be guided through setting up your organization."
      },
      {
        q: "Can I invite my team members?",
        a: "Yes! Go to Settings → Team and click 'Invite Member'. They'll receive an email invitation to join your organization."
      },
      {
        q: "Is there a free trial?",
        a: "Yes, KAMROK offers a free tier that includes basic CRM features. You can upgrade anytime to access advanced features like automations and invoicing."
      },
    ]
  },
  {
    category: "Cards & Stream",
    questions: [
      {
        q: "What types of cards can I create?",
        a: "KAMROK supports Projects, Tasks, Deals, Support Tickets, Milestones, and Notes. Each type has specific fields and workflows tailored to its purpose."
      },
      {
        q: "Can I filter the Stream by card type?",
        a: "Yes, use the filter bar at the top of the Stream to show only specific card types, statuses, assignees, or due dates."
      },
      {
        q: "How do I reorder cards?",
        a: "Simply drag and drop cards in the Stream to reorder them. Your custom order is saved automatically."
      },
    ]
  },
  {
    category: "Projects & Tasks",
    questions: [
      {
        q: "How is KAMROK different from other project tools?",
        a: "KAMROK combines CRM and project management in one platform, inspired by Basecamp's simplicity. Everything lives in the unified Stream, reducing context-switching."
      },
      {
        q: "Can tasks have subtasks?",
        a: "Yes, tasks can be linked to parent cards. This lets you break down large tasks into smaller, manageable pieces."
      },
      {
        q: "What's a 'grab-it' task?",
        a: "A grab-it task is one without an assignee. Any team member can claim it, making it great for collaborative workflows."
      },
    ]
  },
  {
    category: "Invoicing & Payments",
    questions: [
      {
        q: "How do I connect Stripe?",
        a: "Go to Settings → Integrations and click 'Connect Stripe'. You'll be redirected to Stripe to authorize the connection."
      },
      {
        q: "Are payment links secure?",
        a: "Yes, all payments are processed securely through Stripe. We never store credit card information on our servers."
      },
      {
        q: "Can I customize invoice templates?",
        a: "Invoice branding uses your organization's logo and colors configured in Settings → Branding."
      },
    ]
  },
  {
    category: "Live Chat",
    questions: [
      {
        q: "How do I add the chat widget to my website?",
        a: "Go to Mission Control → Live Chat and copy the embed code. Paste it before the closing </body> tag on your website."
      },
      {
        q: "Can visitors chat without giving their email?",
        a: "Yes, but you can prompt them to provide contact info. Once they do, you can convert them to a CRM contact."
      },
      {
        q: "Is there a mobile app for responding to chats?",
        a: "Currently, KAMROK is web-based. However, the interface is fully responsive and works great on mobile browsers."
      },
    ]
  },
  {
    category: "Account & Billing",
    questions: [
      {
        q: "How do I upgrade my plan?",
        a: "Go to Settings → Billing and select the plan you'd like. Upgrades take effect immediately."
      },
      {
        q: "Can I cancel my subscription?",
        a: "Yes, you can cancel anytime from Settings → Billing. You'll retain access until the end of your billing period."
      },
      {
        q: "How do I export my data?",
        a: "Go to Settings → Data Export. You can download all your cards, contacts, and companies as CSV files."
      },
    ]
  },
];

export default function FAQ() {
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
            <HelpCircle className="h-8 w-8 text-acc-violet" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
            <p className="text-muted-foreground">Quick answers to common questions</p>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`${catIndex}-${faqIndex}`}>
                    <AccordionTrigger className="text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 border rounded-xl p-8 text-center bg-gradient-to-r from-acc-violet/10 to-acc-cyan/10">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link to="/help">Browse Help Articles</Link>
            </Button>
            <Button asChild className="bg-acc-violet hover:bg-acc-violet/90">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 text-center border-t pt-8">
          <p className="text-muted-foreground mb-4">Was this page helpful?</p>
          <div className="flex justify-center gap-4">
            <Button variant="outline">👍 Yes</Button>
            <Button variant="outline">👎 No</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
