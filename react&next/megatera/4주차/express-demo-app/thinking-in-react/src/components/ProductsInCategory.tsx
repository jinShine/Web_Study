import CategoryRow from "./ProductCategoryRow";
import ProductRow from "./ProductRow";

import Product from "../types/product";
import selectProducts from "../utils/selectProducts";

type ProductsInCategoryProps = {
  category: string;
  products: Product[];
};

export default function ProductsInCategory({
  category,
  products,
}: ProductsInCategoryProps) {
  const productsInCategory = selectProducts(products, category);

  return (
    <>
      <CategoryRow category={category} />
      {productsInCategory.map((product) => (
        <ProductRow key={product.name} product={product} />
      ))}
    </>
  );
}
