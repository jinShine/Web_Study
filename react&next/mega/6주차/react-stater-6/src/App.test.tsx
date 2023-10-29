import { render, waitFor, screen } from "@testing-library/react";

import App from "./App";

describe("App ", () => {
  it("renders restaurants", async () => {
    render(<App />);
  });
});
