import { useState } from "react";

export default function CounterStatePage() {
  const [count, setCount] = useState(0);

  const handleClickCountUp = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <div role="count">{count}</div>
      <button onClick={handleClickCountUp}>카운트 올리기!!</button>
    </>
  );
}
