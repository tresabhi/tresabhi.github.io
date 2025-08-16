import { Theme, type ThemeProps } from "@radix-ui/themes";

export function BaseTheme(props: ThemeProps) {
  // explicitly set light theme to set .light class to apply grays
  return (
    <Theme
      accentColor="indigo"
      grayColor="mauve"
      appearance="dark"
      {...props}
    />
  );
}
