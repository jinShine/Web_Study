/*
  인증번호 6자리 "000000"과 "인증번호전송"이라는 버튼을 만들고, 버튼 클릭시 인증번호를 만들어서
  인증번호 6자리가 변경되도록 적용해 주세요.
  1-1) let과 document.getElementById()를 사용해 주세요.
  1-2) state를 사용해 주세요.
*/

/////////////////////////////////////////////////////////////
// 1. let과 document.getElementById()를 사용

/*
export default function QuizPage2_3() {
  const onClickCertiNumber = (certiNum) => {
    document.getElementById("count").innerText = certiNum;
  };

  return (
    <>
      <div id="count">000000</div>
      <button onClick={() => onClickCertiNumber("225577")}>인증번호전송</button>
    </>
  );
}
*/

/////////////////////////////////////////////////////////////
// 2. state를 사용

import { useState } from "react";

export default function QuizPage2_3() {
  const [certiNumber, setCertiNumber] = useState(0);

  const onClickCertiNumber = (certiNum) => {
    setCertiNumber(certiNum);
  };

  return (
    <>
      <div>{certiNumber}</div>
      <button onClick={() => onClickCertiNumber("225588")}>인증번호전송</button>
    </>
  );
}
