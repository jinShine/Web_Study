import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  fromPromise,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getAccessToken } from "../../../commons/libraries/getAccessToken";
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
  // 3. 프리렌더링 무시 - useEffect 방법

  useEffect(() => {
    // 1. 기존방식(refreshToken 이전)
    // console.log("지금은 브라우저다!!!!!");
    // const result = localStorage.getItem("accessToken");
    // console.log(result);
    // if (result) setAccessToken(result);

    // 2. 새로운방식(refreshToken 이후) - 새로고침 이후에도 토큰 유지할 수 있도록
    void getAccessToken().then((newAccessToken) => {
      console.log("!!!!!!!!!!!!!!!!!", newAccessToken);
      setAccessToken(newAccessToken);
    });
  }, []);

  /**
   * graphQLErrors : 에러
   * operation : 쿼리
   * forward : 재전송
   */

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1-1. 에러를 캐치
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료 에러인지 체크(UNAUTHENTICATED)
        if (err.extensions.code === "UNAUTHENTICATED") {
          // 2-1. refreshToken으로 accessToken을 재발급 받기
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              console.log("############", newAccessToken as string);
              // 2-2. 재발급 받은 accessToken 저장하기
              setAccessToken(newAccessToken);

              if (typeof newAccessToken !== "string") return;

              // 3-1. 재발급 받은 accessToken으로 방금 실패한 쿼리 재요청하기
              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  Authorization: `Bearer ${newAccessToken}`, // accessToken만 새걸로 바꿔치기
                },
              });
            })
          ).flatMap(() => forward(operation)); // 3-2. 변경된 operation 재요청하기!!!
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://backendonline.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  const client = new ApolloClient({
    // uri: "http://practice.codebootcamp.co.kr/graphql",
    // uri: "http://backendonline.codebootcamp.co.kr/graphql",
    link: ApolloLink.from([errorLink, uploadLink]),
    cache,
    connectToDevTools: true,
  });

  // prettier-ignore
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  )
}
