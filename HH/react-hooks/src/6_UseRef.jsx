import React from "react";
import { useRef } from "react";

export const UseRefPrac = () => {
  const inputEl = useRef(null);
  const count = useRef(0);

  const handleClick = () => {
    console.log("Click");
    inputEl.current.focus();
    count.current += 1;

    console.log(count);
  };

  return (
    <div>
      <input ref={inputEl} />
      <button onClick={handleClick}>등록</button>
    </div>
  );
};
