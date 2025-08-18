import { load } from "js-yaml";
import {
  lexer as _lexer,
  type Token,
  type Tokens,
  type TokensList,
} from "marked";
import z from "zod";
import { fail } from "./fail";
import { git } from "./git";
import { makeDate } from "./makeDate";
import { sluggify } from "./sluggify";

const FRONT_MATTER_DELIMITER = "---";

const FrontMatter = z.object({
  tags: z.optional(z.array(z.string())),
});

export type FrontMatter = z.infer<typeof FrontMatter>;

export interface Context {
  frontMatter: FrontMatter;
  tokens: TokensList;

  slug: string;
  title: string;
  description: string;

  images: Set<string>;
  created: Date;
}

export async function lexer(file: string, content: string) {
  content = content.replaceAll("\r\n", "\n");

  let frontMatter: FrontMatter = {};

  if (content.startsWith(`${FRONT_MATTER_DELIMITER}\n`)) {
    content = content.slice(FRONT_MATTER_DELIMITER.length + 1);
    const index = content.indexOf(`${FRONT_MATTER_DELIMITER}\n`);

    if (index === -1) {
      throw new Error("No second front matter delimiter found");
    }

    const frontMatterContent = content.slice(0, index);
    content = content.slice(index + FRONT_MATTER_DELIMITER.length + 2);
    frontMatter = FrontMatter.parse(load(frontMatterContent));
  }

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
    frontMatter,
    tokens,
    slug,
    title,
    description,
    created,
    images,
  } satisfies Context;
}
