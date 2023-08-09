import React, { useState } from "react";

export default function SignupStatePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onClickSignup = () => {
    console.log(email);
    console.log(password);

    // 간단 검증
    if (!email.includes("@")) {
      setEmailError("이메일이 올바르지 않습니다!! @가 없음!!");
    } else {
      alert("회원가입을 축하합니다.");
    }
  };

  return (
    <>
      이메일 : <input type="text" value={email} onChange={onChangeEmail} />
      <div>{emailError}</div>
      비밀번호 : <input type="password" value={password} onChange={onChangePassword} />
      <button onClick={onClickSignup}>회원가입</button>
    </>
  );
}
