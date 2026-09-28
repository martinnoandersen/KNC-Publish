import { createFileRoute } from "@tanstack/react-router";
import { LibraryScreen } from "@/components/desk/library";

export const Route = createFileRoute("/desk/books")({
  component: function BooksDesk() {
    return <LibraryScreen kind="book" />;
  },
});
