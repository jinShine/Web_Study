import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export const Info = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  /* Clean up
  
    1. 컴포넌트가 언마운트 되기전 호출 (사라지기 직전)
    2. 업데이트되기 직전 호출
  */
  useEffect(() => {
    console.log("렌더링이 완료되었습니다.");
    console.log(name);

    return () => {
      console.log("Clean up1");
    };
  }, [name]);

  /* 오직 언마운트 될때만 Clean up 함수를 호출하고 싶다면 의존성배열에 빈 배열을 넣어주면 된다. */
  useEffect(() => {
    console.log("Effect");

    return () => {
      console.log("Clean up2");
    };
  }, []);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <p>useEffect</p>
      <input value={name} onChange={onChangeName}></input>
      <input value={nickname} onChange={onChangeNickname}></input>
    </div>
  );
};
