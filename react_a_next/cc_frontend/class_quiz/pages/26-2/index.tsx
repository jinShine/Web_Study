import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";
import { IQuery, IQueryFetchBoardsArgs } from "../../src/commons/types/generated/types";

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

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export default function Page() {
  const [info, setInfo] = useState({ writer: "", password: "", title: "", contents: "" });

  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(FETCH_BOARDS);

  const [createBoard] = useMutation(CREATE_BOARD);
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInfo({ ...info, [name]: value });
  };

  const onClickCreate = () => {
    try {
      createBoard({
        variables: {
          createBoardInput: {
            writer: info.writer,
            password: info.password,
            title: info.title,
            contents: info.contents,
          },
        },
        update(cache, { data }) {
          cache.modify({
            fields: {
              fetchBoards: (prev) => {
                return [data.createBoard, ...prev];
              },
            },
          });
        },
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onClickDelete = (boardId: string) => () => {
    try {
      deleteBoard({
        variables: { boardId },
        update(cache, { data }) {
          cache.modify({
            fields: {
              fetchBoards: (prev, { readField }) => {
                const deleteId = data.deleteBoard;
                return prev.filter((el) => readField("_id", el) !== deleteId);
              },
            },
          });
        },
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <>
      {data?.fetchBoards.map((el) => (
        <Row key={el._id} style={{}}>
          <Column>{el.title}</Column>
          <Column>{el.contents}</Column>
          <button onClick={onClickDelete(el._id)}>X</button>
        </Row>
      ))}
      <div>
        작성자 : <input type="text" name="writer" onChange={onChangeInput} />
        비밀번호 : <input type="text" name="password" onChange={onChangeInput} />
        제목 : <input type="text" name="title" onChange={onChangeInput} />
        내용 : <input type="text" name="contents" onChange={onChangeInput} />
        <button onClick={onClickCreate}>등록하기</button>
      </div>
    </>
  );
}

const Row = styled.div`
  display: flex;
  padding: 10px;
`;

const Column = styled.div`
  width: 25%;
`;
