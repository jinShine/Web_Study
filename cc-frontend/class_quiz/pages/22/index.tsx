import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { IMutation, IMutationLoginUserArgs } from "../../src/commons/types/generated/types";
import { accessTokenState } from "./store";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();

  const [_, setAccessToken] = useRecoilState(accessTokenState);

  const [info, setInfo] = useState({ email: "", password: "" });

  const [loginUser] = useMutation<Pick<IMutation, "loginUser">, IMutationLoginUserArgs>(LOGIN_USER);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInfo({ ...info, [name]: value });
  };

  const onClickLogin = async () => {
    try {
      const result = await loginUser({
        variables: {
          email: info.email,
          password: info.password,
        },
      });
      console.log(result.data.loginUser);

      const accessToken = result.data.loginUser.accessToken;
      if (!accessToken) {
        alert("로그인을 먼저 해주세요.");
        return;
      }

      setAccessToken(accessToken);

      void router.push("/22/login");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <>
      이메일 : <input type="text" name="email" onChange={onChangeInput} />
      비밀번호 : <input type="password" name="password" onChange={onChangeInput} />
      <button onClick={onClickLogin}>로그인하기</button>
    </>
  );
}
