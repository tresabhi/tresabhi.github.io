import { Code } from "@radix-ui/themes";
import type { Root } from "hast";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

interface Props {
  tree: Root | string;
}

export function HighlightedCodeContent({ tree }: Props) {
  const node =
    typeof tree === "string"
      ? tree
      : toJsxRuntime(tree, { Fragment, jsx, jsxs });

  return (
    <Code
      variant="ghost"
      style={{
        overflow: "auto",
        padding: "var(--space-3)",
        display: "block",
        whiteSpace: "pre",
        lineHeight: "1.5em",
      }}
      children={node}
    />
  );
}
