import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { MouseEvent, useEffect } from "react";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import InfiniteScroll from "react-infinite-scroller";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

const Row = styled.div`
  display: flex;
  height: 100px;
`;

const Column = styled.div`
  width: 25%;
`;

export default function staticRoutedPage() {
  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onLoadMore = async () => {
    if (data === undefined) return;

    await fetchMore({
      variables: { page: Math.ceil(data?.fetchBoards.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoards) {
          return { fetchBoards: [...prev.fetchBoards] };
        }
        return {
          fetchBoards: [...prev.fetchBoards, fetchMoreResult.fetchBoards],
        };
      },
    });
  };

  return (
    <>
      <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
        {data?.fetchBoards.map((el) => {
          return (
            <Row key={el._id}>
              <Column>
                <input type="checkbox" />
              </Column>
              <Column>{el.writer}</Column>
              <Column>{el.title}</Column>
            </Row>
          );
        })}
      </InfiniteScroll>
    </>
  );
}
