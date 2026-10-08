import { createFileRoute } from "@tanstack/react-router";
import Blog from "@/pages/kamrok/Blog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/blog/")({
  head: () => pageHead({ path: "/blog", title: "Field Notes \u2014 KAMROK", description: "Short notes from the KAMROK studio \u2014 what we're building, what we're learning, and the occasional opinion." }),
  component: Blog,
});
