import { createFileRoute } from "@tanstack/react-router";
import { Site } from "@/components/site/shell";
import { BriefingView } from "@/components/newsroom/views";
import { getHome } from "@/lib/content/public-api";

export const Route = createFileRoute("/briefing")({
  loader: () => getHome(),
  component: function BriefingPage() {
    const home = Route.useLoaderData();
    return (
      <Site>
        <BriefingView home={home} />
      </Site>
    );
  },
});
