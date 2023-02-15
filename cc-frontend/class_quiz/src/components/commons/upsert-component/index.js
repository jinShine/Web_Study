export default function UpsertComponent({ isEdit, onChangeInputInfo, onClickSubmit }) {
  return (
    <>
      <h1>상품 {isEdit ? "수정" : "등록"}</h1>
      <br />
      판매자 : <input type={"text"} name="seller" onChange={onChangeInputInfo} />
      <br />
      상품 이름 : <input type={"text"} name="name" onChange={onChangeInputInfo} />
      <br />
      상품 설명 : <input type={"text"} name="detail" onChange={onChangeInputInfo} />
      <br />
      상품 가격 : <input type={"text"} name="price" onChange={onChangeInputInfo} />
      <br />
      <button onClick={onClickSubmit}>{isEdit ? "수정하기" : "등록하기"}</button>
    </>
  );
}
