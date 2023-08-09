import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries";
import { IBoardWriteProps, IVariables } from "./BoardWrite.types";

export default function BoardWrite(props: IBoardWriteProps) {
  const router = useRouter();

  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

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
    router.push(`/10-01-typescript-boards/${result.data.createBoard.number}`);
  };

  const onClickUpdate = async () => {
    const variables: IVariables = {
      number: Number(router.query.number),
    };
    if (writer) variables.writer = writer;
    if (title) variables.title = title;
    if (contents) variables.contents = contents;

    const result = await updateBoard({
      variables: variables,
    });

    console.log("Update: ", result);

    alert(result.data.updateBoard.message);
    router.push(`/10-01-typescript-boards/${result.data.updateBoard.number}`);
  };

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
    setMycolor(writer !== "" && title !== "" && contents !== "");
  };
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setMycolor(writer !== "" && title !== "" && contents !== "");
  };
  const onChangeContents = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
    setMycolor(writer !== "" && title !== "" && e.target.value !== "");
  };

  return (
    <BoardWriteUI
      onChangeWriter={onChangeWriter}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      onClickUpdate={onClickUpdate}
      onClickSubmit={onClickSubmit}
      isActiveSubmitColor={mycolor}
      isEdit={props.isEdit}
      data={props.data}
    />
  );
}
