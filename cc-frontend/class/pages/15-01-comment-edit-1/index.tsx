import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
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
  height: 30px;
`;

const Column = styled.div`
  width: 25%;
`;

export default function staticRoutedPage() {
  const [myIndex, setMyIndex] = useState(5);

  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  const onClickEdit = (event: MouseEvent<HTMLButtonElement>) => {
    setMyIndex(Number(event.currentTarget.id));
  };

  return (
    <>
      {data?.fetchBoards.map((el, index) => {
        return (
          <div key={el._id}>
            {index !== myIndex && (
              <Row>
                <Column>
                  <input type="checkbox" />
                </Column>
                <Column>{el.writer}</Column>
                <Column>{el.title}</Column>
                <button id={String(index)} onClick={onClickEdit}>
                  수정하기
                </button>
              </Row>
            )}
            {index === myIndex && (
              <div>
                {" "}
                수정할 내용: <input type="text" />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
