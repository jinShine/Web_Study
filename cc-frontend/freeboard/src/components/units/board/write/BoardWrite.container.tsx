import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
  IUpdateBoardInput,
} from "../../../../commons/types/generated/types";
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD, UPDATE_BOARD } from "./BoardWrite.queries";
import { IBoardWriteInfo, IBoardWriteProps } from "./BoardWrite.types";

export default function BoardWrite(props: IBoardWriteProps) {
  // Router
  const router = useRouter();

  // GQL
  const [createBoard] = useMutation<Pick<IMutation, "createBoard">, IMutationCreateBoardArgs>(
    CREATE_BOARD
  );
  const [updateBoard] = useMutation<Pick<IMutation, "updateBoard">, IMutationUpdateBoardArgs>(
    UPDATE_BOARD
  );

  // State
  const [isActive, setIsActive] = useState(false);
  const [info, setInfo] = useState<IBoardWriteInfo>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });
  const [errorInfo, setErrorInfo] = useState<IBoardWriteInfo>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  useEffect(() => {
    setInfo({
      writer: props.data?.fetchBoard.writer,
      password: "",
      title: props.data?.fetchBoard.title,
      contents: props.data?.fetchBoard.contents,
    });
  }, [props.data]);

  // Handler
  const onChangeInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInfo({ ...info, [name]: value });

    resetErrorInfo(event);
    checkSubmitButtonState(event);
  };

  const onClickSubmit = async () => {
    const newErrorInfo = { ...errorInfo };
    if (!info.writer) {
      newErrorInfo.writer = "작성자를 입력해주세요.";
    }
    if (!info.password) {
      newErrorInfo.password = "비밀번호를 입력해주세요.";
    }
    if (!info.title) {
      newErrorInfo.title = "제목을 입력해주세요.";
    }
    if (!info.contents) {
      newErrorInfo.contents = "내용을 입력해주세요.";
    }
    setErrorInfo(newErrorInfo);

    if (info.writer && info.password && info.title && info.contents) {
      try {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer: info.writer,
              password: info.password,
              title: info.title,
              contents: info.contents,
            },
          },
        });

        router.push(`/boards/${result.data.createBoard._id}`);
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    }
  };

  const onClickUpdate = async () => {
    if (typeof router.query.boardId !== "string") return;

    if (!info.title || !info.contents) {
      alert("수정한 내용이 없습니다.");
      return;
    }
    if (!info.password) {
      alert("비밀번호를 입력해주세요");
      return;
    }

    const updateBoardInput: IUpdateBoardInput = {};
    if (info.title) updateBoardInput.title = info.title;
    if (info.contents) updateBoardInput.contents = info.contents;

    try {
      const result = await updateBoard({
        variables: {
          boardId: router.query.boardId,
          password: info.password,
          updateBoardInput,
        },
      });
      void router.push(`/boards/${result.data?.updateBoard._id ?? ""}`);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  // Helpers
  const resetErrorInfo = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    const newErrorInfo = { ...errorInfo };

    if (name === "writer") {
      newErrorInfo.writer = "";
    }
    if (name === "password") {
      newErrorInfo.password = "";
    }
    if (name === "title") {
      newErrorInfo.title = "";
    }
    if (name === "contents") {
      newErrorInfo.contents = "";
    }

    setErrorInfo(newErrorInfo);
  };

  const checkSubmitButtonState = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "writer") {
      setIsActive(
        value !== "" && info.password !== "" && info.title !== "" && info.contents !== ""
      );
    }
    if (name === "password") {
      setIsActive(info.writer !== "" && value !== "" && info.title !== "" && info.contents !== "");
    }
    if (name === "title") {
      setIsActive(
        info.writer !== "" && info.password !== "" && value !== "" && info.contents !== ""
      );
    }
    if (name === "contents") {
      setIsActive(info.writer !== "" && info.password !== "" && info.title !== "" && value !== "");
    }
  };

  return (
    <BoardWriteUI
      isActive={isActive}
      isEdit={props.isEdit}
      errorInfo={errorInfo}
      onChangeInfo={onChangeInfo}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      data={props.data}
    />
  );
}
