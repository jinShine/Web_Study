import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { MouseEvent, useEffect, useState } from "react";
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
  const [startPage, setStartPage] = useState(1);

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    void refetch({ page: Number(event.currentTarget.id) });
  };

  const onClickPrevPage = () => {
    setStartPage((prev) => prev - 10);
    void refetch({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    setStartPage((prev) => prev + 10);
    void refetch({ page: startPage + 10 });
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

      <span onClick={onClickPrevPage}>이전페이지 </span>
      {new Array(10).fill(0).map((_, index) => {
        return (
          <span
            key={index + startPage}
            id={String(index + startPage)}
            onClick={onClickPage}
          >
            {index + startPage}
          </span>
        );
      })}
      <span onClick={onClickNextPage}> 다음페이지</span>
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