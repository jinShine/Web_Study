import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/store";

interface IApolloSettingProps {
  children: JSX.Element;
}

const cache = new InMemoryCache();

export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, _] = useRecoilState(accessTokenState);

  const uploadLink = createUploadLink({
    uri: "http://backendonline.codebootcamp.co.kr/graphql",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const client = new ApolloClient({
    // uri: "http://practice.codebootcamp.co.kr/graphql",
    // uri: "http://backendonline.codebootcamp.co.kr/graphql",
    link: ApolloLink.from([uploadLink]),
    cache: cache,
  });

  // prettier-ignore
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  )
}
