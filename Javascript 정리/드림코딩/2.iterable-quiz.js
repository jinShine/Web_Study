// 0부터 10이하까지 숫자의 2배를 순회하는 이터레이블 만들기

const multiple = {
  [Symbol.iterator]() {
    const max = 10;
    let initNum = 0;

    return {
      next() {
        return { value: initNum++ * 2, done: initNum > max };
      },
    };
  },
};

for (const num of multiple) {
  console.log(num);
}
