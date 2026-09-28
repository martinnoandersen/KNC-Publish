import { createFileRoute } from "@tanstack/react-router";
import { Site } from "@/components/site/shell";
import { MastheadView } from "@/components/newsroom/views";
import { getMasthead } from "@/lib/newsroom/public-api";

export const Route = createFileRoute("/masthead")({
  loader: () => getMasthead(),
  component: function MastheadPage() {
    const people = Route.useLoaderData();
    return (
      <Site>
        <MastheadView people={people} />
      </Site>
    );
  },
});
