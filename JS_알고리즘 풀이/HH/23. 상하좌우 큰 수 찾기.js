/*
5x5 2차원 배열이 주어질 때 어떤 원소가 상하좌우에 있는 원소보다 클 때 해당 위치에 * 을 표시하는 프로그램을 작성하세요. 경계선에 있는 수는 상하좌우 중 존재하는 원소만을 비교합니다.

입력
[[3,4,1,4,9],[2,9,4,5,8],[9,0,8,2,1],[7,0,2,8,4],[2,7,2,1,4]]

출력
3 4 1 4 *
2 * 4 5 8
* 0 * 2 1
7 0 2 * 4
2 * 2 1 4
*/

function solution(arr1) {
  let answer = [[], [], [], [], []];

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
      let currentValue = arr1[i][j];
      answer[i][j] = currentValue;

      // 상 존재
      if (i > 0) {
        if (currentValue <= arr1[i - 1][j]) {
          continue;
        }
      }

      // 하 존재
      if (i < arr1.length - 1) {
        if (currentValue <= arr1[i + 1][j]) {
          continue;
        }
      }

      // 좌 존재
      if (j > 0) {
        if (currentValue <= arr1[i][j - 1]) {
          continue;
        }
      }

      // 우 존재
      if (j < arr1.length - 1) {
        if (currentValue <= arr1[i][j + 1]) {
          continue;
        }
      }

      answer[i][j] = "*";
    }
  }

  return answer;
}

let arr1 = [
  [7, 4, 6, 5, 9],
  [6, 1, 3, 4, 5],
  [4, 8, 5, 6, 9],
  [1, 3, 0, 6, 4],
  [6, 4, 8, 1, 7],
];

// let arr1 = [
//   [3, 4, 1, 4, 9],
//   [2, 9, 4, 5, 8],
//   [9, 0, 8, 2, 1],
//   [7, 0, 2, 8, 4],
//   [2, 7, 2, 1, 4],
// ];

console.log(solution(arr1));
