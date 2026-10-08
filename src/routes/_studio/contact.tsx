import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/kamrok/Contact";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/contact")({
  head: () => pageHead({ path: "/contact", title: "Let\u2019s Talk \u2014 Lovable & WordPress Projects | KAMROK", description: "Tell Cormac about your next website, Lovable app or project that needs a fresh pair of eyes. KAMROK, Dundalk, Ireland." }),
  component: Contact,
});
