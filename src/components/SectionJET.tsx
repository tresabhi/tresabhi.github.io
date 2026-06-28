import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { BM } from "./BM";
import { Project } from "./Project";
import { Section } from "./Section";
import { Skills } from "./Skills";

export function SectionJET() {
  return (
    <Project
      title="J.E.T."
      image="/images/jet-engine-960h.png"
      imageSmall="/images/jet-engine-horizontal-640w.png"
      skills={[
        "Advanced Thermodynamics",
        "SolidWorks",
        "Computer Fluid Dynamics",
        "Python",
      ]}
      shadowX="0"
      shadowY="var(--space-2)"
      shadowIntensity={4}
      sticky
      imageWidth="8rem"
      time="Aug 2024 - May 2025"
      reverse
    >
      <Text>
        I <BM>designed</BM> and <BM>manufactured</BM> the heart of our jet
        engine: the combustion chamber. Crafted from rolled stainless steel
        sheet metal, its dimensions and geometry balance thermal limits,
        performance requirements, and efficiency.
      </Text>

      <Text>
        As a member of J.E.T. ("Jet Engine Team", a humorously unexacting name I
        proudly coined), I frequently go beyond my current coursework. I{" "}
        <BM>independently research</BM>, implement new ideas, run simulations,
        and effectively communicate changes with my team to refine our designs.
      </Text>

      <Text>
        The liner is a simple rolled aluminum cylinder with a 6-inch diameter.
        The combustor, on the other hand, is more intricate. It begins as a
        truncated stainless steel cone, with its mouth carefully sized to direct
        approximately 83% of the incoming air into the liner, leaving the rest
        for the combustor. At the base of the cone, fuel injectors initiate the
        flame, which is sustained in the next segment of the combustor.
      </Text>

      <Text>
        The combustor transitions from the truncated cone into a cylindrical
        shape featuring a series of carefully positioned holes. These holes are
        categorized into three groups, following the direction of airflow:
      </Text>

      <Text>
        <ol>
          <li>
            <BM>Primary Holes</BM>: Sixteen holes consume about 20% of the
            airflow, sustaining the flame.
          </li>

          <li>
            <BM>Intermediate Holes</BM>: Twelve holes use 30% of the airflow to
            combust any remaining fuel and slightly cool the products.
          </li>

          <li>
            <BM>Dilution Holes</BM>: Eight holes consume the remaining airflow,
            cooling the products further to protect downstream aluminum
            components.
          </li>
        </ol>
      </Text>

      <Text>
        The geometry is dynamic, with dimensions adjusted daily based on ongoing
        calculations and simulations. We've developed a <BM>Python</BM> script
        using the Pint library to streamline this process to ensure unit
        consistency. Numerous variables are optimized to achieve our goal of
        producing 25 pounds of thrust.
      </Text>
    </Project>
  );

  return (
    <Section align="center">
      <Flex maxWidth="60rem" justify="center" gap="8rem">
        <Box
          flexGrow="1"
          flexShrink="0"
          flexBasis="0"
          style={{
            backgroundImage: "url()",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "drop-shadow(0 var(--space-1) 0.25rem var(--black-a6))",
          }}
        />

        <Flex
          flexGrow="6"
          flexShrink="0"
          flexBasis="0"
          direction="column"
          gap="4"
        >
          <Heading weight="medium">OpenUAS</Heading>

          <Skills
            skills={["Git", "FPGA", "Ansys", "SOLIDWORKS", "C++", "Python"]}
          />
        </Flex>
      </Flex>
    </Section>
  );
}
