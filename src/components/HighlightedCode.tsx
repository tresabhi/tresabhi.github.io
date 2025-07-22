import { CopyIcon } from "@radix-ui/react-icons";
import { Box, Button, Code, Flex, ScrollArea, Text } from "@radix-ui/themes";
import { all, createStarryNight } from "@wooorm/starry-night";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { useEffect, useRef } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

interface Props {
  lang: string;
  content: string;
}

const LANGUAGES = new Map([
  [["ts", "tsx"], "TypeScript"],
  [["js", "jsx"], "JavaScript"],
]);

const starryNight = await createStarryNight(all);

export function HighlightedCode({ lang, content }: Props) {
  const scope = starryNight.flagToScope(lang);

  if (scope === undefined) {
    throw new Error(`Unsupported language: ${lang}`);
  }

  const tree = starryNight.highlight(content, scope);
  const node = toJsxRuntime(tree, { Fragment, jsx, jsxs });
  const size = `${content.length}B`;

  let language: string | undefined;

  for (const [types, name] of LANGUAGES) {
    if (types.includes(lang)) {
      language = name;
      break;
    }
  }

  if (language === undefined) {
    throw new Error(`Unsupported language: ${lang}`);
  }

  const code = useRef<HTMLDivElement>(null);
  const leftCurtain = useRef<HTMLDivElement>(null);
  const rightCurtain = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!code.current) return;

    code.current.addEventListener("scroll", () => {
      if (!code.current || !leftCurtain.current || !rightCurtain.current) {
        return;
      }

      const x =
        code.current.scrollLeft /
        (code.current.scrollWidth - code.current.clientWidth);

      leftCurtain.current.style.opacity = `${x}`;
      rightCurtain.current.style.opacity = `${1 - x}`;
    });
  }, []);

  return (
    <Flex direction="column" mt="4" mb="6" gap="3" align="start">
      <Box
        style={{ background: "var(--gray-3)", borderRadius: "var(--radius-3)" }}
        overflow="hidden"
        width="100%"
        position="relative"
      >
        <ScrollArea ref={code}>
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
        </ScrollArea>

        <Box
          ref={leftCurtain}
          width="2rem"
          height="100%"
          position="absolute"
          left="0"
          top="0"
          style={{
            opacity: 0,
            pointerEvents: "none",
            background: "linear-gradient(90deg, var(--gray-3), transparent)",
          }}
        />
        <Box
          ref={rightCurtain}
          width="2rem"
          height="100%"
          position="absolute"
          right="0"
          top="0"
          style={{
            opacity: 1,
            pointerEvents: "none",
            background: "linear-gradient(90deg, transparent, var(--gray-3))",
          }}
        />
      </Box>

      <Flex align="center" gap="4">
        <Text size="2" color="gray">
          {language} • {size}
        </Text>
        <Button
          variant="ghost"
          onClick={() => navigator.clipboard.writeText(content)}
        >
          <CopyIcon /> Copy
        </Button>
      </Flex>
    </Flex>
  );
}
