import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { sluggify } from "../core/sluggify";
import { Section } from "./Section";
import { Skills } from "./Skills";

interface ProjectProps {
  image: string;
  imageSmall?: string;
  shadowX?: string;
  shadowY?: string;
  shadowIntensity?: number;
  title: string;
  skills?: string[];
  children: React.ReactNode;
  imageWidth: string;
  reverse?: boolean;
  sticky?: boolean;
  time: string;
}

export function Project({
  image,
  imageSmall,
  reverse,
  shadowIntensity = 6,
  shadowX = reverse ? "var(--space-1)" : "calc(var(--space-1) * -1)",
  shadowY = "var(--space-1)",
  title,
  skills,
  children,
  imageWidth,
  sticky,
  time,
}: ProjectProps) {
  return (
    <Section align="center" id={`project-${sluggify(title)}`}>
      <Flex
        justify="center"
        gap="6rem"
        direction={{
          initial: "column-reverse",
          md: reverse ? "row-reverse" : "row",
        }}
        maxWidth="60rem"
        align={sticky ? "start" : "center"}
      >
        <Flex flexGrow="1" direction="column" gap="4">
          <Flex align="center" gap="4">
            <Heading weight="medium">{title}</Heading>
            <Text color="gray" size="2">
              {time}
            </Text>
          </Flex>

          {skills && <Skills skills={skills} />}

          <Flex
            justify="center"
            mt="4"
            mb="6"
            display={{ initial: "flex", md: "none" }}
          >
            <img
              src={imageSmall ?? image}
              style={{
                top: "var(--space-5)",
                flexShrink: 0,
                width: imageSmall ? "100%" : `min(100%, ${imageWidth})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: `drop-shadow(${shadowX} ${shadowY} 0.25rem var(--black-a${shadowIntensity}))`,
                borderRadius: "var(--space-3)",
              }}
            />
          </Flex>

          {children}
        </Flex>

        <Box
          display={{ initial: "none", md: "block" }}
          position={sticky ? "sticky" : "static"}
          top="5"
        >
          <img
            src={image}
            style={{
              flexShrink: 0,
              width: imageWidth,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: `drop-shadow(${shadowX} ${shadowY} 0.25rem var(--black-a${shadowIntensity}))`,
              borderRadius: "var(--space-3)",
            }}
          />
        </Box>
      </Flex>
    </Section>
  );
}
