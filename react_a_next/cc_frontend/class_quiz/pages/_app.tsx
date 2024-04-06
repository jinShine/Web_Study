import { Global } from "@emotion/react";
import { RecoilRoot } from "recoil";
import { globalStyles } from "../src/commons/globalStyles";
import ApolloSetting from "../src/components/commons/apollo";

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ApolloSetting>
        <>
          <Global styles={globalStyles} />
          {/* <Layout> */}
          <Component {...pageProps} />
          {/* </Layout> */}
        </>
      </ApolloSetting>
    </RecoilRoot>
  );
}
