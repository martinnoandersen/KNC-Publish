import { createFileRoute, notFound } from "@tanstack/react-router";
import { Site } from "@/components/site/shell";
import { ArticleView } from "@/components/site/article";
import { getStory } from "@/lib/content/public-api";

export const Route = createFileRoute("/article/$slug")({
  loader: async ({ params }) => {
    const data = await getStory({ data: params.slug });
    if (!data) throw notFound();
    return data;
  },
  component: function ArticlePage() {
    const data = Route.useLoaderData();
    return (
      <Site>
        <ArticleView story={data.story} related={data.related} />
      </Site>
    );
  },
});
