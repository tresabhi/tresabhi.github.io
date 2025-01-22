import { Flex } from "@radix-ui/themes";
import { BaseTheme } from "../components/BaseTheme";
import { SectionEducation } from "../components/SectionEducation";
import { SectionIntro } from "../components/SectionIntro";
import { SectionJourney } from "../components/SectionJourney";
import { SectionProjects } from "../components/SectionProjects";

export function Page() {
  return (
    <BaseTheme>
      <Flex
        justify="center"
        minHeight="100vh"
        style={{ background: "var(--gray-1)" }}
        py="9"
      >
        <Flex
          direction="column"
          flexGrow="1"
          maxWidth="80rem"
          style={{
            background: "var(--gray-3)",
            borderRadius: "var(--radius-1)",
            overflow: "hidden",
          }}
        >
          <SectionIntro />
          <SectionJourney />
          <SectionEducation />
          <SectionProjects />
        </Flex>
      </Flex>
    </BaseTheme>
  );
}
