const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

const go = (...args) => reduce((a, f) => f(a), args);

go(
  0,
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
  console.log
);

// # pipe
// - 함수를 리턴하는 함수
// - 함수를 인자로 받아서 함수를 리턴하는 함수
const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);

const f = pipe(
  (a, b) => a + b,
  (a) => a + 10,
  (a) => a + 100
);
console.log(f(0, 1));
