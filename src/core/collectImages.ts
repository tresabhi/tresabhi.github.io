import type { Token } from "marked";

export function collectImages(tokens: Token[], set = new Set<string>()) {
  for (const token of tokens) {
    if (token.type === "image") set.add(token.href);

    if ("tokens" in token && token.tokens !== undefined) {
      collectImages(token.tokens, set);
    }
  }

  return set;
}
