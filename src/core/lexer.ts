import { lexer as _lexer, use, type Tokens, type TokensList } from "marked";
import { collectImages } from "./collectImages";
import type { FrontMatter } from "./content";
import { git } from "./git";
import { latexBlockExtension, latexInlineExtension } from "./latexExtensions";
import { makeDate } from "./makeDate";

export interface Context {
  frontMatter: FrontMatter;
  tokens: TokensList;

  path: string;
  title: string;
  description?: string;

  images: Set<string>;
  created: Date;
}

use({ extensions: [latexBlockExtension, latexInlineExtension] });

export async function lexer(file: string, path: string, content: string) {
  const tokens = _lexer(content);

  const title =
    tokens.find(
      (token): token is Tokens.Heading =>
        token.type === "heading" && token.depth === 1
    )?.text ?? file;
  const description = tokens.find(
    (token): token is Tokens.Paragraph => token.type === "paragraph"
  )?.text;

  const created = await git
    .log({ file, n: 1, "--diff-filter": "A" })
    .then((log) => makeDate(log.latest?.date));

  const images = collectImages(tokens);

  return {
    tokens,
    path,
    title,
    description,
    created,
    images,
  } satisfies Omit<Context, "frontMatter">;
}
