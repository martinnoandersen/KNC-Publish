import { createFileRoute } from "@tanstack/react-router";
import { Site } from "@/components/site/shell";
import { StoryList } from "@/components/site/home";
import { getListing } from "@/lib/content/public-api";

export const Route = createFileRoute("/tag/$slug")({
  loader: ({ params }) => getListing({ data: { tag: params.slug } }),
  component: function TagPage() {
    const stories = Route.useLoaderData();
    const { slug } = Route.useParams();
    const name = stories[0]?.tags.find((tag) => tag.slug === slug)?.name ?? slug;
    return (
      <Site>
        <StoryList stories={stories} title={`#${name}`} />
      </Site>
    );
  },
});
