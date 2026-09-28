import { createFileRoute } from "@tanstack/react-router";
import { ReviewScreen } from "@/components/desk/ui";

export const Route = createFileRoute("/desk/review")({
  component: ReviewScreen,
});
