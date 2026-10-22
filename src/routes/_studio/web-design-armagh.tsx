import { createFileRoute } from "@tanstack/react-router";
import LocalWebDesign from "@/pages/kamrok/LocalWebDesign";
import { LOCAL_WEB_DESIGN_META } from "@/data/localWebDesignMeta";
import { localWebDesignHead } from "@/lib/local-web-design-seo";

export const Route = createFileRoute("/_studio/web-design-armagh")({
  head: () => localWebDesignHead(LOCAL_WEB_DESIGN_META.armagh),
  component: () => <LocalWebDesign slug="armagh" />,
});
