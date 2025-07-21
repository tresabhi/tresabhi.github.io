import { Code, type CodeProps } from "@radix-ui/themes";
import type { Root } from "hast";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

interface Props extends CodeProps {
  tree: Root;
}

export function TreeAcceptingCode({ tree, ...props }: Props) {
  const node = toJsxRuntime(tree, { Fragment, jsx, jsxs });
  return <Code {...props}>{node}</Code>;
}
