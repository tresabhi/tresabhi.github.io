import type { APIContext, GetStaticPaths, GetStaticPathsResult } from "astro";
import sharp from "sharp";
import { collectImages } from "../../../../core/collectImages";
import { filterSizes } from "../../../../core/filterSizes";
import { globContents } from "../../../../core/globContents";
import { hashContent } from "../../../../core/hashContent";

export const IMAGE_SIZES = [
  320,
  480,
  640,
  800,
  1024,
  1280,
  1600,
  "original",
] as const;

export type ImageSize = (typeof IMAGE_SIZES)[number];

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await globContents();
  const images: string[] = [];

  for (const [, lexer] of pages) {
    const tokens = await lexer();
    images.push(...collectImages(tokens));
  }

  const paths: GetStaticPathsResult = [];

  for (const image of images) {
    const response = await fetch(image);
    const buffer = await response.arrayBuffer();
    const hash = await hashContent(buffer);
    const { sizes } = await filterSizes(buffer);

    for (const size of sizes) {
      paths.push({ params: { hash, size }, props: { image, size } });
    }
  }

  return paths;
};

export async function GET({
  props,
}: APIContext<{ image: string; size: ImageSize }>) {
  const response = await fetch(props.image);
  const buffer = await response.arrayBuffer();
  const image = sharp(buffer).webp();

  if (props.size !== "original") image.resize({ width: props.size });

  return new Response(await image.toBuffer());
}
