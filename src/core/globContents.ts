import { lexer, type TokensList } from "marked";

const prefix = /^\.\.\/content\//;
const suffix = /\.md$/;

export async function globContents() {
  const glob = import.meta.glob<boolean, string, string>("../content/**/*.md", {
    query: "?raw",
    import: "default",
  });
  const content: Map<string, () => Promise<TokensList>> = new Map();

  for (const key in glob) {
    const path = key.replace(prefix, "").replace(suffix, "");
    const _lexer = () => glob[key]().then(lexer);

    content.set(path, _lexer);
  }

  return content;
}
