import { createFileRoute } from "@tanstack/react-router";
import { StoryEditor } from "@/components/desk/ui";

export const Route = createFileRoute("/desk/edit/$id")({
  component: function EditStory() {
    const { id } = Route.useParams();
    return <StoryEditor id={Number(id)} />;
  },
});
