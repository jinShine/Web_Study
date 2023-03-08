import "@emotion/react";

import { theme } from "./globalTheme";

type ExtendedTheme = typeof theme;

declare module "@emotion/react" {
  interface Theme extends ExtendedTheme {}
}
