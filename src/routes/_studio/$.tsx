import { createFileRoute } from "@tanstack/react-router";
import NotFound from "@/pages/NotFound";

// Unknown URLs render the 404 inside the studio layout, as before.
export const Route = createFileRoute("/_studio/$")({
  head: () => ({ meta: [{ title: "Page Not Found | KAMROK" }, { name: "robots", content: "noindex" }] }),
  component: NotFound,
});
