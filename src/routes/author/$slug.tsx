import { createFileRoute, notFound } from "@tanstack/react-router";
import { Site } from "@/components/site/shell";
import { AuthorView } from "@/components/site/article";
import { getAuthor } from "@/lib/content/public-api";

export const Route = createFileRoute("/author/$slug")({
  loader: async ({ params }) => {
    const profile = await getAuthor({ data: params.slug });
    if (!profile) throw notFound();
    return profile;
  },
  component: function AuthorPage() {
    const profile = Route.useLoaderData();
    return (
      <Site>
        <AuthorView profile={profile} />
      </Site>
    );
  },
});
