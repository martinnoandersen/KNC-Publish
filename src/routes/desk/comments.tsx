import { createFileRoute } from "@tanstack/react-router";
import { CommentScreen } from "@/components/desk/newsroom";

export const Route = createFileRoute("/desk/comments")({
  component: CommentScreen,
});
