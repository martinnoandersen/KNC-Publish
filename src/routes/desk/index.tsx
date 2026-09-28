import { createFileRoute } from "@tanstack/react-router";
import { DeskHome } from "@/components/desk/ui";

export const Route = createFileRoute("/desk/")({
  component: DeskHome,
});
