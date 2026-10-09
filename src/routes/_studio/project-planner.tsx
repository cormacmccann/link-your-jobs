import { createFileRoute } from "@tanstack/react-router";
import ProjectPlanner from "@/pages/planning/ProjectPlanner";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/_studio/project-planner")({
  head: () =>
    pageHead({
      path: "/project-planner",
      title: "Website Project Planner & Cost Estimator | KAMROK",
      description:
        "Build from scratch or give your website a fresh start. Find your scope, compare WordPress and Lovable, and leave with a useful project brief.",
    }),
  component: ProjectPlanner,
});
