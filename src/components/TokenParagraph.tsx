import { Code, Text } from "@radix-ui/themes";
import type { Tokens } from "marked";
import type { TokenRendererProps } from "./Markdown";

export function TokenParagraph({
  token,
}: TokenRendererProps<Tokens.Paragraph>) {
  const parts = (token.text as string).split(/(`[^`]+`)/g);

  return (
    <Text mb="4">
      {parts.map((part, index) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <Code key={index}>{part.slice(1, -1)}</Code>
        ) : (
          part
        )
      )}
    </Text>
  );
}
