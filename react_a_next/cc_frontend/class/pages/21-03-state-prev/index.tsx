import { useState } from "react";

export default function StatePrevPage() {
  const [count, setCount] = useState(0);

  const handleClickCountUp = () => {
    // 1. 화살표 함수
    setCount((prev) => prev + 1);

    // 2. 함수선언식
    setCount(function (prev) {
      return prev + 1;
    });

    // 3. 함수안에 로직 넣기
    setCount((prev) => {
      // 로직 추가 가능
      // if, for 등등

      return prev + 1;
    });

    // 4. 매개변수 바꿔보기
    setCount((value) => value + 1);
  };

  const handleClickCountDown = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <>
      <div>{count}</div>
      <button onClick={handleClickCountUp}>카운트 올리기!!</button>
      <button onClick={handleClickCountDown}>카운트 내리기!!</button>
    </>
  );
}
