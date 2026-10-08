import { createFileRoute } from "@tanstack/react-router";
import SocialWall from "@/pages/SocialWall";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/social-wall")({
  head: () => toolHead("social-wall"),
  component: SocialWall,
});
