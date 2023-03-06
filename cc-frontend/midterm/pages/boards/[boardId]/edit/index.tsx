import { IQuery, IQueryFetchBoardArgs } from "@/src/commons/types/generated/types";
import { FETCH_BOARD } from "@/src/components/units/board/detail/BoardDetail.queries";
import BoardWrite from "@/src/components/units/board/write/BoardWrite.container";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function BoardEditPage() {
  const router = useRouter();

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(FETCH_BOARD, {
    variables: { boardId: router.query.boardId },
  });

  console.log(data);

  return <BoardWrite isEdit={true} data={data} />;
}
