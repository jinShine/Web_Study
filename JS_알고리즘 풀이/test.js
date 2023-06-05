function solution(n, lost, reserve) {
  let newLost = lost.filter((l) => !reserve.includes(l)).sort((a, b) => a - b);
  let newReserve = reserve.filter((r) => !lost.includes(r)).sort((a, b) => a - b);

  let answer = n - newLost.length;

  console.log("@11", newLost);
  console.log("@22", newReserve);

  for (let i = 0; i < newLost.length; i++) {
    for (let j = 0; j < newReserve.length; j++) {
      if (newLost[i] === newReserve[j] - 1) {
        answer++;
      }
    }
  }

  return answer;
}

// solution(5, [2, 4], [1, 3, 5]);
// solution(5, [2, 4], [3]);
// solution(3, [3], [1]);
// solution(4, [2, 3], [3, 4]);
console.log(solution(6, [3, 4, 5], [3, 4, 6]));

// console.log(solution(4, [2, 3], [3, 4]));
// console.log(solution(4, [1, 2, 3, 5], [3, 4]));
