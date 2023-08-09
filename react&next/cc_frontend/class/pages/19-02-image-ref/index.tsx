import { gql, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { ChangeEvent, useRef, useState } from "react";
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

export default function ImageUploadPage() {
  const qqq = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // multiple 속성으로 드래그 가능

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
      <button>업로드</button>
    </>
  );
}
