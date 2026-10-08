import { createFileRoute } from "@tanstack/react-router";
import ReviewWidget from "@/pages/ReviewWidget";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/review-widget")({
  head: () => toolHead("review-widget"),
  component: ReviewWidget,
});
