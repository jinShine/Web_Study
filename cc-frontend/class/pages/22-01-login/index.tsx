import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../src/commons/store";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../src/commons/types/generated/types";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const onClickLogin = async () => {
    try {
      // 1. 로그인 해서 accessToken 받아오기
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      });

      const accessToken = result.data?.loginUser.accessToken;
      if (!accessToken) {
        alert("로그인에 실패했습니다. 다시 시도해 주세요.");
        return;
      }
      // 2. accessToken을 globalState에 저장하기
      setAccessToken(accessToken);

      // 3. 로그인 성공 페이지로 이동하기
      void router.push("/22-02-login-success-fetch-user");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return (
    <>
      이메일 : <input type="text" onChange={onChangeEmail} />
      비밀번호 : <input type="password" onChange={onChangePassword} />
      <button onClick={onClickLogin}>로그인하기</button>
    </>
  );
}
