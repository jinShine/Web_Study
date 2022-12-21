/*
체크아웃을 할 때 익일 시간은 24+a로 계산한다. 즉, 새벽 2시는 24+2인 26으로 진행 
체크 아웃이 새벽 5시 정각이나 새벽 5시를 넘어가면 체크아웃을 깜박한걸로 간주하여 5시가 넘어가면 9시(21시)로 처리

체크인
[9,9,8,8,7,8,9]

체크아웃
[21, 25, 30, 29, 22, 23, 30]

결과
96
 */

function solution(arr1, arr2) {
  let checkout = arr2.map((v) => (v >= 28 ? 21 : v));
  return checkout.map((v, i) => v - arr1[i]).reduce((prev, v) => prev + v);
}

let arr1 = [9, 7, 8, 9, 7, 9, 8];
let arr2 = [23, 22, 26, 26, 29, 27, 22];

console.log(solution(arr1, arr2));

13, 13, 20, 18, 22, 13, 14;
