import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
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
      images
    }
  }
`;

export default function ImageUploadPage() {
  // const [imageUrl, setImageUrl] = useState("");
  // const [file, setFile] = useState<File>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);
  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  const onClickSubmit = async () => {
    // 1. Promise.all 안썼을 때

    const resultFile0 = await uploadFile({ variables: { file: files[0] } });
    const resultFile1 = await uploadFile({ variables: { file: files[1] } });
    const resultFile2 = await uploadFile({ variables: { file: files[2] } });
    const url0 = resultFile0.data?.uploadFile.url;
    const url1 = resultFile1.data?.uploadFile.url;
    const url2 = resultFile2.data?.uploadFile.url;

    // 2. Promise.all 썼을 때

    // const results = await Promise.all([
    //   uploadFile({ variables: { file: files[0] } }),
    //   uploadFile({ variables: { file: files[1] } }),
    //   uploadFile({ variables: { file: files[2] } }),
    // ]);

    const results = await Promise.all(
      files.map((file) => uploadFile({ variables: { file } }))
    );
    const resultUrls = results.map((el) => (el ? el.data?.uploadFile.url : ""));

    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: "12312",
          password: "123",
          title: "!232",
          contents: "!@#!@#",
          images: resultUrls,
        },
      },
    });
    console.log(result);
  };

  const onChangeFile =
    (index: number) => async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] as File; // multiple 속성으로 드래그 가능

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        const tempFile: File[] = [...files];
        tempFile[index] = file;
        setFiles(tempFile);

        const url = event.target?.result as string;
        const tempUrls = [...imageUrls];
        tempUrls[index] = url;
        setImageUrls(tempUrls);
      };
    };

  return (
    <>
      <input type="file" onChange={onChangeFile(0)} />
      <input type="file" onChange={onChangeFile(1)} />
      <input type="file" onChange={onChangeFile(2)} />
      {/* <img src={`https://storage.googleapis.com/${imageUrl}`}></img> */}
      <img src={imageUrls[0]}></img>
      <img src={imageUrls[1]}></img>
      <img src={imageUrls[2]}></img>
      <button onClick={onClickSubmit}>업로드</button>
    </>
  );
}
