import { createFileRoute } from "@tanstack/react-router";
import UTMBuilder from "@/pages/tools/UTMBuilder";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/utm-builder")({
  head: () => toolHead("utm-builder"),
  component: UTMBuilder,
});
