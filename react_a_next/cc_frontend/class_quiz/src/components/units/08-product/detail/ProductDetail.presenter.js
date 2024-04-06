export default function ProductDetailUI({ data, onClickMoveProductDetail }) {
  return (
    <>
      {data ? (
        <div>
          <div>판매자: {data.fetchProduct.seller}</div>
          <div>상품명: {data.fetchProduct.name}</div>
          <div>상품내용: {data.fetchProduct.detail}</div>
          <div>상품가격: {data.fetchProduct.price}</div>
          <button onClick={onClickMoveProductDetail}>수정하기로 이동</button>
        </div>
      ) : (
        "loading..."
      )}
    </>
  );
}
