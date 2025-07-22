import { filterSizes } from "./filterSizes";
import { hashContent } from "./hashContent";

const ROOT = "/assets/images";

export async function sourceSet(src: string) {
  const response = await fetch(src);
  const buffer = await response.arrayBuffer();
  const name = await hashContent(buffer);
  const { sizes, original } = await filterSizes(buffer);

  const srcset = sizes
    .map(
      (size) =>
        `${ROOT}/${name}/${size}.webp ${size === "original" ? original[0] : size}w`
    )
    .join(", ");
  const originalUrl = `${ROOT}/${name}/original.webp`;

  return { srcset, originalUrl, originalSize: original };
}
