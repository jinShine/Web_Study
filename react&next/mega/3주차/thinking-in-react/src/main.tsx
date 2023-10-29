import { createRoot } from "react-dom/client";
import App from "./App";

async function main() {
  const url = "http://localhost:3000/products";
  const response = await fetch(url);
  const data = await response.json();
  const { products } = data;

  const element = document.getElementById("root");

  if (!element) {
    return;
  }

  const root = createRoot(element);
  root.render(<App products={products} />);
}

main();
