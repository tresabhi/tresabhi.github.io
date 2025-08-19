import {
  lexer as _lexer,
  use,
  type Token,
  type Tokens,
  type TokensList,
} from "marked";
import type { FrontMatter } from "./content";
import { fail } from "./fail";
import { git } from "./git";
import { latexBlockExtension, latexInlineExtension } from "./latexExtensions";
import { makeDate } from "./makeDate";
import { sluggify } from "./sluggify";

export interface Context {
  frontMatter: FrontMatter;
  tokens: TokensList;

  slug: string;
  title: string;
  description: string;

  images: Set<string>;
  created: Date;
}

use({ extensions: [latexBlockExtension, latexInlineExtension] });

export async function lexer(file: string, content: string) {
  const tokens = _lexer(content);

  const h0 =
    tokens.find(
      (token): token is Tokens.Heading =>
        token.type === "heading" && token.depth === 1
    ) ?? fail("No heading found");
  const p0 =
    tokens.find(
      (token): token is Tokens.Paragraph => token.type === "paragraph"
    ) ?? fail("No description found");

  const title = h0.text;
  const description = p0.text;
  const slug = sluggify(title);

  const created = await git
    .log({ file, n: 1, "--diff-filter": "A" })
    .then((log) => makeDate(log.latest?.date));

  const images = new Set<string>();

  function explore(tokens: Token[]) {
    for (const token of tokens) {
      if (token.type === "image") images.add(token.href);
      if ("tokens" in token && token.tokens) explore(token.tokens);
    }
  }

  explore(tokens);

  return {
    tokens,
    slug,
    title,
    description,
    created,
    images,
  } satisfies Omit<Context, "frontMatter">;
}
