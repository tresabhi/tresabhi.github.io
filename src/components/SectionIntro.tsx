import {
  CopyIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { Box, Flex, IconButton, Link, Popover, Text } from "@radix-ui/themes";
import { imgur } from "../core/imgur";
import type { MaybeSkeletonProps } from "../types/skeleton";
import { Engine } from "./Engine";
import { IntroDot } from "./IntroDot";
import { Section } from "./Section";

export function SectionIntro({ skeleton }: MaybeSkeletonProps) {
  return (
    <Section
      appearance="dark"
      style={{
        position: "relative",
        overflow: "clip",
        background: "var(--gray-3)",
      }}
    >
      {!skeleton && <Engine />}

      <Flex
        direction="column"
        flexGrow="1"
        gap={{ initial: "7", md: "9" }}
        position="relative"
        px={{ initial: "0", md: "9" }}
        justify={{ initial: "center", md: "start" }}
      >
        <Flex
          direction={{ initial: "column-reverse", md: "row" }}
          justify="between"
          gap={{ initial: "7", md: "9" }}
          py={{ initial: "0", md: "9" }}
          align={{ initial: "center", md: "start" }}
        >
          <Flex flexGrow="1" flexBasis="0" maxWidth="38rem">
            <Box display={{ initial: "none", md: "block" }}>
              <Text
                size="5"
                wrap="pretty"
                style={{
                  lineHeight: "1.8",
                }}
              >
                Hi, I'm <Text weight="bold">Abhi</Text>, an{" "}
                <Text
                  weight="bold"
                  color="red"
                  style={{ color: "var(--accent-10)" }}
                >
                  Aerospace Engineer
                </Text>{" "}
                driven by an insatiable curiosity and a passion for turning
                ambitious ideas into reality. From designing and manufacturing
                jet engines and pioneering in autonomous robotics to building
                software that bridges the gap between the digital and physical
                worlds, I am fueled by a love for <i>exploration</i> and{" "}
                <i>self-learning</i>. With every project, I strive to push
                boundaries and inspire innovation in aerospace and beyond.
              </Text>
            </Box>

            <Box display={{ initial: "block", md: "none" }}>
              <Text
                size={{ initial: "3", xs: "4" }}
                wrap="pretty"
                style={{ lineHeight: "1" }}
              >
                Hi, I'm <Text weight="bold">Abhi</Text>—an{" "}
                <Text
                  weight="bold"
                  color="red"
                  style={{ color: "var(--accent-10)" }}
                >
                  Aerospace Engineer
                </Text>{" "}
                driven by an insatiable curiosity and a passion for turning
                ambitious ideas into reality. From designing and manufacturing
                jet engines and pioneering in autonomous robotics to building
                software that bridges the gap between the digital and physical
                worlds, I am fueled by a love for <i>exploration</i> and{" "}
                <i>self-learning</i>. With every project, I strive to push
                boundaries and inspire innovation in aerospace and beyond.
              </Text>
            </Box>
          </Flex>

          <Box
            flexGrow="0"
            overflow="hidden"
            width={{ initial: "12rem", xs: "17rem" }}
            height={{ initial: "12rem", xs: "17rem" }}
            style={{
              backgroundImage: `url(${imgur("FEx150k", { format: "jpeg" })})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "45% 25%",
              objectPosition: "top",
              borderRadius: "var(--radius-3)",
              boxShadow: "var(--shadow-2)",
            }}
          >
            <Box
              width="100%"
              height="100%"
              style={{
                backgroundColor: "var(--gray-a3)",
                filter: "invert(1)",
              }}
            />
          </Box>
        </Flex>

        <Flex
          justify="between"
          direction={{ initial: "column", md: "row" }}
          gap={{ initial: "4", xs: "2", md: "0" }}
          align="center"
          position="relative"
        >
          <Flex
            gap={{ initial: "5", xs: "4" }}
            wrap="wrap"
            gapY="0"
            justify="center"
          >
            <Popover.Root>
              <Popover.Trigger>
                <Link
                  href="mailto:abhigyaan457@gmail.com"
                  size={{ initial: "3", sm: "4" }}
                  style={{ color: "var(--accent-10)" }}
                >
                  <Flex align="center" gap="2">
                    <EnvelopeClosedIcon width="1em" height="1em" />
                    Gmail
                  </Flex>
                </Link>
              </Popover.Trigger>

              <Popover.Content size="1">
                <Flex align="center" gap="2">
                  <Text>
                    E-mail app didn't open? Mail to abhigyaan457@gmail.com{" "}
                  </Text>

                  <Popover.Close>
                    <IconButton
                      variant="ghost"
                      onClick={() => {
                        navigator.clipboard.writeText("abhigyaan457@gmail.com");
                      }}
                    >
                      <CopyIcon />
                    </IconButton>
                  </Popover.Close>
                </Flex>
              </Popover.Content>
            </Popover.Root>

            <IntroDot />

            <Link
              href="https://www.linkedin.com/in/abhigyaan-deep-7b3a9b278/"
              size={{ initial: "3", sm: "4" }}
              target="_blank"
              style={{ color: "var(--accent-10)" }}
            >
              <Flex align="center" gap="2">
                <LinkedInLogoIcon width="1em" height="1em" />
                LinkedIn
              </Flex>
            </Link>

            <IntroDot />

            <Link
              href="https://github.com/tresabhi"
              size={{ initial: "3", sm: "4" }}
              target="_blank"
              style={{ color: "var(--accent-10)" }}
            >
              <Flex align="center" gap="2">
                <GitHubLogoIcon width="1em" height="1em" />
                GitHub
              </Flex>
            </Link>
          </Flex>

          <Flex
            gap={{ initial: "5", xs: "4" }}
            wrap="wrap"
            gapY="0"
            justify="center"
          >
            <Link
              href="#journey"
              size={{ initial: "3", sm: "4" }}
              style={{ color: "var(--accent-10)" }}
            >
              Journey
            </Link>

            <IntroDot />

            <Link
              href="#projects"
              size={{ initial: "3", sm: "4" }}
              style={{ color: "var(--accent-10)" }}
            >
              Projects
            </Link>

            <IntroDot />

            <Link
              href="/resume.pdf"
              target="_blank"
              size={{ initial: "3", sm: "4" }}
              style={{ color: "var(--accent-10)" }}
            >
              Résumé
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Section>
  );
}
