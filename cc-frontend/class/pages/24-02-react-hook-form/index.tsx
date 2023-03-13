import { useForm } from "react-hook-form";

interface IFormData {
  writer: string;
  title: string;
  contents: string;
}

export default function ReactHookFormPage() {
  const { register, handleSubmit } = useForm<IFormData>();

  const onClickSubmit = (data: IFormData) => {
    console.log(data);
    console.log(data.writer);
    console.log(data.title);
    console.log(data.contents);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onClickSubmit)}>
        작성자 : <input type="text" {...register("writer")} />
        제목 : <input type="text" {...register("title")} />
        내용 : <input type="text" {...register("contents")} />
        <button>등록하기</button>
      </form>

      {/* 
      ##### 디폴트값이 submit

      <button type="button">등록하기</button>
        <button type="submit">보내기</button>
        <button type="reset">지우기</button> */}
    </>
  );
}
