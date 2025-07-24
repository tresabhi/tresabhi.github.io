import { load } from "js-yaml";
import { lexer, marked } from "marked";

const pathPrefixPattern = /^\.\.\/content\//;
const pathSuffixPattern = /\.md$/;
const frontMatterPattern = /^---\n(.+)\n---/;

export interface FrontMatter {
  hero: string;
}

type FrontMatterPartial = Partial<FrontMatter>;

marked.use({
  tokenizer: {
    // code(src) {
    //   const match = src.match(/^\$+([^\$\n]+?)\$+/);

    //   if (!match) return;

    //   return {
    //     type: "latex",
    //     raw: match[0],
    //     text: match[1].trim(),
    //   } satisfies LatexToken;
    // },

    code: (src: string) => {
      const match = src.match(/^@(\w+)\s*\((.*)\)/s);

      if (!match) return;

      return {
        type: "macro",
        raw: match[0],
        name: match[1],
        parameters: match[2],
      };
    },
  } as any, // unfortunately the type annotations from the library are incorrect
});

function customLexer(content: string) {
  content = content.replaceAll("\r\n", "\n");
  let frontMatter: FrontMatterPartial = {};
  const frontMatterMatch = content.match(frontMatterPattern);

  if (frontMatterMatch) {
    const frontMatterRaw = frontMatterMatch[1];
    frontMatter = load(frontMatterRaw) as FrontMatterPartial;
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
