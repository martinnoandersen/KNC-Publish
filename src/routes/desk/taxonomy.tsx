import { createFileRoute } from "@tanstack/react-router";
import { TaxonomyScreen } from "@/components/desk/ui";

export const Route = createFileRoute("/desk/taxonomy")({
  component: TaxonomyScreen,
});
