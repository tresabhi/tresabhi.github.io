import { getCollection, type InferEntrySchema } from "astro:content";
import { lexer, type Context } from "./lexer";

const collection = await getCollection("posts");
export const content: Context[] = [];

export type FrontMatter = InferEntrySchema<"posts">;

for (const item of collection) {
  if (!item.filePath) throw new Error("Missing file path");
  if (!item.body) throw new Error("Missing body");

  const frontMatter = item.data;
  const context = await lexer(item.filePath, item.id, item.body);

  if (frontMatter.hero) context.images.add(frontMatter.hero);

  content.push({ ...context, frontMatter });
}
