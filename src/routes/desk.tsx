import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DeskLayout } from "@/components/desk/ui";

export const Route = createFileRoute("/desk")({
  component: () => (
    <DeskLayout>
      <Outlet />
    </DeskLayout>
  ),
});
