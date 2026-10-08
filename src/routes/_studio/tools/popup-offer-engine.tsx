import { createFileRoute } from "@tanstack/react-router";
import PopupOfferEngine from "@/pages/PopupOfferEngine";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/popup-offer-engine")({
  head: () => toolHead("popup-offer-engine"),
  component: PopupOfferEngine,
});
