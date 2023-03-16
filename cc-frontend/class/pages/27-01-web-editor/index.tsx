import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Modal } from "antd";
const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function WebEditorPage() {
  const [value, setValue] = useState("");

  const onChangeContents = (value: string) => {
    console.log(value);
  };

  const onClickSubmit = () => {
    // const Modal = dynamic(
    //   async () => await import("antd").then((mod) => mod.Modal),
    //   {
    //     ssr: false,
    //   }
    // );
    // Modal.success({ content: "등록에 성공하였습니다." });
  };

  return (
    <div>
      작성자 : <input type="text" />
      <br />
      비밀번호 : <input type="password" />
      <br />
      제목 : <input type="text" />
      <br />
      내용 : <ReactQuill onChange={onChangeContents} />
      <br />
      <button onClick={onClickSubmit}>등록하기</button>
    </div>
  );
  // return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}
