import { createFileRoute } from "@tanstack/react-router";
import { PluginScreen } from "@/components/desk/ui";

export const Route = createFileRoute("/desk/plugins")({
  component: PluginScreen,
});
