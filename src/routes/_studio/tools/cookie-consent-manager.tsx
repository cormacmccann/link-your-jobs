import { createFileRoute } from "@tanstack/react-router";
import CookieConsentManager from "@/pages/CookieConsentManager";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/cookie-consent-manager")({
  head: () => toolHead("cookie-consent-manager"),
  component: CookieConsentManager,
});
