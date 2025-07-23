import type { Tokens } from "marked";

export function unsupportedTokens(token: Tokens.Generic, name: string) {
  if (token.tokens) throw new Error(`Tokens not supported within ${name}`);
}
