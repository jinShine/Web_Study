import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessTokenState } from "../../src/commons/store";
import { IQuery } from "../../src/commons/types/generated/types";

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      createdAt
    }
  }
`;
export default function LoginSuccessPage() {
  const accessToken = useRecoilValue(accessTokenState);

  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  // console.log("#####", data?.fetchUserLoggedIn);
  console.log("#####", accessToken);

  return <>{data?.fetchUserLoggedIn.name}</>;
}
