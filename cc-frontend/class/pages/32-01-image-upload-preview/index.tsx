import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
  IMutationUploadFileArgs,
} from "../../src/commons/types/generated/types";

// const UPLOAD_FILE = gql`
//   mutation uploadFile($file: Upload!) {
//     uploadFile(file: $file) {
//       _id
//       url
//       size
//     }
//   }
// `;

export default function ImageUploadPage() {
  const [imageUrl, setImageUrl] = useState("");

  // const [uploadFile] = useMutation<
  //   Pick<IMutation, "uploadFile">,
  //   IMutationUploadFileArgs
  // >(UPLOAD_FILE);

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // multiple 속성으로 드래그 가능

    // try {
    //   const result = await uploadFile({ variables: { file } });
    //   console.log(result);
    //   setImageUrl(result.data?.uploadFile.url ?? "");
    //   // "http://backendonline.codebootcamp.co.kr/graphql"
    // } catch (error) {
    //   if (error instanceof Error) Modal.error({ content: error.message });
    // }

    // 1. 임시 URL 생성 - 가짜 URL(내 브라우저에서만 접근이 가능)
    const result = URL.createObjectURL(file);
    console.log("가짜 URL :", result);
    setImageUrl(result);

    // 2. 임시 URL 생성 - 진짜 URL
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      const url = event.target?.result as string;
      console.log(url);
      setImageUrl(url);
    };
  };

  return (
    <>
      <input type="file" onChange={onChangeFile} />
      {/* <img src={`https://storage.googleapis.com/${imageUrl}`}></img> */}
      <img src={imageUrl}></img>
      <button>업로드</button>
    </>
  );
}
