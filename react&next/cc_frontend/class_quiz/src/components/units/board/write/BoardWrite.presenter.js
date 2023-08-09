import { BoardButton, BoardInput } from "./BoardWrite.styles";

export default function BoardRegisterUI({
  onChangeSeller,
  onChangeProductName,
  onChangeProductDetail,
  onChangeProductPrice,
  onClickSubmit,
  isActive,
}) {
  return (
    <>
      <div>
        판매자: <BoardInput type="text" onChange={onChangeSeller} />
      </div>
      <div>
        상품명: <BoardInput type="text" onChange={onChangeProductName} />
      </div>
      <div>
        상품내용: <BoardInput type="text" onChange={onChangeProductDetail} />
      </div>
      <div>
        상품가격: <BoardInput type="text" onChange={onChangeProductPrice} />
      </div>
      <BoardButton isActive={isActive} onClick={onClickSubmit}>
        등록하기
      </BoardButton>
    </>
  );
}
