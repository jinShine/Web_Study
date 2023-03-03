import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"; // module 요즘

interface IApolloSettingProps {
  children: JSX.Element;
}
export default function ApolloSetting(props: IApolloSettingProps) {
  const client = new ApolloClient({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(),
  });

  // prettier-ignore
  return (
      <ApolloProvider client={client}>
          {props.children}
      </ApolloProvider>
    )
}
