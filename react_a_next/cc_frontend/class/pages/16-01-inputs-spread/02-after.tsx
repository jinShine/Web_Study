import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

// prettier-ignore
const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) { # 변수의 타입 적는 곳
    createBoard(writer: $writer, title: $title, contents: $contents) { # 실제 우기가 전달할 변수 적는 곳
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  const [createBoard] = useMutation(CREATE_BOARD);

  const [inputs, setInputs] = useState({
    writer: "",
    title: "",
    contents: "",
  });

  // const [writer, setWriter] = useState("");
  // const [title, setTitle] = useState("");
  // const [contents, setContents] = useState("");

  const onClickSubmit = async () => {
    const result = await createBoard({
      // variables: {
      //   writer: inputs.writer,
      //   title: inputs.title,
      //   contents: inputs.contents,
      // },
      variables: { ...inputs },
    });
    console.log(result);
  };

  const onChangeInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
    // setWriter(e.target.value);
  };
  return (
    <>
      작성자 : <input id="writer" type="text" onChange={onChangeInputs} />
      <br />
      제목 : <input id="title" type="text" onChange={onChangeInputs} />
      <br />
      내용 : <input id="contents" type="text" onChange={onChangeInputs} />
      <br />
      <button onClick={onClickSubmit}>GraphQL API 요청하기 (동기)</button>
    </>
  );
}
