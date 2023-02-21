import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { IQuery, IQueryFetchBoardArgs } from "../../../../commons/types/generated/types";
import BoardDetailUI from "./BoardDetail.presenter";
import { FETCH_BOARD } from "./BoardDetail.queries";

export default function BoardDetail() {
  // Router
  const router = useRouter();

  // if (typeof router.query.boardId !== "string") {
  //   alert("올바르지 않은 게시글 아이디입니다.");
  //   void router.push("/");
  //   console.log("########111111", router.query.boardId);
  //   return <></>;
  // }

  // GQL
  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(FETCH_BOARD, {
    // variables: { boardId: router.query.boardId },
    variables: { boardId: String(router.query.boardId) },
  });

  // Handler
  const onClickMoveToBoardList = () => {};

  const onClickMoveToBoardEdit = () => {
    void router.push(`/boards/${router.query.boardId}/edit`);
  };

  return (
    <BoardDetailUI
      data={data}
      onClickMoveToBoardList={onClickMoveToBoardList}
      onClickMoveToBoardEdit={onClickMoveToBoardEdit}
    />
  );
}
