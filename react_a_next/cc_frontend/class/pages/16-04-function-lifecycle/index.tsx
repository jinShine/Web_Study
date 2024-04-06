import { Component, ReactNode, useEffect, useState } from "react";

export default function CounterPage() {
  const [count, setCount] = useState(0);

  // componentDidMount() {
  //   console.log("그려지고 나서 실행");
  // }

  // componentDidUpdate(): void {
  //   console.log("변경되고 나서 실행");
  // }

  // componentWillUnmount(): void {
  //   console.log("사라질때 실행");
  //   // ex) 화면 이동, 채팅방 나가기 등등...
  // }

  useEffect(() => {
    console.log("렌더링 후 한번만 실행");
  }, []);

  useEffect(() => {
    console.log("렌더링 후 한번만 실행");
    console.log("count 변경되고 나서 실행");
  }, [count]);

  useEffect(() => {
    return () => {
      console.log("사라질때 실행!");
    };
  }, []);

  // prettier-ignore
  /* ------------- */
  // useEffect의 잘못된 사용 예제
  useEffect(() => {
    // 1. useEffect안에서 setState는 지양!
    // setCount(prev => prev + 1)

    // 2. 바뀐 state와 setState가 중복되지 않게 조심
  }, [count]);

  const onClickCountUp = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <div>{count}</div>
      <button onClick={onClickCountUp}>
        {/* <button onClick={this.onClickCountUp.bind(this)}> */}
        카운트 올리기
      </button>
    </>
  );
}
