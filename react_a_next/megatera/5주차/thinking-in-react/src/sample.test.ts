function add(x: number, y: number): number {
  return x + y;
}

test("add", () => {
  expect(add(1, 2)).toBe(3); // add(1, 2) === 3
});

const context = describe;
/**
 * describe: 보통 주어를 쓴다.
 * it : 주어를 ~ 한다.
 */
describe("add", () => {
  context("with two arguments", () => {
    it("return sum of two numbers", () => {
      expect(add(1, 2)).toBe(3);
    });
  });
});
