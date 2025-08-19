import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  loader: glob({ pattern: "*.md", base: "src/content" }),
  schema: z.object({
    tags: z.optional(z.array(z.string())),
    draft: z.optional(z.boolean()),
  }),
});

export const collections = { posts };
