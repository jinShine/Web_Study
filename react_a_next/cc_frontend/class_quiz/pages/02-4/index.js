/*
회원가입 화면을 다음의 조건에 맞게 만들어 주세요.
(이메일과 비밀번호 입력창, 비밀번호확인 입력창, 가입하기 버튼 총 4개를 각각 만들어 주세요.)
 각각의 입력값을 state 변수(state 이름은 스스로 결정해 주세요)에 저장해 주세요.
4-1) state를 사용해 주세요.
4-2) 가입하기 버튼을 누르면 조건문을 활용하여 에러를 검증해 주세요.
          ⇒ 조건1) 이메일에 @가 없으면 에러입니다.
          ⇒ 조건2) 비밀번호와 비밀번호확인이 다르면 에러입니다.
          ⇒ 조건3) 에러가 없는 입력에 해당하는 state는 에러를 제거(빈값으로 변경) 합니다.
4-3) 발생한 에러를 빨간색으로 입력창 하단에 표기해 주세요.
*/

import { useState } from "react";
import styled from "@emotion/styled";

export default function QuizPage2_4() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onClickSignup = () => {
    if (!email.includes("@")) {
      setEmailError("이메일이 올바르지 않습니다!");
      return;
    } else {
      setEmailError("");
    }

    if (password !== passwordConfirm) {
      setPasswordError("비밀번호를 확인해주세요.");
      return;
    } else {
      setPasswordError("");
    }

    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setEmailError("");
    setPasswordError("");
  };

  const onChangeInput = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "password-confirm":
        setPasswordConfirm(e.target.value);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <input type="text" value={email} name="email" placeholder="이메일" onChange={onChangeInput} />
      <ErrorText>{emailError}</ErrorText>
      <input
        type="password"
        value={password}
        name="password"
        placeholder="비밀번호"
        onChange={onChangeInput}
      />
      <ErrorText>{passwordError}</ErrorText>
      <input
        type="password"
        value={passwordConfirm}
        name="password-confirm"
        placeholder="비밀번호 확인"
        onChange={onChangeInput}
      />
      <button onClick={onClickSignup}>가입하기</button>
    </>
  );
}

const ErrorText = styled.p`
  font-size: 12px;
  color: red;
`;
