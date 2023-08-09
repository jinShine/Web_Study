import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { ChangeEvent, MouseEvent, useState } from "react";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
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
  const [keyword, setKeyowrd] = useState("");

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    void refetch({ page: Number(event.currentTarget.id) });
  };

  const getDebounce = _.debounce((value) => {
    void refetch({ page: 1, search: value });
  }, 500);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyowrd(event.target.value);
    getDebounce(event.target.value);
  };

  return (
    <>
      <input type="text" onChange={onChangeSearch} />
      {data?.fetchBoards.map((el) => {
        return (
          <Row key={el._id}>
            <Column>
              <input type="checkbox" />
            </Column>
            <Column>{el.writer}</Column>
            <Column>
              {el.title
                .replaceAll(keyword, `#$${keyword}#$`)
                .split("#$")
                .map((el) => (
                  <span
                    key={uuidv4}
                    style={{ color: el === keyword ? "orange" : "black" }}
                  >
                    {el}
                  </span>
                ))}
            </Column>
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
    </>
  );
}
