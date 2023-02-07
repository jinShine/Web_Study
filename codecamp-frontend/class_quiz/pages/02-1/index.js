/////////////////////////////////////////////////////////////
// 1. let과 document.getElementById()를 사용

/*
export default function QuizPage2_1() {
  const onClickHello = () => {
    document.getElementById("btn-hello").innerText = "반갑습니다.";
  };

  return (
    <>
      <button id="btn-hello" onClick={onClickHello}>
        안녕하세요
      </button>
    </>
  );
}
*/

/////////////////////////////////////////////////////////////
// 2. state를 사용

import { useState } from "react";

export default function QuizPage2_1() {
  const [value, setValue] = useState("안녕하세요");

  const onClickHello = () => {
    setValue("반갑습니다.");
  };

  return (
    <>
      <button onClick={onClickHello}>{value}</button>
    </>
  );
}
