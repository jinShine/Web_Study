import Product from "../types/product";

function nomalize(text: string) {
  return text.trim().toLowerCase();
}

type FilterConditions = {
  filterText: string;
  inStockOnly: boolean;
};

export default function filterProducts(
  products: Product[],
  { filterText, inStockOnly }: FilterConditions
) {
  const filteredProducts = products.filter(
    (product) => !inStockOnly || product.stocked
  );

  const query = nomalize(filterText);

  if (!query) {
    return filteredProducts;
  }

  const contains = (product: Product) => nomalize(product.name).includes(query);

  return filteredProducts.filter(contains);
}
