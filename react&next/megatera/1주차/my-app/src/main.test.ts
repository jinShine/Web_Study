function add(x: number, y: number): number {
	return x + y;
}

const context = describe;

describe('add 함수', () => {
	context('두 개의 양수가 주어졌을때 ', () => {
		it('두 숫자의 합을 리턴한다.', () => {
			expect(add(1, 2)).toBe(3);
		});
	});
});
