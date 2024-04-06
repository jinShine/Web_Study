import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../store";

const cache = new InMemoryCache();

const withApollo = (Component) => (props) => {
  const [accessToken, _] = useRecoilState(accessTokenState);

  const uploadLink = createUploadLink({
    uri: "http://backendonline.codebootcamp.co.kr/graphql",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: cache,
  });

  return (
    <ApolloProvider client={client}>
      <Component {...props} />;
    </ApolloProvider>
  );
};

export default withApollo;
