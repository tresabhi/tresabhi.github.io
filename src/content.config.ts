import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "docs" }),
  schema: z.object({
    tags: z.optional(z.array(z.string())),
    draft: z.optional(z.boolean()),
    hero: z.optional(z.string()),
  }),
});

export const collections = { docs };
