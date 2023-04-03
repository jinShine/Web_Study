import { fireEvent, render, screen } from "@testing-library/react";
import CounterStatePage from "../../pages/34-04-jest-unit-test-evnet";
import "@testing-library/jest-dom";

it("버튼을 눌렀을때 버튼이 제대로 작동하는지 테스트", () => {
  render(<CounterStatePage />);

  // event 핸들링
  // fireEvent

  const countupButton = screen.getByText("카운트 올리기!!");
  fireEvent.click(countupButton);

  expect(screen.getByRole("count")).toHaveTextContent("1");
});
