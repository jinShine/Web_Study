import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;
export default function DynamicRoutingPage() {
  const router = useRouter();
  const [createBoard] = useMutation(CREATE_BOARD);

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const onChangeWriter = (e) => {
    setWriter(e.target.value);
  };
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContents = (e) => {
    setContents(e.target.value);
  };

  const onClickSubmit = async () => {
    try {
      const result = await createBoard({
        variables: {
          writer: writer,
          title: title,
          contents: contents,
        },
      });
      console.log(result);
      console.log("Number!!!!", result.data.createBoard.number);

      router.push(`05-10-dynamic-routed-board-mutation/${result.data.createBoard.number}`);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };
  return (
    <>
      작성자 : <input type="text" onChange={onChangeWriter} />
      <br />
      제목 : <input type="text" onChange={onChangeTitle} />
      <br />
      내용 : <input type="text" onChange={onChangeContents} />
      <br />
      <button onClick={onClickSubmit}>등록하기</button>
    </>
  );
}
