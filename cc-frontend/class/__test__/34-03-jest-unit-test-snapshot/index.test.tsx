import { render } from "@testing-library/react";
import JestUnitTest from "../../pages/34-03-jest-unit-test-snapshot";

it("기존 사진이랑 바뀐게 없는지 비교 - 스냅샷 테스트", () => {
  const result = render(<JestUnitTest />);

  // 처음에 스크린샷이 없을때 알아서 찍는다.
  // 그 이후 비교함
  expect(result.container).toMatchSnapshot();
});
