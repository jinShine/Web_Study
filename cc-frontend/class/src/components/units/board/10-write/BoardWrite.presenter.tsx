import { BlueButton, RedInput } from "./BoardWrite.styles";
import { IBoardWriteUIProps } from "./BoardWrite.types";

export default function BoardWriteUI({
  onChangeWriter,
  onChangeTitle,
  onChangeContents,
  onClickUpdate,
  onClickSubmit,
  isActiveSubmitColor,
  isEdit,
  data,
}: IBoardWriteUIProps) {
  return (
    <>
      작성자 :{" "}
      <RedInput type="text" onChange={onChangeWriter} defaultValue={data?.fetchBoard.writer} />
      <br />
      제목 : <RedInput type="text" onChange={onChangeTitle} defaultValue={data?.fetchBoard.title} />
      <br />
      내용 :{" "}
      <RedInput type="text" onChange={onChangeContents} defaultValue={data?.fetchBoard.contents} />
      <br />
      <BlueButton isActive={isActiveSubmitColor} onClick={isEdit ? onClickUpdate : onClickSubmit}>
        {isEdit ? "수정하기" : "등록하기"}
      </BlueButton>
    </>
  );
}
