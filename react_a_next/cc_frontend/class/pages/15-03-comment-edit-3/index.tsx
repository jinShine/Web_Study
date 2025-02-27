import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../src/commons/types/generated/types";
import BoardCommentItem from "../../src/components/units/15-board-comment-item";

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

export default function staticRoutedPage() {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  return (
    <>
      {data?.fetchBoards.map((el, index) => {
        return <BoardCommentItem key={el._id} el={el} />;
      })}
    </>
  );
}
