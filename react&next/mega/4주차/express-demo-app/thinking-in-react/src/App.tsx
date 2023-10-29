import { useEffect, useState } from "react";
import FilterableProductTable from "./components/FilterableProductTable";
import TimerControl from "./components/Timer";
import Product from "./types/product";

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const url = "http://localhost:3000/products";
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);
  return (
    <div>
      <TimerControl />
      <FilterableProductTable products={products} />
    </div>
  );
}
