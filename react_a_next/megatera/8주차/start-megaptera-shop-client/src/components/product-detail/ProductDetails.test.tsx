import { render, screen, waitFor } from "@testing-library/react";
import ProductDetails from "./ProductDetails";

import fixtures from "../../../fixtures";

const [product] = fixtures.products;

test("ProductDetails", async () => {
  render(<ProductDetails />);

  await waitFor(() => {
    screen.getByText(product.name);
  });
});
