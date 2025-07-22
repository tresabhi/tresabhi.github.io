import sharp from "sharp";
import { IMAGE_SIZES } from "../pages/assets/images/[hash]/[size].webp";

export async function filterSizes(buffer: ArrayBuffer) {
  const image = sharp(buffer);
  const metadata = await image.metadata();
  const original = [metadata.width, metadata.height];
  const sizes = IMAGE_SIZES.filter(
    (size) => size === "original" || size <= original[0]
  );

  return { original, sizes };
}
