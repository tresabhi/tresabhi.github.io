import { ScrollArea } from "@radix-ui/themes";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function LatexBlockWrapper({ children }: Props) {
  return (
    <ScrollArea mb="4" style={{ height: "unset" }} scrollbars="horizontal">
      {children}
    </ScrollArea>
  );
}
