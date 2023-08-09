import { useCallback, useMemo, useState } from "react";
import MemoizationChildPage from "./02-child";
import Word from "./02-child";
import { v4 as uuidv4 } from "uuid";

export default function MemoizationParentPage() {
  const [data, setData] = useState("철수는 오늘 점심을 맛있게 먹었습니다.");

  const onClickChange = () => {
    setData("영희는 오늘 저녁을 맛있게 먹었습니다.");
  };

  return (
    <>
      {data.split(" ").map((el, index) => (
        // 1. <Word key={index} el={el} /> // key 또는 el이 변경된 부분만 리렌더링됨
        <Word key={uuidv4()} el={el} /> // 2. uuid는 매번 바뀌기 때문에 메모이제이션이 동작 하지 않음
      ))}
      <button onClick={onClickChange}>체인지</button>
    </>
  );
}
