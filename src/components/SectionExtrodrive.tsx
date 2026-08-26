import { Text } from "@radix-ui/themes";
import { Project } from "./Project";

export function SectionExtrodrive() {
  return (
    <Project
      title="Extrodrive"
      skills={["OnShape", "3D Printing"]}
      image="/images/extrodrive-640w.png"
      imageWidth="20rem"
      time="Apr 2026 - May 2026"
      reverse
    >
      <Text wrap="pretty">
        I designed and manufactured an NVMe to USB Type C adapter and housing
        for an M.2 type 2280 form factor SSD.
      </Text>
    </Project>
  );
}
