/*
    함수 고급

    * 콜백함수, 화살표 함수, 타이머 함수, 즉시 호출 함수, 엄격모드
    */

///////////////////////////////////////////// 콜백 함수(callback) /////////////////////////////////////////////

// 함수도 하나의 자료형이므로매개변수로 전달할 수 있으며, 매개변수로 전달하는 함수를 콜백(callback)함수라고 합니다.

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

function calc(a, b, action) {
  let result = action(a, b);
  console.log(result);

  return result;
}

calc(1, 2, add);
calc(1, 2, multiply);

function callTime(time, callback) {
  for (let i = 1; i <= time; i++) {
    callback(i);
  }
}
function print(arg) {
  console.log(arg);
}
callTime(3, print);

// 익명함수로 바꿔보기
callTime(3, (arg) => {
  console.log(arg);
});

const numbers = [1, 2, 3, 4, 5];

// forEach : for문
// function (value, index, array) { }
numbers.forEach((value, index, array) => {
  console.log("forEach value:", value);
  console.log("forEach value:", index);
  console.log("forEach value:", array);
});

// map : 리턴한 값을 기반으로 새로운 배열을 만든다.
// function (value, index, array) { }
let newNumbers = numbers.map((value, index, array) => {
  console.log("map value:", value);
  console.log("map value:", index);
  console.log("map value:", array);
  return value + value;
});
console.log(newNumbers);

// filter : 리턴하는 값이 true인것만 모아서 새로운 배열을 만든다.
// function (value, index, array) { }
newNumbers = numbers.filter(function (value, index, array) {
  return value % 2 === 0;
});
console.log(newNumbers);

// 둘다 함수 내부에선 value만 사용하므로 매개변수 value만 사용해도된다.
numbers.forEach(function (value) {
  console.log(value);
});

///////////////////////////////////////////// 화살표 함수 /////////////////////////////////////////////

// 화살표 함수는 function 대신 => 키워드를 사용한다.
// (매개변수) => { }
// (매개변수) => 리턴값

numbers.forEach((value) => console.log(value));
numbers.map((value) => value * value);
numbers.filter((value) => value % 2 === 0);

///////////////////////////////////////////// 타이머 함수 /////////////////////////////////////////////
/*
    setTimeout(함수, 시간) : 특정 시간 후에 함수를 호출
    setInterval(함수, 시간) : 특정 시간마다 함수를 호출

    clearTimeout(타이머_ID) : setTimeout() 함수로 설정한 타이머를 제거
    clearInterval(타이머_ID) : setInterval() 함수로 설정한 타이머를 제거
        * 타이머_ID는 setTimeout(), setInterval()함수를 호출할때 리턴값으로 나오는 숫자
    */

let timeID = setTimeout(() => {
  console.log("2초 후 호출");
}, 2000);

let intervalID = setInterval(() => {
  console.log("1초마다 호출");
}, 1000);

setTimeout(() => {
  clearTimeout(timeID);
  clearInterval(intervalID);
}, 5000);

///////////////////////////////////////////// 즉시 호출 함수 /////////////////////////////////////////////

/*
    익함함수를 생성하고 곧바로 즉시 호출하는 패턴
    (function (매개변수) {}(인수))

    일반적으로 HTML페이지 내부에 여러 script를 사용하곤 하는데, 이런곳에서 사용되는 변수 이름이 충돌할 가능성이 높다.
    예)
    <script>
    let pi = 3.14
    console.log(`파이값 : ${pi}`)
    script>
    < script>
    let pi = 3.141592 // 중복된 네이밍
    console.log(`파이값 : ${pi}`)
    script>    
    */

(function (message) {
  console.log(message);
})("안녕하세요");

///////////////////////////////////////////// 엄격 모드 /////////////////////////////////////////////
/* 
    엄격 모드
    `use strict`

    자바스크립트 코드 블록 가장 위쪽에 'use strict'라는 문자열이 등장
    이것은 코드를 엄격하게 검사하겠다라는 의미
    */

// 변수 키워드를 사용하지 않았는데도 사용 가능
data = 10;
console.log(data);
data2 = 10;
console.log(data2);

///////////////////////////////
// 생성자 함수
// 대문자로 시작,

// ex) 객체를 생성자로 만들어 보자
const apple = {
  name: "apple",
  display: () => {
    console.log(`${this.name}: 🍎`);
  },
};

function Fruit(name, emoji) {
  this.name = name;
  this.emoji = emoji;
  this.display = () => {
    console.log(`${this.name}: ${this.emoji}`);
  };

  return this; // 생략 가능
}

const apple1 = new Fruit("apple", "🍎");
const orange1 = new Fruit("orange", "🍊");

console.log(apple1.display());
console.log(orange1.display());
