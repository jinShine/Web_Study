/**
 * https://www.acmicpc.net/problem/2839
 *
 * 설탕 배달
 *
 *
 */

let fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split("\n");

let n = Number(input[0]); // 킬로그램
let count = 0;

while (n >= 0) {
  if (n % 5 === 0) {
    console.log("#? :", n);
    count += parseInt(n / 5);
    break;
  }

  n -= 3;
  count += 1;

  if (n < 0 && n < 3) {
    count = -1;
  }
}

console.log(count);

// const minusSplittedValue = input[0].split("-");

// const result = minusSplittedValue
//   .map((mv) =>
//     mv
//       .split("+")
//       .map(Number)
//       .reduce((acc, current) => acc + current)
//   )
//   .reduce((acc, current) => acc - current);

// console.log(result);
