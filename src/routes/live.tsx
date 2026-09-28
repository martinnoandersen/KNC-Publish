import { createFileRoute } from "@tanstack/react-router";
import { Site } from "@/components/site/shell";
import { LiveView } from "@/components/newsroom/views";
import { getListing } from "@/lib/content/public-api";
import { getWires } from "@/lib/newsroom/public-api";

export const Route = createFileRoute("/live")({
  loader: async () => {
    const [wires, stories] = await Promise.all([getWires(), getListing({ data: {} })]);
    return { wires, stories };
  },
  component: function LivePage() {
    const { wires, stories } = Route.useLoaderData();
    return (
      <Site>
        <LiveView wires={wires} stories={stories} />
      </Site>
    );
  },
});
