import { LikeTwoTone } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { ChangeEvent, useRef, useState } from "react";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUploadFileArgs,
} from "../../src/commons/types/generated/types";
import { checkValidationFile } from "./dist/checkValidationFile";
import { CREATE_BOARD, UPLOAD_FILE } from "./dist/queries";

export default function GraphqlMutationPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [infos, setInfos] = useState({
    title: "",
    writer: "",
    password: "",
    contents: "",
  });
  const [imageUrl, setImageUrl] = useState("");

  const [createBoard] = useMutation<Pick<IMutation, "createBoard">, IMutationCreateBoardArgs>(
    CREATE_BOARD
  );
  const [uploadFile] = useMutation<Pick<IMutation, "uploadFile">, IMutationUploadFileArgs>(
    UPLOAD_FILE
  );

  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: infos.writer,
          password: infos.password,
          title: infos.title,
          contents: infos.contents,
          images: [imageUrl],
        },
      },
    });
    console.log(result);
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!checkValidationFile(file)) return;

    try {
      const result = await uploadFile({ variables: { file } });
      console.log(result);
      setImageUrl(result.data?.uploadFile.url ?? "");
    } catch (error) {
      if (error instanceof Error) alert({ content: error.message });
    }
  };

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInfos({ ...infos, [name]: value });
  };

  const onClickImage = () => {
    inputFileRef.current.click();
  };

  return (
    <>
      작성자 : <input type="text" name="writer" onChange={onChangeInput} />
      작성자 : <input type="password" name="password" onChange={onChangeInput} />
      제목 : <input type="text" name="title" onChange={onChangeInput} />
      내용 : <input type="text" name="contents" onChange={onChangeInput} />
      <div>
        <LikeTwoTone onClick={onClickImage} style={{ fontSize: "50px" }} />
        <input type="file" onChange={onChangeFile} style={{ display: "none" }} ref={inputFileRef} />
        {imageUrl && <img src={`https://storage.googleapis.com/${imageUrl}`}></img>}
      </div>
      <button onClick={onClickSubmit}>저장하기</button>
    </>
  );
}
