// 배열 생성 방법
let array = new Array(2); // 사이즈를 정하거나
console.log(array);

// 배열 만드는 방법 몇가지
array = new Array(1, 2, 3); // 요소를 바로 넣을 수 있다.
console.log(array);
array = Array.of(1, 2, 3, 4, 5);
console.log(array);
array = Array.from([7, 8, 9]);
console.log(array);
array = [1, 2];
console.log(array);

// 일반적으로 배열은 동일한 메모리 크기를 가지며, 연속적으로 이어져 있어함
// 하지만 자바스크립트에서의 배열은 연속적으로 이어져 있고 오브젝트와 유사함
// 자바스크립트의 배열은 일반적인 배열의 동작을 흉내낸 특수한 객체다
// 이걸 보완하기 위해서 타입이 정해져 잇는 타입 배열이 있음 (Typed Collections)
