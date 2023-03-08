import type { AppProps } from "next/app";
import { ThemeProvider, Global } from "@emotion/react";
import Layout from "../src/components/commons/layout";
import { globalStyles } from "../src/commons/styles/globalStyles";
import { theme } from "../src/commons/styles/globalTheme";
import ApolloSetting from "../src/components/commons/apollo";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloSetting>
      <>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </>
    </ApolloSetting>
  );
}
