/*
    함수
      * 같은 동작을 여러 번 실행하기 위해 사용하는 문

      * function name() { ... }
    */

// 선언적 함수
function func1() {
  console.log("func1");
}

// 익명 함수(anonymous function)
let func2 = function () {
  console.log("func2");
};

// 함수 기본 틀
// function func3(매개변수, 매개변수 = 기본값) {
//   문장

//   return 리턴값
// }

// 윤년 계산
let isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
// function isLeapYear(year) {
//   return (year % 4 === 0) && (year % 100 !== 0) || (year % 400 === 0)
// }

console.log("2020년은 윤년?", isLeapYear(2020));
console.log("2010년은 윤년?", isLeapYear(2010));
console.log("2000년은 윤년?", isLeapYear(2000));

///////////////////////////////////////////// 나머지 매개변수(rest parameter, 가변 매개변수) /////////////////////////////////////////////

// function func3(...items) {
//   items.forEach((item) => {
//     console.log(item)
//   })
// }

let func3 = (...items) => {
  items.forEach((item) => {
    console.log(item);
  });
};

func3(1, 2, 3, 4, 5, 6, 7);

// 전개 연산자
// 함수이름 (...배열)
let arr = [3, 4, 5];
function func4(a, b, ...items) {
  console.log(a);
  console.log(b);
  console.log(items);
}

func4(1, 2, arr); // 전개하기 전 -> [Array(3)]
func4(1, 2, ...arr); // 전개연산자를 사용하면 -> 이렇게 전개되서 나온다 [3,4,5]
