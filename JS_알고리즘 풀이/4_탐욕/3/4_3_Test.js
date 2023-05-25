/**
 * https://www.acmicpc.net/problem/1541
 *
 * 잃어버린 괄호
 *
 *
 */

let fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split("\n");

const minusSplittedValue = input[0].split("-");

const result = minusSplittedValue
  .map((mv) =>
    mv
      .split("+")
      .map(Number)
      .reduce((acc, current) => acc + current)
  )
  .reduce((acc, current) => acc - current);

console.log(result);
