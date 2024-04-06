import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUploadFileArgs,
} from "../../../src/commons/types/generated/types";

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

export default function Page() {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File>();

  const [uploadFile] = useMutation<Pick<IMutation, "uploadFile">, IMutationUploadFileArgs>(
    UPLOAD_FILE
  );
  const [createBoard] = useMutation<Pick<IMutation, "createBoard">, IMutationCreateBoardArgs>(
    CREATE_BOARD
  );

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      const url = event.target.result as string;
      setImageUrl(url);
      setFile(file);
    };
  };
  const onClickSubmit = async () => {
    try {
      const resultFile = await uploadFile({ variables: { file } });
      const url = resultFile.data.uploadFile.url;

      if (url) {
        await createBoard({
          variables: {
            createBoardInput: {
              writer: "12312",
              password: "123",
              title: "!232",
              contents: "!@#!@#",
              images: [url],
            },
          },
        });
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  return (
    <>
      <input type="file" onChange={onChangeFile} />
      <img src={imageUrl} alt="이미지" style={{ height: "500px", width: "500px" }} />
      <button onClick={onClickSubmit}>저장하기</button>
    </>
  );
}
