import { fireEvent, render, screen } from "@testing-library/react";
import TextField from "./TextField";

const context = describe;

describe("TextField", () => {
  const text = "Tester";
  const setText = jest.fn();

  beforeEach(() => {
    setText.mockClear();
  });

  function renderTextField() {
    return render(
      <TextField
        label="Name"
        placeholder="Input your name"
        text={text}
        setText={setText}
      />
    );
  }

  it("render", () => {
    renderTextField();

    screen.getByLabelText("Name");
  });

  context("유저가 텍스트를 입력했을때", () => {
    it("change handler를 호출해라", () => {
      renderTextField();

      fireEvent.change(screen.getByLabelText("Name"), {
        target: { value: "New Name" },
      });

      expect(setText).toBeCalledWith("New Name");
    });
  });
});

jest.mock("te", () => ({
  storage: () => [setFoo],
}));
