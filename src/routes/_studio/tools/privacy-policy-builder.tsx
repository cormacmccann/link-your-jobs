import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicyBuilder from "@/pages/PrivacyPolicyBuilder";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/privacy-policy-builder")({
  head: () => toolHead("privacy-policy-builder"),
  component: PrivacyPolicyBuilder,
});
