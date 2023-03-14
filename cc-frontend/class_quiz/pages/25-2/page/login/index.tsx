import { gql, useQuery } from "@apollo/client";
import { IQuery } from "../../../../src/commons/types/generated/types";
import { useAuth } from "../../components/hooks/useAuth";

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
  useAuth();

  const { data } = useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  return <>{`${data?.fetchUserLoggedIn.name} 환영합니다.`}</>;
}
