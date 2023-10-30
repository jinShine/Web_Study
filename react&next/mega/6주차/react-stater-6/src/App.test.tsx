import { render, waitFor, screen, fireEvent } from "@testing-library/react";

import { container } from "tsyringe";
import App from "./App";

const context = describe;

describe("App ", () => {
  it("renders restaurants", async () => {
    render(<App />);
  });
});

describe("App", () => {
  beforeEach(() => {
    container.clearInstances();
  });

  context("when presee increase button once", () => {
    test("counter", () => {
      render(<App />);

      fireEvent.click(screen.getByText("Increase"));

      const elements = screen.getAllByText("Count: 1");

      expect(elements).toHaveLength(2);
    });
  });

  context("when presee increase button twice", () => {
    test("counter", () => {
      render(<App />);

      fireEvent.click(screen.getByText("Increase"));
      fireEvent.click(screen.getByText("Increase"));

      const elements = screen.getAllByText("Count: 2");

      expect(elements).toHaveLength(2);
    });
  });
});
