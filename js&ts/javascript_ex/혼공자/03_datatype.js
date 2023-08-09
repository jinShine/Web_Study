/*
    자료형(data type)

    자료형은 프로그램에서 처리할 자료(data)의 형태
    자바스크립트 자료형은 크게 원시타입(primitive type), 객체(object)로 나뉘어 집니다.
    */

////////////////////// 원시타입(primitive type)////////////////////////
/*
    1. 문자열(string)
      * 큰따옴표, 작은따옴표를 사용해서 데이터를 할당
    */

let str1 = "안녕하세요";
console.log(typeof str1);
let str2 = "this is" + "string"; // + 를 이용해서 문자열을 연결 가능
let str3 = "안녕"; // [index] 사용으로 해당 위치의 문자 확인 가능
str3[0]; // 안
str3[1]; // 녕

let str4 = "안녕하세요";
console.log(str4.length); // 5 length: 문자열 길이

// 템플릿 리터럴(template literal)
//  * 문자열과 변수를 섞어서 하나의 문자열을 만드는 표현 형식
//  * 백팃(``) 이용
let strName = "버즈";
let classRoom = "301";
let tlResult = `${strName}님, ${classRoom}호 강의실로 오세요`;
console.log(tlResult);

/*
    2. 숫자형(number)
      * 자바스크립트는 소수점이 있는 숫자(실수)와, 소수점이 없는 숫자(정수)를 모두 숫자 자료형으로 인식
    */
let num1 = 3;
let num2 = 111.1;
console.log(typeof num1);
console.log(typeof num2);

/*
    3. 논리형(boolean)
      * true, false 두가지
    */
let b1 = true;
let b2 = false;
console.log(typeof b1);
let b3 = 3;
let b4 = 10;
let isB5 = b3 < b4;

// Falshy 거짓인 값
// => 0, -0, ""(empty string), null, undefined, NaN

// Truthy 참인 값
// => 1, -1, "text", {}, Infinity

/*
    4. undefined
      * 값이면서 자료형
      * 값을 할당하지 않았을때
    */
let ud1;
console.log(ud1);

/*
    5. null
      * 값이면서 자료형
      * null은 값이 없을때
      * undefined는 애초 기본값이기 때문에 빈값인지 유효한지 체크할수 없지만, null은 값이 없거나 유효하지 않는 값을 의미
    */
let n1 = null;
let n2 = "버즈";
n2 = null;
console.log(n2);
console.log(typeof null);

// undefined는 사용자가 실수로 값을 지정하지 않을떄의 값
// null은 사용자가 일부로 유효하지 않은 값을 지정한 값, 확실하게 비어있는 값을 표현

/*
    6. symbol
      * ECMA2015에 새롭게 추가됨
      * 유일성을 보장해서 객체의 프로퍼티의 key[키]로 사용됩니다.
      * 아직 많이 사용되지 않지만 알아두면 좋다.
    */
let sym = Symbol();
const member = {
  name: "버즈",
  [sym]: 12345, // 심벌을 키로 지정할때는 []대괄호를 사용한다.
};
console.log(typeof member);
console.log(member);
console.log(member[sym]); // {name: "버즈", Symbol(): 12345}

// Symbol로 표기되어 symbol이 많아지면 구분하기 어려워, 설명을 추가할 수 있다.
// Symbol("설명")
let age = Symbol("age");
member[age] = 32;
console.log(member); // {name: "버즈", Symbol(): 555, Symbol(age): 32}

////////////////////// 객체(object) ////////////////////////
/*
    객체
      * 여러 개의 원시 유형을 하나로 묶어 놓은 것이라고 생각 할 수 있다.
      * 배열, 함수 등 
      * 객체는 다음에 자세히 다룬다.
    */
let arr = [];
console.log(typeof arr); // object
