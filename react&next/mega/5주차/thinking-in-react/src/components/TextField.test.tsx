import { fireEvent, render, screen } from "@testing-library/react";

import TextField from "./TextField";

const context = describe;

describe("TextField", () => {
  // given
  const label = "Name";
  const text = "Tester";

  const setText = jest.fn();

  // 여러 곳에서 call 불렸을때 중복되지 않게 미리 clear 해준다.
  beforeEach(() => {
    setText.mockClear()
  })

  function renderTextField() {
    render(
      <TextField
        label={label}
        placeholder="Input your name"
        text={text}
        setText={setText}
      />
    );
  }

  it("renders elements", () => {
    // when
    renderTextField();

    // then
    screen.getByLabelText("Name");
    screen.getByPlaceholderText(/name/);
    screen.getByDisplayValue(text);
  });

  // ----------

  context("when user enters name", () => {
    it('calls "setText" handler', () => {
      // given
      renderTextField();

      // when
      fireEvent.change(screen.getByLabelText(label), {
        target: { value: "New Name" },
      });

      // then
      expect(setText).toBeCalledWith("New Name");
    });
  });
});
