import { createFileRoute } from "@tanstack/react-router";
import { Site, useBoot } from "@/components/site/shell";
import { SectionBand, StoryList } from "@/components/site/home";
import { FollowButton } from "@/components/site/reader";
import { getListing } from "@/lib/content/public-api";

export const Route = createFileRoute("/section/$slug")({
  loader: ({ params }) => getListing({ data: { category: params.slug } }),
  component: function SectionPage() {
    const stories = Route.useLoaderData();
    const { slug } = Route.useParams();
    const boot = useBoot();
    const name = boot.categories.find((category) => category.slug === slug)?.name ?? slug;
    const front = stories.slice(0, 6);
    const rest = stories.slice(6);
    return (
      <Site>
        <div className="mx-auto max-w-6xl px-4 pt-8">
          <SectionBand section={{ slug, name, stories: front }} lang={boot.lang} style={boot.layout.styles[slug]} />
        </div>
        {rest.length > 0 ? <StoryList stories={rest} title={name} toolbar={<FollowButton kind="section" target={slug} />} /> : (
          <div className="mx-auto max-w-6xl px-4 pb-8"><FollowButton kind="section" target={slug} /></div>
        )}
      </Site>
    );
  },
});