import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useRef, useState } from "react";
import { checkValidationFile } from "../../src/commons/libraries/validationFile";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUploadFileArgs,
} from "../../src/commons/types/generated/types";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      _id
      url
      size
    }
  }
`;

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

export default function GraphqlMutationPage() {
  const qqq = useRef<HTMLInputElement>(null);

  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const [imageUrl, setImageUrl] = useState("");

  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: "12312",
          password: "123",
          title: "!232",
          contents: "!@#!@#",
          images: [imageUrl],
        },
      },
    });
    console.log(result);
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // multiple 속성으로 드래그 가능

    if (!checkValidationFile(file)) return;

    // if (!file?.size) {
    //   alert("파일이 없습니다.");
    //   return;
    // }

    // // 1KB = 1024
    // // 1MB = 1024 * 1024
    // // 5MB ( 5 * 1024 * 1024)
    // if (file.size > 5 * 1024 * 1024) {
    //   alert("파일 용량이 너무 큽니다. (제한: 5MB)");
    //   return;
    // }

    // if (!file.type.includes("jpeg") && !file.type.includes("png")) {
    //   alert("jpeg 파일 또는 png 파일만 업로드 가능합니다!!!");
    //   return;
    // }

    try {
      const result = await uploadFile({ variables: { file } });
      console.log(result);
      setImageUrl(result.data?.uploadFile.url ?? "");
      // "http://backendonline.codebootcamp.co.kr/graphql"
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onClickImage = () => {
    qqq.current?.click();
  };

  return (
    <>
      작성자 : <input type="text" />
      <br />
      제목 : <input type="text" />
      <br />
      내용 : <input type="text" />
      <div
        style={{ width: "100px", height: "80px", backgroundColor: "gray" }}
        onClick={onClickImage}
      >
        이미지 선택(가짜버튼)
      </div>
      <input
        type="file"
        onChange={onChangeFile}
        style={{ display: "none" }}
        ref={qqq}
      />
      <img src={`https://storage.googleapis.com/${imageUrl}`}></img>
      <button onClick={onClickSubmit}>업로드</button>
    </>
  );
}
