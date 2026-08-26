import { Text } from "@radix-ui/themes";
import { BM } from "./BM";
import { Project } from "./Project";

export function SectionNerdyBirds() {
  return (
    <Project
      title="Nerdy Birds"
      skills={["Team Lead", "Computer Vision", "Inertial Navigation", "Java"]}
      image="/images/nerdy-birds-640w.png"
      imageWidth="20rem"
      shadowIntensity={5}
      sticky
      time="Aug 2019 - May 2023"
    >
      <Text>
        I served as the <BM>team lead</BM> during the 2022-2023 season, taking
        on additional responsibilities in programming while actively
        contributing to the design and manufacturing of our robot. Designed for
        the FTC Robotics Competition, the B-4/B-5 represented our flagship
        innovation—a culmination of advanced technologies I developed. This
        effort led us to secure first place at districts and rank among the top
        third of teams at the state level, marking the best performance in our
        team's 10-year history.
      </Text>
      <Text>
        The most impressive feature of our robot was the novel autonomous mode I
        designed, which surpassed anything we had seen in FTC to date. Operating
        within the competition's tight 30-second autonomous period, the system
        used cutting-edge sensors and software to execute tasks precisely. The
        robot utilized computer vision to identify obstacles, dynamically
        adapting its behavior based on gameplay elements.
      </Text>
      <Text>
        At the core of this innovation was a{" "}
        <BM>guided A* pathfinding system</BM>. It integrated manual route inputs
        with real-time decisions to guide the robot to scoring elements
        efficiently, ensuring precise alignment and placement on goals.
        Additionally, I incorporated color and brightness sensors to recognize
        floor patterns and infer positional hints. At the same time, the onboard
        IMU tracked accelerations and forces to maintain an accurate
        understanding of the robot's orientation and position. Periodic
        ground-based position checks further refined its spatial awareness.
      </Text>
      <Text>
        This integration of autonomous functionality and driver-friendly
        controls transformed our robot into a high-performing machine with
        innovative features. These advancements were instrumental in achieving
        our historic success during the competition.
      </Text>
    </Project>
  );
}
