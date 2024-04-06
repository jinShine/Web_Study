import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    # 변수의 타입 적는 곳
    createBoard(createBoardInput: $createBoardInput) {
      # 실제 우기가 전달할 변수 적는 곳
      _id
      writer
    }
  }
`;

export default function GraphqlMutationPage() {
  const router = useRouter();
  const [createBoard] = useMutation(CREATE_BOARD);

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer,
          title,
          contents,
          password: "1234",
        },
      },
    });
    console.log(result);

    void router.push(`/boards/${result.data.createBoard._id}`);
  };

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  return (
    <>
      작성자 :{" "}
      <input type="text" role="input-writer" onChange={onChangeWriter} />
      <br />
      제목 : <input type="text" role="input-title" onChange={onChangeTitle} />
      <br />
      내용 :{" "}
      <input type="text" role="input-contents" onChange={onChangeContents} />
      <br />
      <button role="submit-button" onClick={onClickSubmit}>
        GraphQL API 요청하기 (동기)
      </button>
    </>
  );
}
