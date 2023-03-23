import { useCallback, useMemo, useState } from "react";
import Child from "./child";

export default function MemoizationParentPage() {
  console.log("부모가 렌더링 됩니다.");

  let countLet = useMemo(() => 0, []);
  const [countState, setCountState] = useState(0);

  const onClickCountLet = useCallback(() => {
    console.log("onClickCountLet : ", countLet);
    countLet += 1;
  }, []);

  const onClickCountState = useMemo(
    () => () => {
      setCountState((prev) => prev + 1);
    },
    []
  );

  return (
    <>
      <div>카운트(let) : {countLet}</div>
      <button onClick={onClickCountLet}>카운트 올리기 (let)</button>

      <div>카운트(state) : {countState}</div>
      <button onClick={onClickCountState}>카운트 올리기 (state)</button>

      <Child />
    </>
  );
}
