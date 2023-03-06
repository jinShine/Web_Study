import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/globalStyles";
import ApolloSetting from "../src/components/commons/apollo";

export default function App({ Component, pageProps }) {
  return (
    <ApolloSetting>
      <>
        <Global styles={globalStyles} />
        {/* <Layout> */}
        <Component {...pageProps} />
        {/* </Layout> */}
      </>
    </ApolloSetting>
  );
}
