import { Theme, type ThemeProps } from "@radix-ui/themes";
import "@wooorm/starry-night/style/dark";

export function BaseTheme(props: ThemeProps) {
  return <Theme appearance="dark" {...props} />;
}
