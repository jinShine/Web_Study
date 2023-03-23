import { useQuery, gql, useApolloClient } from "@apollo/client";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { MouseEvent, useEffect } from "react";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";

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

export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      images
    }
  }
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 25%;
`;

export default function staticRoutedPage() {
  const router = useRouter();

  const client = useApolloClient();

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const prefetchBoard = (boardId: string) => async () => {
    await client.query({ query: FETCH_BOARD, variables: { boardId } });
  };

  const onClickMove = (boardId: string) => () => {
    void router.push(`/32-08-data-prefetch-moved/${boardId}`);
  };

  return (
    <>
      {data?.fetchBoards.map((el) => {
        return (
          <Row key={el._id}>
            <Column>
              <input type="checkbox" />
            </Column>
            <Column>{el.writer}</Column>
            <Column
              onMouseOver={prefetchBoard(el._id)}
              onClick={onClickMove(el._id)}
            >
              {el.title}
            </Column>
          </Row>
        );
      })}
    </>
  );
}
