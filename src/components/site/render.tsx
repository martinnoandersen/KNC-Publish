import type { ReactNode } from "react";

function safeSrc(src: string): string | null {
  if (src.startsWith("/media/")) return src;
  if (/^https:\/\/[^\s]+$/.test(src)) return src;
  return null;
}

export function RichText({ text, drop }: { text: string; drop?: boolean }) {
  const blocks = text.split(/\n\n+/).map((block) => block.trim()).filter(Boolean);
  return (
    <div className={drop ? "drop prose-news" : "prose-news"}>
      {blocks.map((block, index) => {
        if (block === "---") {
          return <hr key={index} className="my-8 border-rule" />;
        }
        if (block.startsWith("## ")) {
          return (
            <h2 key={index} className="mt-8 mb-3 font-serif text-2xl">
              {block.slice(3)}
            </h2>
          );
        }
        const image = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (image) {
          const src = safeSrc(image[2] ?? "");
          if (!src) return null;
          return (
            <figure key={index} className="my-6">
              <img src={src} alt={image[1] || ""} className="w-full object-cover" />
              {image[1] ? <figcaption className="mt-2 text-sm text-muted">{image[1]}</figcaption> : null}
            </figure>
          );
        }
        if (block.startsWith("> ")) {
          return (
            <blockquote key={index} className="my-6 border-s-2 border-crimson ps-4 font-serif text-2xl leading-snug">
              {block.slice(2)}
            </blockquote>
          );
        }
        if (block.split("\n").every((line) => line.startsWith("- "))) {
          return (
            <ul key={index} className="my-4 list-disc ps-5">
              {block.split("\n").map((line) => (
                <li key={line} className="mt-1">{line.slice(2)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} className="text-lg leading-relaxed">
            {block}
          </p>
        );
      })}
    </div>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-widest text-crimson uppercase">{children}</p>
  );
}
