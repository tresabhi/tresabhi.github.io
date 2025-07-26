import type { Sharp } from "sharp";

const ROOT = "/assets/images";

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

export async function sourceSet(image: Sharp, name: string) {
  const metadata = await image.metadata();
  const sizes = IMAGE_SIZES.filter(
    (size) => size === "original" || size <= metadata.width
  );
  const srcset = sizes
    .map(
      (size) =>
        `${ROOT}/${name}/${size}.webp ${size === "original" ? metadata.width : size}w`
    )
    .join(", ");
  const src = `${ROOT}/${name}/original.webp ${metadata.width}w`;

  return { src, srcset, metadata, sizes };
}
