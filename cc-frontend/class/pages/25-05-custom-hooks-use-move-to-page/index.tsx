import { useRouter } from "next/router";
import { useMoveToPage } from "../../src/components/commons/hooks/useMoveToPage";

export default function CustomHooksPage() {
  const router = useRouter();

  const { onClickMoveToPage } = useMoveToPage();

  // const onClickMoveToPage = (path: string) => {
  //   void router.push(path);
  // };

  return (
    <div>
      <button onClick={onClickMoveToPage("/boards")}>게시판으로 이동</button>
      <button onClick={onClickMoveToPage("/market")}>마켓으로 이동</button>
      <button onClick={onClickMoveToPage("/mypage")}>마이페이지로 이동</button>
    </div>
  );
}
