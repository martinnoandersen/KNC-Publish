import { createFileRoute } from "@tanstack/react-router";
import { AppearanceScreen } from "@/components/desk/ui";

export const Route = createFileRoute("/desk/appearance")({
  component: AppearanceScreen,
});
