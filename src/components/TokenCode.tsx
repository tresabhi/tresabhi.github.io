import { Code } from "@radix-ui/themes";
import { all, createStarryNight } from "@wooorm/starry-night";
import "@wooorm/starry-night/style/light";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { type Tokens } from "marked";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import type { TokenRendererProps } from "./Markdown";

export async function TokenCode({ token }: TokenRendererProps<Tokens.Code>) {
  const starryNight = await createStarryNight(all);
  const scope = starryNight.flagToScope(token.lang);

  if (scope === undefined) {
    throw new Error(`Unsupported language: ${token.lang}`);
  }

  const tree = starryNight.highlight(token.text, scope);
  const node = toJsxRuntime(tree, { Fragment, jsx, jsxs });

  return (
    <Code
      mb="4"
      style={{
        whiteSpace: "pre-wrap",
        padding: "var(--space-3)",
        lineHeight: "1.5em",
      }}
    >
      {node}
    </Code>
  );
}
