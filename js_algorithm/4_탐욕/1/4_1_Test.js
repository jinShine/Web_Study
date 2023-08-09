/**
 * https://www.acmicpc.net/problem/11047
 *
 * 동전 0
 *
 *
 */

let fs = require("fs");
let input = fs.readFileSync("./input.txt").toString().split("\n");

console.log(input);

let n = Number(input[0].split(" ")[0]); // 동전 갯수
let k = Number(input[0].split(" ")[1]); // 만들어야 하는 값

let arr = [];
for (let i = 1; i <= n; i++) {
  arr.push(input[i]);
}

let result = 0;
for (let i = n - 1; i >= 0; i--) {
  console.log("#", parseInt(k / arr[i]));
  result += parseInt(k / arr[i]);
  k %= arr[i];
}

console.log(result);
