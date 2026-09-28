import { createFileRoute } from "@tanstack/react-router";
import { PagesScreen } from "@/components/desk/ui";

export const Route = createFileRoute("/desk/pages")({
  component: PagesScreen,
});
