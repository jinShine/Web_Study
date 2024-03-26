import { useParams } from "react-router-dom";

import useFetchProduct from "../hooks/useFetchProduct";

import ProductDetails from "../components/product-detail/ProductDetails";

export default function ProductDetailsPage() {
  const params = useParams();

  const { loading, error } = useFetchProduct({ productId: String(params.id) });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다</div>;
  }

  return <ProductDetails />;
}
