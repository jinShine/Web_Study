import qqq, { BlueButton, RedInput } from "./BoardWrite.styles";

import * as ST from "./BoardWrite.styles";

export default function BoardWriteUI({
  onChangeWriter,
  onChangeTitle,
  onChangeContents,
  onClickUpdate,
  onClickSubmit,
  isActiveSubmitColor,
  isEdit,
}) {
  return (
    <>
      작성자 : <RedInput type="text" onChange={onChangeWriter} />
      <br />
      제목 : <RedInput type="text" onChange={onChangeTitle} />
      <br />
      내용 : <RedInput type="text" onChange={onChangeContents} />
      <br />
      <BlueButton isActive={isActiveSubmitColor} onClick={isEdit ? onClickUpdate : onClickSubmit}>
        {isEdit ? "수정하기" : "등록하기"}
      </BlueButton>
    </>
  );
}
