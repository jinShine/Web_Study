import { Global } from "@emotion/react";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { globalStyles } from "../src/commons/styles/globalStyles";
import ApolloSetting from "../src/components/commons/apollo";
import Layout from "../src/components/commons/layout";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default function App({ Component, pageProps }: AppProps) {
  return (
    // 모든 페이지에서 다운을 받아야 함으로 비효율적
    //   <Head>
    //   <script
    //     type="text/javascript"
    //     src="//dapi.kakao.com/v2/maps/sdk.js?appkey=0fa8f702fd7e13ee596673be29777b83"
    //   ></script>
    // </Head>
    <RecoilRoot>
      <ApolloSetting>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloSetting>
    </RecoilRoot>
  );
}
