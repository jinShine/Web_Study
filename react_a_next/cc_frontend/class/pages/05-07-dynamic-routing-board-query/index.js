import { useRouter } from "next/router";

export default function dynamicRoutingBoardPage() {
  const router = useRouter();

  const onClickMove1 = () => {
    router.push("/05-08-dynamic-routed-board-query/300");
  };
  const onClickMove2 = () => {
    router.push("/05-08-dynamic-routed-board-query/305");
  };
  const onClickMove3 = () => {
    router.push("/05-08-dynamic-routed-board-query/500");
  };
  return (
    <>
      <button onClick={onClickMove1}>1번 게시글로 이동</button>
      <button onClick={onClickMove2}>2번 게시글로 이동</button>
      <button onClick={onClickMove3}>3번 게시글로 이동</button>
    </>
  );
}
