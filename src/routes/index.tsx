import { createFileRoute } from "@tanstack/react-router";
import { Site } from "@/components/site/shell";
import { HomeView } from "@/components/site/home";
import { getHome } from "@/lib/content/public-api";
import { getWires } from "@/lib/newsroom/public-api";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [home, wires] = await Promise.all([getHome(), getWires()]);
    return { home, wires };
  },
  component: function Home() {
    const { home, wires } = Route.useLoaderData();
    return (
      <Site>
        <HomeView home={home} wires={wires} />
      </Site>
    );
  },
});
