import { createFileRoute } from "@tanstack/react-router";
import TrustpilotIntegration from "@/pages/TrustpilotIntegration";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/trustpilot-integration")({
  head: () => toolHead("trustpilot-integration"),
  component: TrustpilotIntegration,
});
