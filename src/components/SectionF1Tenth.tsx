import { Text } from "@radix-ui/themes";
import { BM } from "./BM";
import { Project } from "./Project";

export function SectionF1Tenth() {
  return (
    <Project
      title="F1TENTH Digital Twin AI"
      image="/images/f1tenth-512w.png"
      skills={["Python", "Lidar", "AI"]}
      imageWidth="20rem"
      reverse
      shadowIntensity={5}
      time="Aug 2025 - Dec 2025"
    >
      <Text wrap="pretty">
        I created and trained a pair of <BM>PID</BM> and{" "}
        <BM>AI-based autonomous controllers</BM>
        for the 1/10-scale Formula 1 car. The scale model features a familiar
        open-wheel design with the addition of a Lidar scanner, which serves as
        the only data source for the controller.
      </Text>
      <Text wrap="pretty">
        With the simple objective of completing scaled laps of Nürburgring as
        fast as possible, I trained a <BM>neural network</BM> with a{" "}
        <BM>virtual twin</BM> of the car in F1TENTH Gym's simulated environment.
        With a fairly converged model, I deployed the AI onto a real-world scale
        model to continue training in the real world, now accounting for the
        added complexities of reality.
      </Text>
      <Text wrap="pretty">
        As a backup, I also fine-tuned a PID-based solution to address any
        discrepancies between the simulation and the real world, in case the AI
        failed and needed to fall back on something.
      </Text>
    </Project>
  );
}
