// const multiple = {
//   [Symbol.iterator]() {
//     const max = 10;
//     let initNum = 0;

//     return {
//       next() {
//         return { value: initNum++ * 2, done: initNum > max };
//       },
//     };
//   },
// };

function* multipleGenerator() {
  for (let i = 0; i < 10; i++) {
    console.log(console.log(i)); // 0 만 찍히고 끝난다., next()가 호출되어야지만 다음으로 넘어가게된다.

    yield i ** 2;
  }
}

const multiple = multipleGenerator();
let next = multiple.next();

console.log(next.value, next.done);

next = multiple.next();
console.log(next.value, next.done);
