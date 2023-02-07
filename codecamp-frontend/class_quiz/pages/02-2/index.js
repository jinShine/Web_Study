/////////////////////////////////////////////////////////////
// 1. let과 document.getElementById()를 사용

/*
export default function QuizPage2_2() {
  const handleClickCountUp = () => {
    let count = Number(document.querySelector("#count").innerText) + 1;
    document.querySelector("#count").innerText = count;
  };

  return (
    <>
      <div id="count"></div>
      <button onClick={handleClickCountUp}>카운트 올리기</button>
    </>
  );
}
*/

/////////////////////////////////////////////////////////////
// 2. state를 사용

import { useState } from "react";

export default function QuizPage2_2() {
  const [count, setCount] = useState(0);

  const onClickCountUp = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트올리기</button>
    </>
  );
}
