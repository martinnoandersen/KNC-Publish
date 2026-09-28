export type Block =
  | { id: string; type: "p"; text: string }
  | { id: string; type: "h"; text: string }
  | { id: string; type: "quote"; text: string }
  | { id: string; type: "list"; text: string }
  | { id: string; type: "image"; alt: string; src: string }
  | { id: string; type: "hr" };

let seq = 0;
function nid(): string {
  seq += 1;
  return `b${seq.toString(36)}`;
}

export function parseBlocks(body: string): Block[] {
  const chunks = body.split(/\n\n+/).map((part) => part.trim()).filter(Boolean);
  if (chunks.length === 0) return [{ id: nid(), type: "p", text: "" }];
  return chunks.map((block) => {
    if (block === "---") return { id: nid(), type: "hr" as const };
    if (block.startsWith("## ")) return { id: nid(), type: "h" as const, text: block.slice(3) };
    if (block.startsWith("> ")) return { id: nid(), type: "quote" as const, text: block.replace(/^> /gm, "") };
    const image = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) return { id: nid(), type: "image" as const, alt: image[1] ?? "", src: image[2] ?? "" };
    if (block.split("\n").every((line) => line.startsWith("- "))) {
      return { id: nid(), type: "list" as const, text: block.split("\n").map((line) => line.slice(2)).join("\n") };
    }
    return { id: nid(), type: "p" as const, text: block };
  });
}

export function serializeBlocks(blocks: Block[]): string {
  return blocks
    .map((block) => {
      if (block.type === "hr") return "---";
      if (block.type === "h") return `## ${block.text.trim()}`;
      if (block.type === "quote") return block.text.trim().split("\n").map((line) => `> ${line}`).join("\n");
      if (block.type === "image") return `![${block.alt.trim()}](${block.src.trim()})`;
      if (block.type === "list") {
        return block.text
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => `- ${line}`)
          .join("\n");
      }
      return block.text.trim();
    })
    .filter(Boolean)
    .join("\n\n");
}

export function emptyBlock(type: Block["type"]): Block {
  const id = nid();
  if (type === "hr") return { id, type };
  if (type === "image") return { id, type, alt: "", src: "/media/citadel.jpg" };
  return { id, type, text: "" };
}
