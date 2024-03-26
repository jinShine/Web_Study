import { render, screen } from "@testing-library/react";

import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";

import App from "./App";
import routes from "./routes";

const context = describe;

describe("App", () => {
  function renderRouter(path: string) {
    const router = createMemoryRouter(routes, { initialEntries: [path] });
    render(<RouterProvider router={router} />);

    screen.getByText(/Welcome/);
  }

  context("when the current path is " / "", () => {
    it("renders the home page", () => {
      renderRouter("/");
    });
  });
});
