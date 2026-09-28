import { createFileRoute } from "@tanstack/react-router";
import { Site } from "@/components/site/shell";
import { CalendarView } from "@/components/newsroom/views";
import { getAgenda } from "@/lib/newsroom/public-api";

export const Route = createFileRoute("/events")({
  loader: () => getAgenda(),
  component: function EventsPage() {
    const events = Route.useLoaderData();
    return (
      <Site>
        <CalendarView events={events} />
      </Site>
    );
  },
});
