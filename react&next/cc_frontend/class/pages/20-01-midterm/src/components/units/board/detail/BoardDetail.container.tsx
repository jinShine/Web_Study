import {
  IMutation,
  IMutationDeleteBoardArgs,
  IQuery,
  IQueryFetchBoardArgs,
} from "@/src/commons/types/generated/types";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import BoardDetailUI from "./BoardDetail.presenter";
import { DELETE_BOARD, FETCH_BOARD } from "./BoardDetail.queries";

export default function BoardDetail() {
  const router = useRouter();

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(FETCH_BOARD, {
    variables: { boardId: router.query.boardId },
  });
  const [deleteBoard] = useMutation<Pick<IMutation, "deleteBoard">, IMutationDeleteBoardArgs>(
    DELETE_BOARD
  );

  console.log(data);

  const onClickMoveToBoardList = () => {
    void router.push("/boards");
  };

  const onClickMoveToBoardEdit = () => {
    void router.push(`/boards/${router.query.boardId}/edit`);
  };

  const onClickToBoardDelete = async () => {
    try {
      await deleteBoard({
        variables: {
          boardId: router.query.boardId,
        },
      });

      void router.push("/boards");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <BoardDetailUI
      data={data}
      onClickMoveToBoardList={onClickMoveToBoardList}
      onClickMoveToBoardEdit={onClickMoveToBoardEdit}
      onClickBoardDelete={onClickToBoardDelete}
    />
  );
}
