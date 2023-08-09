/*
배달의 민족

응수는 요즘 쌀 배달을 하고 있습니다. 쌀 가게에 정확하게 N 킬로그램 배달해야 합니다.
응수가 가진 쌀 포대는 3킬로와 5킬로 포대가 있다.
최대한 적은 봉지 개수로 배달을 하려합니다. 예를 들면, 21킬로그램 쌀은, 3킬로 포대 7개로 배달 가능 하지만, 5킬로 3포대와 3킬로 2포대로 배달하면 총 5포대로 더 적은 개수로 배달할 수 있다.
응수가 쌀을 N킬로그램 배달할 때, 가장 적은 쌀 포대의 개수를 구하는 프로그램을 작성하세요.

- 정수 N이 주어진다. (3 ≤ N ≤ 1,000)
- 정확하게 N킬로그램을 만들 수 없다면 -1을 출력

입출력
18	4
4	-1
11	3
21	5
*/

function solution(N) {
  let r = Math.floor(N % 5);
  let share = Math.floor(N / 5);
  let sum;

  while (true) {
    if (share <= 0) {
      sum = -1;
      break;
    }

    if (r % 3 !== 0) {
      share -= 1;
      let r = N - share * 5;

      if (r % 3 === 0) {
        sum = share + Math.floor(r / 3);
        break;
      }
    } else {
      sum = share + r / 3;
      break;
    }
  }

  return sum;
}

let N = 57;
console.log(solution(N));
