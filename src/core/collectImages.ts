import type { Token } from "marked";

export function collectImages(tokens: Token[]) {
  const images: string[] = [];

  for (const token of tokens) {
    if (token.type === "image") images.push(token.href);

    if ("tokens" in token && token.tokens !== undefined) {
      images.push(...collectImages(token.tokens));
    }
  }

  return images;
}
