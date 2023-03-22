// getAccessToken.ts 내용

import { gql, GraphQLClient } from "graphql-request";

const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;

export const getAccessToken = async () => {
  try {
    const graphqlClient = new GraphQLClient(
      "https://backendonline.codebootcamp.co.kr/graphql",
      {
        credentials: "include",
      }
    );

    const result = await graphqlClient.request(RESTORE_ACCESS_TOKEN);
    console.log("???????", result);
    const newAccessToken = result.restoreAccessToken.accessToken;

    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) {
      console.log("getAccessToken Error", error.message);
    }
  }
};
