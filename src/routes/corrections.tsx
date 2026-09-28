import { createFileRoute } from "@tanstack/react-router";
import { Site } from "@/components/site/shell";
import { CorrectionsView } from "@/components/newsroom/views";
import { getCorrections } from "@/lib/newsroom/public-api";

export const Route = createFileRoute("/corrections")({
  loader: () => getCorrections(),
  component: function CorrectionsPage() {
    const rows = Route.useLoaderData();
    return (
      <Site>
        <CorrectionsView rows={rows} />
      </Site>
    );
  },
});
