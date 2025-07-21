import { CopyIcon } from "@radix-ui/react-icons";
import { Button, Code, Flex, Text } from "@radix-ui/themes";
import type { Root } from "hast";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

interface Props {
  tree: Root;
  language: string;
  size: string;
  raw: string;
}

export function HighlightedCode({ tree, size, raw, language }: Props) {
  const node = toJsxRuntime(tree, { Fragment, jsx, jsxs });

  return (
    <Flex direction="column" mt="4" mb="6" gap="3">
      <Code
        color="gray"
        style={{
          padding: "var(--space-3)",
          whiteSpace: "pre-wrap",
          lineHeight: "1.5em",
        }}
      >
        {node}
      </Code>

      <Flex align="center" gap="4">
        <Text size="2" color="gray">
          {language} • {size}
        </Text>
        <Button
          variant="ghost"
          onClick={() => navigator.clipboard.writeText(raw)}
        >
          <CopyIcon /> Copy
        </Button>
      </Flex>
    </Flex>
  );
}
