// 배열의 함수들
// 배열 자체를 변경하는지, 새로운 배열을 반환하는지 포인트를 두자

const fruits = ["🍌", "🍎", "🍇", "🍑"];

// 특정 오브젝트가 배열인지 체크
console.log(Array.isArray(fruits)); // true
console.log(Array.isArray({})); // false

// 특정한 아이템의 위치를 찾을때
console.log(fruits.indexOf("🍎"));

// 배열안에 특정한 아이템이 있는지 체크
console.log(fruits.includes("🍎"));

//////////////////////////////////////////////////
/*         기존의 배열 자체를 변경 함           */

// 추가
console.log(fruits.push("🥝")); // 맨 뒤에 추가
console.log(fruits.unshift("🥑")); // 맨 앞에 추가

// 제거
console.log(fruits.pop()); // 맨 뒤 제거
console.log(fruits.shift()); // 맨 앞 제거

// 중간에 추가 또는 삭제
fruits.splice(0, 1); // 배열 자체를 수정
console.log(fruits);
fruits.splice(0, 0, "🍈", "🥝");
console.log(fruits);

//////////////////////////////////////////////////
/*         새로운 배열을 만듬         */
// 기존 배열을 수정하지 않음

// 잘라진 새로운 배열을 만듬
let newArr = fruits.slice(0, 2);
console.log(newArr); // [ '🍈', '🥝' ]
console.log(fruits); // [ '🍈', '🥝', '🍎', '🍇', '🍑' ]

// 여러개의 배열을 붙여줌
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = arr1.concat(arr2);
console.log(arr3);

// 배열의 순서를 거꾸로
const arr4 = arr3.reverse();
console.log(arr4);

// 중첩 배열을 하나의 배열로 쫙 펴기
let arr5 = [
  [1, 2, 3],
  [4, [5, 6]],
];
console.log(arr5.flat(2)); // 인자값을 통해서 몇단계까지 Flat하게 만들지 적용

let arr6 = [1, 2, 3, 4, 5];
arr6.fill(0); // 기존 배열을 해당 인자값으로 채운다., 배열 자체를 수정
console.log(arr6); // [0, 0, 0 ,0, 0]

arr6.fill("X", 1, 4);
console.log(arr6); // [ 0, 'X', 'X', 'X', 0 ]

// 배열을 문자로 합하기
let text = arr6.join("/");
console.log(text);
