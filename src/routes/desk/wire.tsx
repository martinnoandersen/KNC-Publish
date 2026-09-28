import { createFileRoute } from "@tanstack/react-router";
import { WireScreen } from "@/components/desk/newsroom";

export const Route = createFileRoute("/desk/wire")({
  component: WireScreen,
});
