///////////////////////////////////////////// 객체 속성 여부 존재 /////////////////////////////////////////////

/* 
객체 내부에 어떤 속성이 있는지 확인해보는 코드
*/

// 객체 내부에 없는 속성에 접근하면 undefined
const object1 = {
  name: "혼자 공부하는 자바스크립트",
  price: 20000,
  publisher: "한빛미디어",
};

if (object1.name !== undefined) {
  console.log("name 속성이 있습니다.");
} else {
  console.log("name 속성이 없습니다.");
}

// short version 1
if (object1.name) {
  console.log("name 속성이 있습니다.");
} else {
  console.log("name 속성이 없습니다.");
}

// short version 2 (중요)
object1.stock = object1.stock || 20;
object1.name = object1.name || console.log("없으면 여기 실행됨");
console.log(object1.stock);
console.log(object1.name);

///////////////////////////////////////////// 배열, 객체 다중 할당 /////////////////////////////////////////////

// 1. 배열
// [식별자, 식별자] = 배열

// 배열 각 요소에 네이밍 지정
let [lat, lng] = [37.541, 126.986];
console.log(lat, lng);

// 요소가 많아도 원하는 요소만 네이밍 지정 가능
let arrayA = [1, 2, 3, 4, 5];
const [a, b, c] = arrayA;
console.log(a, b, c); // 1, 2, 3

// 2. 객체
// { 속성 이름, 속성 이름 } = 객체
// { 식별자 = 속성이름, 식별자 = 속성이름 } = 객체

// 객체에 존재하는 속성중에 필요한것만 가져올 수 있다.
const { name, price } = object1;
console.log(name, price);

// 식별자 지정 가능
const { n = name, p = price } = object1;
console.log(n, p);

///////////////////////////////////////////// 객체 복사 /////////////////////////////////////////////

/* 
1. 얕은 복사(참조 복사)

  * 주소값이 복사되는 Call by Reference 방식
  * Primitive Type를 제외한 타입 (객체, 배열, 함수 등)
  
  * box2의 값을 변경했는데 box1도 변경됬다.
    이는 객체를 복사할 경우 값이 아닌 값이 저장된 메모리 주소를 전달하게 됩니다.
    즉, 같은 메모리 주소를 참조하고 있어서 전부 변경되는 것입니다.
    이것을 call by reference(참조로 전달한다)라고 한다.
*/

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

/* 
2. 깊은 복사

  * 새로운 메모리 공간에 값이 복사되는 Call by Value 방식
  * Primitive Type
  * 복사한 두 배열이 완전히 독립적으로 작동해야 한다.
   
  * number1이 number2에 복사됨, number2를 수정해도 number1에 대해 영향이 없다. 
    변수에 값을 할당하면 컴퓨터 저장장치 어딘가에 공간이 만들어지면서 저장을 하게 된다.
    number1을 number2로 할당하면 값을 넣어둘 새로운 공간을 만들면서 값 그대로 전달하게 되는데, 이것을 '값을 전달한다'라고 한다.
*/

let number1 = 100;
let number2 = number1;
console.log(number1); // 100
console.log(number2); // 100

///////////////////////////////////////////// 전개 연산자 /////////////////////////////////////////////

// Primitive 타입이 아닌 객체, 배열에서 깊은 복사를 하기 위한 방법
// 예전엔 깊은 복사를 하기위해 라이브러리등을 활용하였는데, 최신엔 전개 연산자를 사용해서 가능해졌다.

// 배열 전개 연산자
// [...배열]

const basket1 = ["우유", "식빵"];
const basket2 = [...basket1]; // 이렇게 하면 이전과 다르게 두 배열은 독립적으로 작동한다.

basket1.push("딸기잼");
basket1.push("버터");
console.log(basket1);
console.log(basket2);

// 객체 전개 연산자
// {...객체}

const book1 = {
  name: "자바스크립트",
  price: 20000,
};
const book2 = { ...book1 }; // 이렇게 하면 이전과 다르게 두 객체는 독립적으로 작동한다.
// const book2 = book1;
book1.name = "파이썬";
console.log(book1);
console.log(book2);
