"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { memo, useCallback, useState } from "react";

type FizzProps = {
  isFizz: boolean;
};

const Fizz = (props: FizzProps) => {
  const { isFizz } = props;
  console.log(`Fizz가 다시 그려졌습니다. isFizz=${isFizz}`);

  return <span>{isFizz ? "Fizz" : "?"}</span>;
};

type BuzzProps = {
  isBuzz: boolean;
  onClick: () => void;
};

const Buzz = memo<BuzzProps>((props: BuzzProps) => {
  const { isBuzz, onClick } = props;
  console.log(`Buzz가 다시 그려졌습니다. isBuzz=${isBuzz}`);

  return <span onClick={onClick}>{isBuzz ? "Buzz가" : "?"}</span>;
});

export default function Home() {
  const [count, setCount] = useState(1);
  const isFizz = count % 3 === 0;
  const isBuzz = count % 5 === 0;

  // Parent에서 새로 만들어진 함수가 Buzz에 전달되어 화면 Buzz 컴포넌트가 다시 렌더링 하게 된다.
  const onBuzzClick = useCallback(() => {
    console.log(`Buzz가 클릭됐습니다. isBuzz=${isBuzz}`);
  }, []);

  console.log(`Parent가 다시 그려졌습니다. count=${count}`);

  return (
    <main className={styles.main}>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <p>현재 카운트 `{count}`</p>
      <p>
        <Fizz isFizz={isFizz} />
        <Buzz isBuzz={isBuzz} onClick={onBuzzClick} />
      </p>
    </main>
  );
}
