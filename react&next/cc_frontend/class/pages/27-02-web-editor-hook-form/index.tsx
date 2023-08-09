import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function WebEditorPage() {
  const { register, handleSubmit, setValue, trigger } = useForm({
    mode: "onChange",
  });

  const onChangeContents = (value: string) => {
    console.log(value);

    // register로 등록하지 않고 강제로 값을 넣어주는 기능
    // 빈값이여도 "<p><br></p>" 이렇게 값이 남아서 빈값을 만들어주는 추가 작업을 해야한다.
    setValue("contents", value === "<p><br></p>" ? "" : value);
    void trigger("contents");
  };

  const onClickSubmit = async () => {
    // const Modal = dynamic(
    //   async () => await import("antd").then((mod) => mod.Modal),
    //   {
    //     ssr: false,
    //   }
    // );

    // 함수 안에서 사용할때는 dynamic x
    // 아래와같이 import 함수로 사용한다.
    const { Modal } = await import("antd");
    Modal.success({ content: "등록에 성공하였습니다." });
  };

  return (
    <div>
      작성자 : <input type="text" {...register("writer")} />
      <br />
      비밀번호 : <input type="password" {...register("password")} />
      <br />
      제목 : <input type="text" {...register("title")} />
      <br />
      {/* 내용 : <ReactQuill onChange={onChangeContents} {...register("contents")/> 

      useForm의 register가 등록이 안될때?????????????????????
      강제로 주입하는 방법을 택해야한다.

      setValue(키, 값)
      */}
      내용 : <ReactQuill onChange={onChangeContents} />
      <br />
      <button onClick={onClickSubmit}>등록하기</button>
    </div>
  );
  // return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}
