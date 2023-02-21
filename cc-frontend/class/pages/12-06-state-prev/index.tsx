import { useState } from "react";

export default function CounterStatePage() {
  const [count, setCount] = useState(0);

  // const handleClickCountUp = () => {
  //   setCount(count + 1);
  // };
  const handleClickCountUp = () => {
    setCount((prev) => prev + 1);
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
