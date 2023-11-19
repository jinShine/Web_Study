import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { render, screen, waitFor } from "@testing-library/react";

import routes from "./routes";

const context = describe;

describe("routes", () => {
  function renderRouter(path: string) {
    const router = createMemoryRouter(routes, { initialEntries: [path] });
    render(<RouterProvider router={router} />);
  }

  context("when the current path is “/”", () => {
    it("renders the home page", async () => {
      renderRouter("/");

      await waitFor(() => {
        screen.getByText(/Home page/);
      });
    });
  });

  context(`when the current path is "/products/${id}"`, () => {
    context("with correct ID", () => {
      it("renders the product detail page", async () => {
        renderRouter("/products/product-01");

        screen.getByText(/Loading/);

        await waitFor(() => {
          screen.getByText(/Product #1/);
        });
      });
    });
  });
});
