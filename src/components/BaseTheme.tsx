import { Theme, type ThemeProps } from "@radix-ui/themes";

export function BaseTheme(props: ThemeProps) {
  return <Theme accentColor="red" radius="full" {...props} />;
}
