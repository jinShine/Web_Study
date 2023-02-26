import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

interface IApolloSettingProps {
  children: JSX.Element;
}

const cache = new InMemoryCache();

export default function ApolloSetting(props: IApolloSettingProps) {
  const client = new ApolloClient({
    // uri: "http://practice.codebootcamp.co.kr/graphql",
    uri: "http://backendonline.codebootcamp.co.kr/graphql",
    cache: cache,
  });

  // prettier-ignore
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  )
}
