/*
    자료형 변환(type casting)
    
      * 자바스크립트는 다른 언어와 다르게 자료형을 지정하지 않는다.
      * 자동형 변환, 직접형 변환 존재
    */

///////////////////////////////////////////// 자동형 변환 /////////////////////////////////////////////

let str = "20";
let num = 10;

// + 연산자는 계산하는곳에 문자열이 있으면 숫자도 문자열로 형변환하여 보여준다.
console.log(str + num); // "2010"

// - 연산자는 문자열에 없기 때문에 문자를 숫자로 자동형 변환하여 보여준다.
console.log(str - num); // 10

///////////////////////////////////////////// 직접형 변환 /////////////////////////////////////////////

/*
    1. Number 형으로 변환
      * Number(자료)
    */
let num1 = Number("123");
let str1 = "555";
let num2 = Number(str1);
console.log(typeof num2);

let str2 = "%123123";
console.log(Number(str2)); // NaN (Not a Number) : 다른 문자가 들어있어서 숫자로 변환하지 못할때 출력

console.log(Number(true)); // 1
console.log(Number(false)); // 0

// parseInt() : 정수로 변환
// parseFloat() : 실수로 변환

let num3 = "123.123";
console.log(parseInt(num3)); // 123
console.log(parseFloat(num3)); // 123.123

/*
    2. String 형으로 변환
      * String(자료)
    */
let num4 = 123123;
console.log(String(num4)); // "123123"

// toString()
console.log(num4.toString()); // "123123"

/*
    3. Boolean 형으로 변환
      * Boolean(자료)
    */
Boolean(1); // true
Boolean(0); // false
Boolean(NaN); // false

// 적용해보기
// 섭씨온도 = (화씨온도 - 32) / 1.8

// let fah = prompt("변환할 화씨온도")
// let cel = (parseFloat(fah) - 32) / 1.8
// alert(`${cel.toFixed(1)}도 입니다.`)
