import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./inputs/input";
import { Button } from "./buttons/button";

export interface IFormData {
  writer: string;
  password: string;
  title: string;
  contents: string;
}

const schema = yup.object({
  writer: yup.string().max(5, "5자 미만으로 작성해주세요.").required("작성자를 입력해주세요."),
  password: yup
    .string()
    .matches(
      /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8}$/,
      "영문, 숫자, 특수문자를 포함한 8자리 이내로 입력해주세요."
    )
    .max(8, "8자리 이내로 입력해주세요.")
    .required("비밀번호를 입력해주세요."),
  title: yup.string().max(100).required("제목을 입력해주세요."),
  contents: yup.string().max(1000).required("내용을 입력해주세요."),
});

export default function Page() {
  const { register, handleSubmit, watch, formState } = useForm<IFormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormData) => {
    console.log("#", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          작성자 : <Input type="text" register={register("writer")} />
          <div>{formState.errors.writer?.message}</div>
        </>
        <>
          비밀번호 : <Input type="password" register={register("password")} />
          <div>{formState.errors.password?.message}</div>
        </>
        <>
          제목 : <Input type="text" register={register("title")} />
          <div>{formState.errors.title?.message}</div>
        </>
        <>
          내용 : <Input type="text" register={register("contents")} />
          <div>{formState.errors.contents?.message}</div>
        </>
        <Button title="등록하기" formState={formState} />
      </form>
    </>
  );
}
