import { createFileRoute } from "@tanstack/react-router";
import { ProfileScreen } from "@/components/desk/ui";

export const Route = createFileRoute("/desk/profile")({
  component: ProfileScreen,
});
