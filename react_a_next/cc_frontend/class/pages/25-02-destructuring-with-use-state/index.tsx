import { useState } from "react";

export default function CounterStatePage() {
  const result = useState(0);

  const handleClickCountUp = () => {
    result[1](20);
  };

  return (
    <>
      <div>{result[0]}</div>
      <button onClick={handleClickCountUp}>카운트 올리기!!</button>
    </>
  );
}
