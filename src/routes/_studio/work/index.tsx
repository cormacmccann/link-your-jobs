import { createFileRoute } from "@tanstack/react-router";
import { PORTFOLIO_DESCRIPTION } from "@/data/projects";
import Work from "@/pages/kamrok/Work";
import { collectionLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/work/")({
  head: () =>
    pageHead({
      path: "/work",
      title: "Selected Work \u2014 Web Design Portfolio | KAMROK",
      description: PORTFOLIO_DESCRIPTION,
      jsonLd: collectionLd(
        "Selected Work — Web Design Portfolio | KAMROK",
        PORTFOLIO_DESCRIPTION,
        "/work",
      ),
    }),
  component: Work,
});
