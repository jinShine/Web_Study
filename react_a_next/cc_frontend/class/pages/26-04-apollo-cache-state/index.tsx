import { useQuery, useMutation, gql } from "@apollo/client";
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

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
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

  const [deleteBoard] = useMutation(DELETE_BOARD);
  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickDelete =
    (boardId: string) => (event: MouseEvent<HTMLSpanElement>) => {
      deleteBoard({
        variables: { boardId },
        // refetchQueries: [{ query: FETCH_BOARDS }],
        update(cache, { data }) {
          cache.modify({
            fields: {
              fetchBoards: (prev, { readField }) => {
                const deleteId = data.deleteBoard; // 삭제된 ID
                return prev.filter((el) => readField("_id", el) !== deleteId);
              },
            },
          });
        },
      });
    };

  const onClickCreate = () => {
    createBoard({
      variables: {
        createBoardInput: {
          writer: "버즈",
          password: "1234",
          title: "제목이요~",
          contents: "내용입니다.",
        },
      },
      // refetchQueries: [{ query: FETCH_BOARDS }],
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards: (prev) => {
              console.log(cache);
              console.log(data);
              return [data.createBoard, ...prev];
            },
          },
        });
      },
    });
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
            <button onClick={onClickDelete(el._id)}>삭제하기</button>
          </Row>
        );
      })}
      <button onClick={onClickCreate}>등록하기</button>
    </>
  );
}
