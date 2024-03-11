// 소수의 개수와 덧셈(상)

function solution(s) {
  function isPrime(num) {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        return false;
      }
    }

    return num > 1;
  }

  let numbers = s.split(" ").map((str) => Number(str));
  let minForIsNotPrime = numbers
    .filter((v) => !isPrime(v))
    .sort((a, b) => a - b)
    .slice(0, 1)
    .join("");
  let maxForIsPrime = numbers
    .filter((v) => isPrime(v))
    .sort((a, b) => a - b)
    .slice(-1)
    .join("");

  return `${minForIsNotPrime} ${maxForIsPrime}`;
}

let s = "97 75 88 99 95 92 73";

console.log(solution(s));
