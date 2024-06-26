/*
    객체
      * 관련된 속성과 메서드를 함께 모아 놓은 것

      객체명 {
        키 : 값,
        키 : 값,

        키 : 메서드 () {

        }
      }
    */

typeof [];

///////////////////////////////////////////// 객체 /////////////////////////////////////////////

// 배열
// 인덱스, 요소(값)
// 모든 자료형을 가질수 있다.
const arr1 = ["사과", "바나나", "망고", 1000, ["하와이", "대한민국"], 32.111111];

// 접근하기 위해서는
arr1[0];
arr1[1];

// 객체
// 키 : 값
// 모든 자료형을 가질수 있다.
// 객체 내부에는 속성과 메서드가 존재한다.

// Object literal { key: value }
// new Object
// Object.create()

const product = {
  아이디: 100029992,
  제품명: "새우깡",
  원산지: "대한민국",
  가격: 2000,
  생산공장: ["여수", "강원", "이천"],

  make: function () {
    console.log(`${this.제품명}을/를 만드는 중입니다.`); // 메서드 내에서 자기 자신의 속성에 접근할때는 this 키워드를 사용한다.
  },
  // 위의 방식대로 메서드를 만들어도 되지만, 최신 JS에서 아래와 같이도 메서드를 만들 수 있다.
  test(name) {
    console.log(`${name}님이 ${this.아이디} 제품 검사를 합니다. `);
  },
};

// 접근 하기 위해서는
product.아이디; // 마침표 표기법 dot notation
product["아이디"]; // 대괄호 표기법 bracket notation
console.log(product["제품명"]);
console.log(product.제품명);

product.make();
product.test("버즈");

// 동적으로 객체 추가 하기
const student = {};
student.name = "버즈";
student.age = "32";
student.hobby = "축구";
student.sleep = function () {
  console.log("잔다.");
};

console.log(JSON.stringify(student));
student.sleep();

// 객체 삭제 방법
// delete 객체.속성
delete student.hobby;
console.log(student);

/* 
      !!!!!!!!!!!!!!!!!!!!!! 
  
      익명함수와 화살표 함수는 객체의 메소드로 사용될때 this 키워드를 다루는 방식이 다르다.
  
      익명함수의 this : 객체 내부의 속성을 가르킴
      화살표 함수의 this : window 객체를 가리킴
  
      그렇기 때문에 객체 내부에선 화살표 함수를 사용하지 않도록 한다!
      */

const test = {
  name: "버즈",

  a: function () {
    console.log(this);
  },

  b: () => {
    console.log(this);
  },
};

test.a(); // {name: "버즈", a: function, b: function}
test.b(); // Window {Infinity: Infinity, window: Window, NaN: NaN, undefined: undefined, document: #document, …}

///////////////////////////////////////////// 객체 복사 /////////////////////////////////////////////

// call by value(값을 전달)
// primitive 타입은 by value
let number1 = 100;
let number2 = number1;
console.log(number1); // 100
console.log(number2); // 100 , number1이 number2에 복사됨, number2를 수정해도 number1에 대해 영향이 없다.
// 변수에 값을 할당하면 컴퓨터 저장장치 어딘가에 공간이 만들어지면서 저장을 하게 된다.
// number1을 number2로 할당하면 값을 넣어둘 새로운 공간을 만들면서 값 그대로 전달하게 되는데, 이것을 '값을 전달한다'라고 한다.

// call by reference(참조 형태로 전달)
let box1 = {
  width: 50,
  height: 50,
  color: "blue",
};

let box2 = box1;
console.log(box1);
console.log(box2);

box2.color = "red";
console.log(box1);
console.log(box2);
// box2의 값을 변경했는데 box1도 변경됬다.
// 이는 객체를 복사할 경우 값이 아닌 값이 저장된 메모리 주소를 전달하게 됩니다.
// 즉, 같은 메모리 주소를 참조하고 있어서 전부 변경되는 것입니다.
// 이것을 call by reference(참조로 전달한다)라고 한다.

///////////////////////////////////////////// 기본 자료형 객체 선언방법 /////////////////////////////////////////////

// 숫자, 문자, 불 등이 기본 자료형
// const 객체 = new 객체자료형()

const oNum = new Number();
const oStr = new String();
const oBool = new Boolean();

// !!!
// new 키워드를 사용하지 않으면 함수가 자료형 변환 기능으로 동작한다!
Number("123");
String(123);

///////////////////////////////////////////// 프로토타입(Prototype) /////////////////////////////////////////////

/* 
      자바스크립트의 모든 객체는 프로토타입을 가지고 있습니다.
      모든 객체는 거들의 프로토타입으로부터 속성과 메서드를 상속받습니다.
  
        * 객체 자료형 이름.prototype.메소드 이름 = function() { }
      */

Number.prototype.testNum = 10;
const i = 1000;
console.log(i.testNum); // 10

Number.prototype.power = function (n) {
  return this.valueOf() ** n;
};

let pNum = 2;
console.log(pNum.power(2));
console.log(pNum.power(3));
console.log(pNum.power(4));

Number.prototype.isPrime = function (num) {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return num > 1;
};

console.log("##### isPrime", Number.prototype.isPrime(3));

String.prototype.contain = function (str) {
  return this.indexOf(str) >= 0;
};
Array.prototype.contain = function (data) {
  return this.indexOf(data) >= 0;
};

const a = "안녕하세요";
console.log(a.contain("안녕"));
console.log(a.contain("없"));

const b = [1, 2, 3, 4, 5];
console.log(b.contain(1));
console.log(b.contain(9));
