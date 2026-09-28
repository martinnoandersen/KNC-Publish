import { createFileRoute } from "@tanstack/react-router";
import { LayoutScreen } from "@/components/desk/ui";

export const Route = createFileRoute("/desk/layout")({
  component: LayoutScreen,
});
