import ProductsInCategory from "./ProductsInCategory";

import Product from "./types/product";

import selectCategories from "./utils/selectCategories";

export default function ProductTable({ products }: { products: Product[] }) {
  const categories = selectCategories(products);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <ProductsInCategory
            key={category}
            category={category}
            products={products}
          />
        ))}
      </tbody>
    </table>
  );
}
