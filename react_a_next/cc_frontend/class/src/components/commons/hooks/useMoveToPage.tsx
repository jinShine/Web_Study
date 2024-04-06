import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { visitedPageState } from "../../../commons/store";

export function useMoveToPage() {
  const router = useRouter();
  const [visitedPage, setVisitiedPage] = useRecoilState(visitedPageState);

  const onClickMoveToPage = (path: string) => {
    setVisitiedPage(path);

    void router.push(path);
  };

  return {
    visitedPage,
    onClickMoveToPage,
  };
}
