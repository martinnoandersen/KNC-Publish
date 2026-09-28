import { createFileRoute } from "@tanstack/react-router";
import { Site } from "@/components/site/shell";
import { ArchiveView } from "@/components/newsroom/views";
import { getListing } from "@/lib/content/public-api";

export const Route = createFileRoute("/archive")({
  validateSearch: (search: Record<string, unknown>) => ({
    m: typeof search.m === "string" && /^\d{4}-\d{2}$/.test(search.m) ? search.m : "",
  }),
  loader: () => getListing({ data: {} }),
  component: function ArchivePage() {
    const stories = Route.useLoaderData();
    const { m } = Route.useSearch();
    return (
      <Site>
        <ArchiveView stories={stories} month={m} />
      </Site>
    );
  },
});
