/*
    최솟값 구하기

    7개의 수가 주어지면 그 숫자 중 가장 작은 수를 출력하는 프로그램을 작성하세요.
    ▣ 입력설명
    첫 번째 줄에 7개의 수가 주어진다.
    ▣ 출력설명
    첫 번째 줄에 가장 작은 값을 출력한다.
    ▣ 입력예제 1
    5 3 7 11 2 15 17
    ▣ 출력예제 1 2
    */

// 배열 최소값
// Min값을 최대치로 해놓고 시작하는것이 좋다.
// function solution(arr) {
//   let answer, min = Number.MAX_SAFE_INTEGER;

//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] < min) {
//       min = arr[i]
//     }
//   }

//   answer = min

//   return answer;
// }

// 내장함수 이용
function solution(arr) {
  let answer = Math.min(...arr);
  return answer;
}

let arr = [5, 7, 1, 3, 2, 9, 11];
console.log(solution(arr));
