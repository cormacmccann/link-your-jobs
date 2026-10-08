import { createFileRoute } from "@tanstack/react-router";
import StudioShell from "@/components/kamrok/StudioShell";

// Shared studio layout (header, drawers, galaxy) for every page except /fun.
export const Route = createFileRoute("/_studio")({
  component: StudioShell,
});
