import { createFileRoute } from "@tanstack/react-router";
import { StoryEditor } from "@/components/desk/ui";

export const Route = createFileRoute("/desk/new")({
  component: () => <StoryEditor />,
});
