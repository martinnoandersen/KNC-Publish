import { createFileRoute } from "@tanstack/react-router";
import { Site } from "@/components/site/shell";
import { PuzzleView } from "@/components/newsroom/views";

export const Route = createFileRoute("/puzzle")({
  component: function PuzzlePage() {
    return (
      <Site>
        <PuzzleView />
      </Site>
    );
  },
});
