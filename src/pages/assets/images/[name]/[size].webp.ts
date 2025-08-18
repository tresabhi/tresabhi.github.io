import type { APIContext, GetStaticPaths, GetStaticPathsResult } from "astro";
import sharp from "sharp";
import { content } from "../../../../core/content";
import { hashContent } from "../../../../core/hashContent";
import { sourceSet } from "../../../../core/sourceSet";

export const getStaticPaths: GetStaticPaths = async () => {
  let images = new Set<string>();

  for (const context of content) images = images.union(context.images);

  const paths: GetStaticPathsResult = [];

  for (const src of images) {
    const response = await fetch(src);
    const buffer = await response.arrayBuffer();
    const image = sharp(buffer);
    const name = await hashContent(buffer);
    const { sizes, metadata } = await sourceSet(image, name);

    for (const size of sizes) {
      paths.push({
        params: { name, size },
        props: {
          image: src,
          size: size === "original" ? metadata.width : size,
        },
      });
    }
  }

  return paths;
};

export async function GET({
  props,
}: APIContext<{ image: string; size: number }>) {
  const response = await fetch(props.image);
  const buffer = await response.arrayBuffer();
  const image = sharp(buffer).webp().resize({ width: props.size });

  return new Response(await image.toBuffer());
}
