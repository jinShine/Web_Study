import React from "react";
import Greeting from "./components/Greeting";
import Switch from "./components/Switch";
import { Reset } from "styled-reset";
import { ThemeProvider } from "styled-components";
import defaultTheme from "./styles/defaultTheme";
import GlobalStyle from "./styles/GlobalStyle";
import { useDarkMode } from "usehooks-ts";
import darkTheme from "./styles/darkTheme";

export default function App() {
  const { isDarkMode, toggle } = useDarkMode();

  const theme = isDarkMode ? darkTheme : defaultTheme;

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Reset />
        <GlobalStyle />
        <Greeting />
        <Switch />
      </div>
    </ThemeProvider>
  );
}
