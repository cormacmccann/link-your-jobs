import { createFileRoute } from "@tanstack/react-router";
import LocalWebDesign from "@/pages/kamrok/LocalWebDesign";
import { LOCAL_WEB_DESIGN_META } from "@/data/localWebDesignMeta";
import { localWebDesignHead } from "@/lib/local-web-design-seo";

const location = LOCAL_WEB_DESIGN_META.dundalk;
export const Route = createFileRoute("/_studio/web-design-dundalk")({
  head: () => localWebDesignHead(location),
  component: () => <LocalWebDesign slug="dundalk" />,
});
