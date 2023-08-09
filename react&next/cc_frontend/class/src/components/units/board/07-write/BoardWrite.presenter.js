import qqq, { BlueButton, RedInput } from "./BoardWrite.styles";

import * as ST from "./BoardWrite.styles";

export default function BoardWriteUI({
  onChangeWriter,
  onChangeTitle,
  onChangeContents,
  onClickSubmit,
  isActiveSubmitColor,
}) {
  return (
    <>
      작성자 : <RedInput type="text" onChange={onChangeWriter} />
      <br />
      제목 : <RedInput type="text" onChange={onChangeTitle} />
      <br />
      내용 : <RedInput type="text" onChange={onChangeContents} />
      <br />
      <BlueButton isActive={isActiveSubmitColor} onClick={onClickSubmit}>
        GraphQL API 요청하기 (동기)
      </BlueButton>
    </>
  );
}
