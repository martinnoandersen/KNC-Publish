import { createFileRoute } from "@tanstack/react-router";
import { LibraryScreen } from "@/components/desk/library";

export const Route = createFileRoute("/desk/kongre")({
  component: function KongreDesk() {
    return <LibraryScreen kind="magazine" />;
  },
});
