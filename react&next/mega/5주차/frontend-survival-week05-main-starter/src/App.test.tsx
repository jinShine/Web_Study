// import { render, waitFor, screen } from '@testing-library/react';

// import App from './App';

// describe('App ', () => {
//   it('renders restaurants', async () => {
//     render(<App />);

//     await waitFor(() => {
//       screen.getByText(/메가반점/);
//       screen.getByText(/메리김밥/);
//     });
//   });
// });

function add(a = 0, b = 0) {
  return a + b;
}

test("add", () => {
  expect(add(1, 2)).toBe(3);
});

describe("add", () => {
  it("두 변수 합을 리턴", () => {
    expect(add(1, 2)).toBe(3);
  });
});

const context = describe;

describe("add", () => {
  context("인자값이 없을때", () => {
    it("0을 리턴", () => {
      expect(add()).toBe(0);
    });
  });

  context("인자값이 하나일때", () => {
    it("들어온 인자값과 같은것이 리턴", () => {
      expect(add(2)).toBe(2);
    });
  });

  context("두 인자값 입력", () => {
    it("두 인자값이 합한 값이 리턴", () => {
      expect(add(5, 6)).toBe(11);
    });
  });
});
