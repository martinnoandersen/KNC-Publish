import { createFileRoute } from "@tanstack/react-router";
import { Site } from "@/components/site/shell";
import { NumbersView } from "@/components/newsroom/views";
import { getPulse } from "@/lib/newsroom/public-api";

export const Route = createFileRoute("/data")({
  loader: () => getPulse(),
  component: function DataPage() {
    const pulse = Route.useLoaderData();
    return (
      <Site>
        <NumbersView pulse={pulse} />
      </Site>
    );
  },
});
