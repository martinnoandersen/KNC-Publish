import { createFileRoute } from "@tanstack/react-router";
import { StatsScreen } from "@/components/desk/newsroom";

export const Route = createFileRoute("/desk/stats")({
  component: StatsScreen,
});
