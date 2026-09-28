import { createFileRoute } from "@tanstack/react-router";
import { Site } from "@/components/site/shell";
import { LettersView } from "@/components/newsroom/views";
import { getListing } from "@/lib/content/public-api";

export const Route = createFileRoute("/newsletters")({
  loader: () => getListing({ data: {} }),
  component: function LettersPage() {
    const stories = Route.useLoaderData();
    return (
      <Site>
        <LettersView stories={stories} />
      </Site>
    );
  },
});
