import { Text } from "@radix-ui/themes";
import { Project } from "./Project";

export function SectionPsyche() {
  return (
    <Project
      title="NASA Psyche Intern"
      image="/images/psyche-640w.png"
      imageWidth="20rem"
      reverse
      time="Sep 2025 - Apr 2026"
    >
      <Text wrap="pretty">
        I use my general technical skills and creative talents to share,
        explain, and highlight the innovation, scientific, and engineering
        content of NASA's Psyche mission to the asteroid of the same name,
        believed to be the metallic core of a planetesimal that never formed. I
        am firmly part of the Psyche team, with the opportunity to interact with
        Psyche scientists and engineers from NASA, ASU, and other partner
        institutions, as well as with other Psyche-inspired interns and staff.
      </Text>
    </Project>
  );
}
