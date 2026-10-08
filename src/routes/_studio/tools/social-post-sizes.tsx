import { createFileRoute } from "@tanstack/react-router";
import SocialMediaSizeChecker from "@/pages/tools/SocialMediaSizeChecker";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/social-post-sizes")({
  head: () => toolHead("social-post-sizes"),
  component: SocialMediaSizeChecker,
});
