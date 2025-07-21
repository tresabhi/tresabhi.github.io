import { Flex } from "@radix-ui/themes";
import "@wooorm/starry-night/style/light";
import { lexer, type Tokens } from "marked";
import { TokenCode } from "./TokenCode";
import { TokenHeading } from "./TokenHeading";
import { TokenParagraph } from "./TokenParagraph";

interface Props {
  content: string;
}

export interface TokenRendererProps<Type> {
  token: Type | Tokens.Generic;
}

export function Markdown({ content }: Props) {
  const tokens = lexer(content);

  return (
    <Flex direction="column">
      {tokens.map((token) => {
        switch (token.type) {
          case "heading":
            return <TokenHeading token={token} />;

          case "paragraph":
            return <TokenParagraph token={token} />;

          case "code":
            return <TokenCode token={token} />;

          case "space":
            return null;

          default:
            console.warn(`Unhandled token type: ${token.type}`);
            return null;
        }
      })}
    </Flex>
  );
}
