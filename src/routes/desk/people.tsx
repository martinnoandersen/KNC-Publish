import { createFileRoute } from "@tanstack/react-router";
import { PeopleScreen } from "@/components/desk/ui";

export const Route = createFileRoute("/desk/people")({
  component: PeopleScreen,
});
