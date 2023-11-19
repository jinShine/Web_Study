import { container } from "tsyringe";

import { useStore } from "usestore-ts";

import ProductDetailsStore from "../stores/ProductDetailStore";

export default function useProductDetailStore() {
  const store = container.resolve(ProductDetailsStore);
  return useStore(store);
}
