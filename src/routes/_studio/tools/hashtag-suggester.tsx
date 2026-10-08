import { createFileRoute } from "@tanstack/react-router";
import HashtagSuggester from "@/pages/tools/HashtagSuggester";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/hashtag-suggester")({
  head: () => toolHead("hashtag-suggester"),
  component: HashtagSuggester,
});
