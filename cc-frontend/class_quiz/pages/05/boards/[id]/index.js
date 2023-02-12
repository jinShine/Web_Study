import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const FETCH_PRODUCT = gql`
  query fetchProduct($productId: ID) {
    fetchProduct(productId: $productId) {
      seller
      name
      detail
      price
    }
  }
`;

export default function DetailPage() {
  const { query } = useRouter();
  const { data } = useQuery(FETCH_PRODUCT, {
    variables: {
      productId: query.id,
    },
  });

  return (
    <>
      {data ? (
        <div>
          <div>판매자:</div>
          <div>상품명:</div>
          <div>상품내용:</div>
          <div>상품가격:</div>
        </div>
      ) : (
        "loading..."
      )}
    </>
  );
}
``;
