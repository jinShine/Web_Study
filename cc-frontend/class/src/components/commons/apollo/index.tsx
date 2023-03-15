import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/store";

interface IApolloSettingProps {
  children: JSX.Element;
}

const cache = new InMemoryCache();

export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  // 프론트엔드 서버인지 아닌지 구분 방법
  // 3가지

  // 1. 프리렌더링 예제 - process.brower 방법
  // if (process.browser) {
  //   console.log("########## 지금은 브라우저", window);
  // } else {
  //   console.log("########## 지금은 프론트엔드 서버다");
  //   // 여기선 window를 부를수 없다.
  // }

  // 2. 프리렌더링 예제 - typeof window 방법
  // if (typeof window !== "undefined") {
  //   console.log("########## 지금은 브라우저", window);
  // } else {
  //   console.log("########## 지금은 프론트엔드 서버다");
  //   // 여기선 window를 부를수 없다.
  // }

  // 3. 프리렌더링 무시하고 브라우저에서만 실행 - useEffect 방법

  useEffect(() => {
    const result = localStorage.getItem("accessToken");
    console.log("######", result);
    if (result) {
      setAccessToken(result);
    }
  }, []);

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
    connectToDevTools: true,
  });

  // prettier-ignore
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  )
}
