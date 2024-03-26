import Product from "../types/product";

export default function selectProducts(items: Product[], category: string) {
  return items.filter((item) => item.category === category);
}
