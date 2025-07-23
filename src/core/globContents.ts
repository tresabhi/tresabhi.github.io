import { lexer, marked, type TokensList } from "marked";

const prefix = /^\.\.\/content\//;
const suffix = /\.md$/;

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

    code(src) {
      const match = src.match(/^@(\w+)\s*\((.*)\)/s);

      if (!match) return;

      return {
        type: "macro",
        raw: match[0],
        name: match[1],
        parameters: match[2],
      };
    },
  },
});

export async function globContents() {
  const glob = import.meta.glob<boolean, string, string>("../content/**/*.md", {
    query: "?raw",
    import: "default",
  });
  const content: Map<string, () => Promise<TokensList>> = new Map();

  for (const key in glob) {
    const path = key.replace(prefix, "").replace(suffix, "");
    const _lexer = () => glob[key]().then((value) => lexer(value));

    content.set(path, _lexer);
  }

  return content;
}
