import { useMutation } from "@apollo/client";
import { useState } from "react";
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD } from "./BoardWrite.queries";

export default function BoardWrite() {
  const [createBoard] = useMutation(CREATE_BOARD);

  const [mycolor, setMycolor] = useState(false);

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

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
    setMycolor(writer && title && contents);
    console.log("###", mycolor);
  };
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    setMycolor(writer && title && contents);
    console.log("###", mycolor);
  };
  const onChangeContents = (e) => {
    setContents(e.target.value);
    setMycolor(writer && title && e.target.value);

    console.log("###", mycolor);
  };

  return (
    <BoardWriteUI
      onChangeWriter={onChangeWriter}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      onClickSubmit={onClickSubmit}
      isActiveSubmitColor={mycolor}
    />
  );
}
