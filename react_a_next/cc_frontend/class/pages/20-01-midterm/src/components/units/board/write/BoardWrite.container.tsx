import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
  IMutationUploadFileArgs,
} from "@/src/commons/types/generated/types";
import { checkValidationImage } from "@/src/commons/utils/validationImage";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import BoardWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD, UPDATE_BOARD, UPLOAD_FILE } from "./BoardWrite.queries";
import { IBoardWriteProps, IUpdateBoardInput } from "./BoardWrite.types";

export default function BoardWrite(props: IBoardWriteProps) {
  const router = useRouter();

  const [createBoard] = useMutation<Pick<IMutation, "createBoard">, IMutationCreateBoardArgs>(
    CREATE_BOARD
  );
  const [updateBoard] = useMutation<Pick<IMutation, "updateBoard">, IMutationUpdateBoardArgs>(
    UPDATE_BOARD
  );
  // const [uploadFile] = useMutation<Pick<IMutation, "uploadFile">, IMutationUploadFileArgs>(
  //   UPLOAD_FILE
  // );
  const [uploadFile, { data, loading, error, url }] = useMutation(UPLOAD_FILE, {
    onCompleted(data, clientOptions) {
      console.log("#####, data", data);
    },
  });

  const [inputInfo, setInputInfo] = useState({
    title: "",
    contents: "",
    writer: "",
    password: "",
  });

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setInputInfo({ ...inputInfo, [name]: value });
  };

  const onChangeInputImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = checkValidationImage(event.target.files?.[0]);
    if (!file) return;

    try {
      const result = await uploadFile({ variables: { file } });
      console.log(result);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onClickSubmit = async () => {
    console.log(inputInfo);
    if (!inputInfo.title) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!inputInfo.contents) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (!inputInfo.writer) {
      alert("작성자를 입력해주세요.");
      return;
    }
    if (!inputInfo.password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (inputInfo.title && inputInfo.contents && inputInfo.writer && inputInfo.password) {
      try {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              title: inputInfo.title,
              contents: inputInfo.contents,
              writer: inputInfo.writer,
              password: inputInfo.password,
            },
          },
        });

        console.log(result.data?.createBoard);

        void router.push(`/boards/${result.data?.createBoard._id}`);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    }
  };

  const onClickUpdate = async () => {
    if (!inputInfo.title && !inputInfo.contents) {
      alert("수정한 내용이 없습니다.");
      return;
    }

    if (!inputInfo.password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const updateBoardInput: IUpdateBoardInput = {};
    if (inputInfo.title) updateBoardInput.title = inputInfo.title;
    if (inputInfo.contents) updateBoardInput.contents = inputInfo.contents;

    try {
      const result = await updateBoard({
        variables: {
          boardId: router.query.boardId,
          password: inputInfo.password,
          updateBoardInput,
        },
      });
      void router.push(`/boards/${result.data?.updateBoard._id}`);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onClickCancel = () => {
    void router.push("/boards");
  };

  return (
    <BoardWriteUI
      isEdit={props.isEdit}
      onChangeInput={onChangeInput}
      onClickSubmit={onClickSubmit}
      onClickCancel={onClickCancel}
      onChangeInputImage={onChangeInputImage}
      onClickUpdate={onClickUpdate}
      data={props.data}
    />
  );
}
