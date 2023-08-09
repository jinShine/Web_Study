import { useRouter } from "next/router";

export default function staticRoutingBoardPage() {
  const router = useRouter();

  const onClickMove1 = () => {
    router.push("/05-04-static-routed-board/1");
  };
  const onClickMove2 = () => {
    router.push("/05-04-static-routed-board/2");
  };
  const onClickMove3 = () => {
    router.push("/05-04-static-routed-board/3");
  };

  return (
    <>
      <button onClick={onClickMove1}>1번 게시글로 이동</button>
      <button onClick={onClickMove2}>2번 게시글로 이동</button>
      <button onClick={onClickMove3}>3번 게시글로 이동</button>
    </>
  );
}
