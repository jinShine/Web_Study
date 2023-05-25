/**
 * https://www.acmicpc.net/problem/11399
 *
 * ATM
 *
 *
 */

let fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split("\n");

console.log(input);

let n = Number(input[0].split(" ")); // 사람의 수
let p = input[1].split(" ").map(Number); // 인출하는데 걸리는 시간 arr

p.sort((a, b) => a - b);

let addedValue = 0;
for (let i = 0; i < n; i++) {
  addedValue += p[i];
  p[i] = addedValue;
}

const result = p.reduce((acc, value) => acc + value);
console.log(result);
