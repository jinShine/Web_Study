import { render, screen } from "@testing-library/react";
import JestUnitTest from "../../pages/34-02-jest-unit-test";
import "@testing-library/jest-dom";

it("내가 원하는대로 그려지는지 테스트하기", () => {
  // render를 이용해서 렌더상황을 만들 수 있다.
  render(<JestUnitTest />);

  // render의 결과를 screen으로 가져올 수 있다.
  const myText1 = screen.getByText("철수는 13살 입니다.");
  expect(myText1).toBeInTheDocument();

  const myText2 = screen.getByText("철수의 취미 입력하기:");
  expect(myText2).toBeInTheDocument();

  const myText3 = screen.getByText("철수랑 놀러가기");
  expect(myText3).toBeInTheDocument();

  // 테스트하기 위한 가상DOM을 만들어준다.
  // import "@testing-library/jest-dom"
});
