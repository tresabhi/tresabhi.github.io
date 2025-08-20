import type { Token, Tokens } from "marked";

export function collectImages(tokens: Token[], set = new Set<string>()) {
  for (const token of tokens) {
    if (token.type === "image") set.add(token.href);

    if (token.type === "table") {
      for (const cell of token.header as Tokens.TableCell[]) {
        if (cell.tokens) collectImages(cell.tokens, set);
      }

      for (const row of token.rows as Tokens.TableCell[][]) {
        for (const cell of row) {
          if (cell.tokens) collectImages(cell.tokens, set);
        }
      }
    }

    if ("tokens" in token && token.tokens !== undefined) {
      collectImages(token.tokens, set);
    }
  }

  return set;
}
