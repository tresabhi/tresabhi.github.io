import { Text } from "@radix-ui/themes";
import { BM } from "./BM";
import { Project } from "./Project";

export function SectionBlitzKit() {
  return (
    <Project
      title="BlitzKit"
      skills={["Large Public Project", "GitHub", "TypeScript", "C#", "WebGL"]}
      image="/images/blitzkit-tank-640w.png"
      imageWidth="20rem"
      time="Apr 2022 - Present"
      reverse
    >
      <Text>
        BlitzKit is a passion project of mine that documents the armor profiles,
        ammunition, and statistics of around 700 tanks spanning from World War I
        to the Cold War. Originally a hobby, I never expected it to involve
        aerospace engineering concepts—let alone reach half a million monthly
        views.
      </Text>
      <Text>
        The flagship feature of BlitzKit is its <BM>dynamic armor profile</BM>,
        a <BM>real-time</BM> rendering system that simulates how shells interact
        with armor from any given angle and position. This GLSL-based OpenGL
        renderer models shell penetration behavior in real-time, an incredibly
        complex problem requiring research into <BM>fluid dynamics</BM> and
        shell <BM>impact heuristics</BM>.
      </Text>
    </Project>
  );
}
