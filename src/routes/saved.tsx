import { createFileRoute } from "@tanstack/react-router";
import { Site } from "@/components/site/shell";
import { SavedView } from "@/components/newsroom/views";
import { getListing } from "@/lib/content/public-api";

export const Route = createFileRoute("/saved")({
  loader: () => getListing({ data: {} }),
  component: function SavedPage() {
    const stories = Route.useLoaderData();
    return (
      <Site>
        <SavedView stories={stories} />
      </Site>
    );
  },
});
