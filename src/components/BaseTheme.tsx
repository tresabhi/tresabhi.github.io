import { Box, Theme, type BoxProps, type ThemeProps } from "@radix-ui/themes";

export function BaseTheme({
  style,
  appearance,
  ...props
}: BoxProps & { appearance?: ThemeProps["appearance"] }) {
  return (
    <Theme
      accentColor="red"
      grayColor="mauve"
      radius="full"
      style={{ display: "contents" }}
      appearance={appearance}
    >
      <Box style={{ background: "var(--gray-3)", ...style }} {...props} />
    </Theme>
  );
}
