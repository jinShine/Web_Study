import * as S from "./Products.styles";

export default function ProductsUI({ data, onClickChecked, onClickDelete }) {
  return (
    <>
      {data?.fetchProducts.map((el) => {
        return (
          <S.Row key={el._id}>
            <S.Column>
              <input type="checkbox" onClick={(e) => onClickChecked(e, el._id)} />
            </S.Column>
            <S.Column>{el.seller}</S.Column>
            <S.Column>{el.name}</S.Column>
            <S.Column>{el.price}</S.Column>
            <S.Column>
              <button id={el._id} onClick={onClickDelete}>
                삭제
              </button>
            </S.Column>
          </S.Row>
        );
      })}
    </>
  );
}
