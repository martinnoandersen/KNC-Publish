import { createFileRoute } from "@tanstack/react-router";
import { Site, useBoot } from "@/components/site/shell";
import { StoryList } from "@/components/site/home";
import { getListing } from "@/lib/content/public-api";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/posts")({
  loader: () => getListing({ data: { kind: "post" } }),
  component: function PostsPage() {
    const stories = Route.useLoaderData();
    const boot = useBoot();
    return (
      <Site>
        <StoryList stories={stories} title={t(boot.lang, "posts")} />
      </Site>
    );
  },
});
