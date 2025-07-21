import { Box } from "@radix-ui/themes";

export function ConsistentSeparator() {
  return (
    <Box
      height="0.5px"
      width="100%"
      style={{
        backgroundColor: "var(--gray-6)",
      }}
    />
  );
}
