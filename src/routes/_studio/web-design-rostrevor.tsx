import { createFileRoute } from "@tanstack/react-router";
import LocalWebDesign from "@/pages/kamrok/LocalWebDesign";
import { LOCAL_WEB_DESIGN_META } from "@/data/localWebDesignMeta";
import { localWebDesignHead } from "@/lib/local-web-design-seo";

const location = LOCAL_WEB_DESIGN_META.rostrevor;
export const Route = createFileRoute("/_studio/web-design-rostrevor")({
  head: () => localWebDesignHead(location),
  component: () => <LocalWebDesign slug="rostrevor" />,
});
