import { load } from "js-yaml";
import { lexer, marked } from "marked";
import { latexBlockExtension, latexInlineExtension } from "./latexExtensions";

const pathPrefixPattern = /^\.\.\/content\//;
const pathSuffixPattern = /\.md$/;
const frontMatterPattern = /^---\n(.+)\n---/s;

export interface FrontMatter {
  tags?: string[];
}

marked.use({ extensions: [latexBlockExtension, latexInlineExtension] });

function customLexer(content: string) {
  content = content.replaceAll("\r\n", "\n");
  let frontMatter: FrontMatter = {};
  const frontMatterMatch = content.match(frontMatterPattern);

  if (frontMatterMatch) {
    const frontMatterRaw = frontMatterMatch[1];
    frontMatter = load(frontMatterRaw) as FrontMatter;
    content = content.slice(frontMatterMatch[0].length);
  }

  const tokens = lexer(content);

  return { tokens, frontMatter };
}

export type CustomLexerReturnType = Awaited<ReturnType<typeof customLexer>>;

export async function globContents() {
  const glob = import.meta.glob<boolean, string, string>("../content/**/*.md", {
    query: "?raw",
    import: "default",
  });
  const contents: Map<string, () => Promise<CustomLexerReturnType>> = new Map();

  for (const key in glob) {
    const path = key
      .replace(pathPrefixPattern, "")
      .replace(pathSuffixPattern, "");

    contents.set(path, () => glob[key]().then(customLexer));
  }

  return contents;
}
