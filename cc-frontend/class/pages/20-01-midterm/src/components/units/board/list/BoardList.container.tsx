import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import BoardListUI from "./BoardLIst.presenter";
import { IQuery, IQueryFetchBoardsArgs } from "../../../../commons/types/generated/types";
import { FETCH_BOARDS } from "./BoardList.queries";
import { MouseEvent } from "react";

export default function BoardList() {
  const router = useRouter();

  const { data, fetchMore } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  const onLoadMore = (): void => {
    if (data === undefined) return;

    void fetchMore({
      variables: { page: Math.ceil((data?.fetchBoards.length ?? 10) / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchBoards === undefined)
          return { fetchBoards: [...prev.fetchBoards] };

        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult?.fetchBoards],
        };
      },
    });
  };

  const onClickMoveToBoardDetail = (event: MouseEvent<HTMLDivElement>) => {
    void router.push(`/boards/${event.currentTarget.id}`);
  };

  return (
    <BoardListUI
      pageStart={0}
      onLoadMore={onLoadMore}
      hasMore={true}
      data={data}
      onClickMoveToBoardDetail={onClickMoveToBoardDetail}
    />
  );
}
