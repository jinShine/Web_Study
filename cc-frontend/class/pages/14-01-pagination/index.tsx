import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
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

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 25%;
`;

export default function staticRoutedPage() {
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    void refetch({ page: Number(event.currentTarget.id) });
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
            <Column>{el.title}</Column>
          </Row>
        );
      })}

      {new Array(10).fill(0).map((_, index) => {
        return (
          <span key={index + 1} id={String(index + 1)} onClick={onClickPage}>
            {index + 1}
          </span>
        );
      })}
      {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => {
        return (
          <span key={el} id={String(el)} onClick={onClickPage}>
            {el}
          </span>
        );
      })} */}

      {/* <span id="1" onClick={onClickPage}>
        {"  1  "}
      </span>
      <span id="2" onClick={onClickPage}>
        {"  2  "}
      </span>
      <span id="3" onClick={onClickPage}>
        {"  3  "}
      </span> */}
    </>
  );
}
