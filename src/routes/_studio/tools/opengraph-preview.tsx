import { createFileRoute } from "@tanstack/react-router";
import OpenGraphPreview from "@/pages/tools/OpenGraphPreview";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/opengraph-preview")({
  head: () => toolHead("opengraph-preview"),
  component: OpenGraphPreview,
});
