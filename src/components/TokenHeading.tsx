import { Flex, Heading, type HeadingProps } from "@radix-ui/themes";
import type { Tokens } from "marked";
import { ConsistentSeparator } from "./ConsistentSeparator";
import type { TokenRendererProps } from "./Markdown";

export function TokenHeading({ token }: TokenRendererProps<Tokens.Heading>) {
  return (
    <Flex direction="column" my="4">
      <Heading size={`${9 - token.depth}` as HeadingProps["size"]} mb="0.25em">
        {token.text}
      </Heading>
      <ConsistentSeparator />
    </Flex>
  );
}
