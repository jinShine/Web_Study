import { useCallback, useMemo, useState } from "react";
import MemoizationChildPage from "./02-child";

export default function MemoizationParentPage() {
  console.log("부모가 렌더링 됩니다.");

  let countLet = 0;
  const [countState, setCountState] = useState(0);

  // // 렌더링될때마다 초기화가 된다.
  // const random = Math.random();
  // console.log(random);

  // 1. useMemo 변수 기억
  // 저장되어지기 떄문에 렌더링 되어도 동일한 값이 나온다.
  const random = useMemo(() => Math.random(), []);
  console.log(random);
  // 의존성에 원하는 상태값을 넣고, 상태값이 바뀔때만 렌더링 되게 할 수 있다.
  const random1 = useMemo(() => Math.random(), [countState]);
  console.log(random1);

  // 2. useCallback : 함수 기억
  const onClickCountLet = useCallback(() => {
    console.log(countLet);
    countLet += 1;
  }, []);

  // 2-1. state 사용 주의 (prev를 사용해야 한다.)
  // const onClickCountState = useCallback(() => {
  //   setCountState((prev) => prev + 1);
  // }, []);

  // 3. useMemo로 나만의 useCallback 만들어보기
  const onClickCountState = useMemo(
    () => () => {
      setCountState((prev) => prev + 1);
    },
    []
  );

  return (
    <>
      <div>=====================</div>
      <h1>부모 컴포넌트 입니다.</h1>
      <div>=====================</div>

      <div>카운트(let) : {countLet}</div>
      <button onClick={onClickCountLet}>카운트 올리기 (let)</button>

      <div>카운트(state) : {countState}</div>
      <button onClick={onClickCountState}>카운트 올리기 (state)</button>

      <MemoizationChildPage />
    </>
  );
}
