import { ChangeEvent, useState } from "react";

export default function QuizPage() {
  const { count, countUp, countDown } = useCount(0);

  return (
    <>
      <div>
        <p>지금의 카운트는 {count} 입니다!</p>
        <button onClick={countUp(2)}>Count up!</button>
        <button onClick={countDown(2)}>Count down!</button>
      </div>
    </>
  );
}

const useCount = (intialNumber: number) => {
  const [count, setCount] = useState(intialNumber);

  const countUp = (countValue: number) => (event: ChangeEvent<HTMLButtonElement>) => {
    setCount((prev) => prev + countValue);
  };

  const countDown = (countValue: number) => (event: ChangeEvent<HTMLButtonElement>) => {
    setCount((prev) => prev - countValue);
  };

  return {
    count,
    countUp,
    countDown,
  };
};
