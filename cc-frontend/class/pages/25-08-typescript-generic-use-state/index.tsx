export function useMyState<T>(aaa: T): [T, () => void] {
  const myState = aaa; // aaa를 사용해서 state의 초기값 설정

  const mySetState = (bbb) => {
    // 1. bbb로 myState 변경하기
    console.log(`${myState}에서 ${bbb}로 state를 변경하겠습니다!!`);
    // 2. 해당 컴포넌트를 리렌더링 시키기!!!(render 함수)
    console.log(`변경된 ${bbb}를 사용해서 컴포넌트를 리렌더링 하겠습니다!!`);
  };

  return [myState, mySetState];
}

const [count, setCount] = useMyState<number>(0);
