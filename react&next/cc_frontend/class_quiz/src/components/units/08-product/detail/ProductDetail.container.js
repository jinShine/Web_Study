import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import ProductDetailUI from "./ProductDetail.presenter";
import { FETCH_PRODUCT } from "./ProductDetail.queries";

export default function ProductDetail() {
  // Router
  const router = useRouter();

  // GQL
  const { data } = useQuery(FETCH_PRODUCT, {
    variables: {
      productId: router.query.productId,
    },
  });

  // Handler
  const onClickMoveProductDetail = () => {
    router.push(`/08/${router.query.productId}/edit`);
  };

  return (
    <>
      <ProductDetailUI data={data} onClickMoveProductDetail={onClickMoveProductDetail} />
    </>
  );
}
