import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/globalStyles";
import Layout from "../src/components/commons/layout";

const cache = new InMemoryCache();

export default function App({ Component, pageProps }) {
  const client = new ApolloClient({
    // uri: "http://practice.codebootcamp.co.kr/graphql",
    uri: "http://backendonline.codebootcamp.co.kr/graphql",
    cache: cache,
  });

  return (
    <ApolloProvider client={client}>
      <>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    </ApolloProvider>
  );
}
