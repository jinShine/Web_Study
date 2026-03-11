`use strict`;

/** Wrapper 객체 */
// 원시값을 필요에 따라서 관련된 빌트인 객체로 변환한다.
const number = 123; // number 원시 타입
// number 원시타입을 감싸고 있는 Number 객체로 감싸짐
console.log(number.toString());
console.log(number); // number 원시 타입

const text = "text"; // string 문자열 원시타입
console.log(text);
text.length; // String 객체
text.trim();

/* Number 객체 */

// toFixed()
// 소수점 이하 몇자리까지 출력할지
const num1 = 123.123;
console.log(num1.toFixed(2)); // 123.12

// isNaN()
// 숫자가 아닌것을 체크
let m = Number("m"); // NaN 을 생성
console.log(Number.isNaN(m));

let n = 10 / 0; // Infinity를 생성
console.log(Number.isFinite(n));
n === Infinity; // NaN과 다르게 비교연산자로 비교 가능

// parseInt() - 문자를 정수로 반환
console.log(parseInt("3")); // 숫자 3
console.log(parseInt("12.33")); // 숫자 12
console.log(parseInt("12.77")); // 숫자 12
console.log(parseInt("10 20 30")); // 숫자 10
console.log(parseInt("10 years")); // 숫자 10
console.log(parseInt("10살")); // 숫자 10
// 실무에서는 사용자로 부터 입력 받은 숫자 값을 연산을 해야 하는 경우 parseInt()
// 사용자로 부터 입력 받은 값은 아무리 사용자가 숫자를 입력해도 실제로는 문자로 저장됨.
// 그래서 연산을 하려면 문자를 숫자로 바꿔주기 위해서 parseInt() 함수를 사용해야 함.

// parseFloat() - 부동소수점으로 반환
console.log(parseFloat("12.33"));

// 지수표기법
const num3 = 123;
console.log(num3.toExponential());
console.log(num3.toString());
console.log(num3.toLocaleString("ko-KR"));
