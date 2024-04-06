import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    # 변수의 타입 적는 곳
    createBoard(writer: $writer, title: $title, contents: $contents) {
      # 실제 우기가 전달할 변수 적는 곳
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
      
      // useMutation 타입
      // useMutation<Result타입, Variables타입>
      const [createBoard] = useMutation<Pick<IMutation, "createBoard">, Pick<IMutation, IMutationCreateBoardArgs>>(CREATE_BOARD);

      const [writer, setWriter] = useState<string>("");
      const [title, setTitle] = useState<string>("");
      const [contents, setContents] = useState<string>("");

      const onClickSubmit = async () => {
        const result = await createBoard({
          variables: {
            writer: writer,
            title: title,
            contents: contents,
          },
    });
    console.log(result);
  };

  const onChangeWriter = (e) => {
    setWriter(e.target.value);
  };
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContents = (e) => {
    setContents(e.target.value);
  };

  return (
    <>
      작성자 : <input type="text" onChange={onChangeWriter} />
      <br />
      제목 : <input type="text" onChange={onChangeTitle} />
      <br />
      내용 : <input type="text" onChange={onChangeContents} />
      <br />
      <button onClick={onClickSubmit}>GraphQL API 요청하기 (동기)</button>
    </>
  );
}
