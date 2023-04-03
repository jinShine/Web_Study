import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import GraphqlMutationPage, {
  CREATE_BOARD,
} from "../../pages/34-05-jest-unit-test-mocking";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";

// 가짜 useRouter만들고, 가짜 push 만들기
jest.mock("next/router", () => ({ useRouter: jest.fn() }));
const push = jest.fn();

// useRouter안에 push를 넣어준다.
(useRouter as jest.Mock).mockImplementation(() => ({
  push,
}));

// 가짜 mutation 만들기(요청, 응답 모두)
const mocks = [
  {
    request: {
      query: CREATE_BOARD,
      variables: {
        createBoardInput: {
          writer: "철수",
          title: "제목입니다.",
          contents: "내용입니다.",
          password: "1234",
        },
      },
    },
    result: {
      data: {
        createBoard: {
          _id: "test-boardId",
          writer: "철수",
          title: "안녕하세요",
          contents: "반갑습니다.",
        },
      },
    },
  },
];

it("API를 Mocking하여 테스트하자", async () => {
  // render(<GraphqlMutationPage />);

  render(
    <MockedProvider mocks={mocks}>
      <GraphqlMutationPage />
    </MockedProvider>
  );

  const inputWriter = screen.getByRole("input-writer");
  fireEvent.change(inputWriter, {
    target: { value: "철수" },
  });

  const inputTitle = screen.getByRole("input-title");
  fireEvent.change(inputTitle, {
    target: { value: "제목입니다." },
  });

  const inputContents = screen.getByRole("input-contents");
  fireEvent.change(inputContents, {
    target: { value: "내용입니다." },
  });

  const submitButton = screen.getByRole("submit-button");
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(push).toHaveBeenCalledWith(`/boards/test-boardId`);
  });
});
