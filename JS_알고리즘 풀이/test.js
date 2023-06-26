/**
// 핑퐁 문제
// 일련의 숫자가 있고, 이 숫자는 1씩 증가, 또는 감소한다. N 번째의 숫자가 있을 시에, 이 숫자가 7의 배수(7, 14, 21)이거나 7이란 숫자를 포함할 시에 (7, 17, 27) 방향을 바꾼다.
// 즉, 1, 2, 3, 4, 5, 6, [7], 6, 5, 4, 3, 2, 1, [0], 1, 2, [3], 2, 1, 0, [-1], 0, 1
// 과 같이 숫자는 진행한다. (첫번째 7은 7번째, 두번째 0은 14번째, 세번째 3은 17번째, 네번째 -1은 21번째)

// 다음의 제약 하에 pingpong(x)의 함수를 작성하라. 예시의 인풋과 아웃풋은 다음과 같다.
// pingpong(8) = 6
// pingpong(22) = 0
// pingpong(68) = 2
// pingpong(100) = 2

// [조건]
// - for문 이용.
// - Assignment 를 쓰지 말 것. 즉, 변수 할당을 하지 말 것.
// - String을 쓰지 말 것.
 */

// for loop

// console.log("A");
// setTimeout(() => console.log("B"), 1000);
// setTimeout(() => console.log("C"), 0);
// console.log("D");

// const obj = {
//   hello: function () {
//     console.log(this);
//   },
// };

// obj.hello();

function a() {
  console.log(b); // undefined 같지만 b는 function b
  var b = "bbb";
  console.log(b); // bbb
  function b() {}
  console.log(b); // b함수
}
a();
