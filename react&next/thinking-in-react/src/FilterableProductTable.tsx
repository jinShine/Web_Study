import { useState } from "react";
import ProductTable from "./ProductTable";
import SearchBar from "./SearchBar";
import Product from "./types/product";
import filterProducts from "./utils/filterProducts";

type FilterableProductTableProps = {
  products: Product[];
};

export default function FilterableProductTable({
  products,
}: FilterableProductTableProps) {
  // inStockOnly 상태가 있어야할 곳

  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = filterProducts(products, {
    filterText,
    inStockOnly,
  });

  return (
    <div>
      <SearchBar
        filterText={filterText}
        setFilterText={setFilterText}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
      />
      <ProductTable products={filteredProducts} />
    </div>
  );
}
