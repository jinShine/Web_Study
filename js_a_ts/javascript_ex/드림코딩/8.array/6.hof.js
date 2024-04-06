const fruits = ["🍌", "🍎", "🍇", "🍑"];

// forEach
fruits.forEach((fruit, index, arry) => {
  // console.log(arry);
  console.log(`forEach:, ${index} : ${fruit}`);
});

console.log("------------------------------");

// find : 제일 먼저 조건에 맞는 아이템의 인덱스를 반환
const findResult = fruits.find((fruit) => {
  return fruit === "🍌";
});
console.log(findResult);

console.log("------------------------------");

const products = [
  { name: "마우스", stock: 10 },
  { name: "키보드", stock: 17 },
  { name: "모니터", stock: 0 },
  { name: "컴퓨터", stock: 13 },
  { name: "노트북", stock: 9 },
];

// some: 배열중에 부분적으로, 하나라도 조건에 맞는지 체크
someResult = products.some((product) => product.stock === 0);
console.log(someResult);

console.log("------------------------------");

// every: 배열중에 전부 조건에 맞는지 체크

everyResult = products.every((product) => product.stock === 0);
console.log(everyResult);

console.log("------------------------------");

// filter: 조건에 맞는 모든 아이템들을 새로운 배열로

filterResult = products.filter((product) => product.stock <= 10);
console.log(filterResult);

console.clear();

// map : 배열의 아이템들을 각각 다른 아이템으로 매핑할 수 있는, 변환해서 새로운 배열 생성
const nums = [1, 2, 3, 4, 5];
const mapResult = nums.map((item) => item * 2);
console.log(mapResult);

// flatmap :
const flatMapResult = ["dream", "coding"].flatMap((text) => text.split(""));
console.log(flatMapResult);
/**
 * [
  'd', 'r', 'e', 'a',
  'm', 'c', 'o', 'd',
  'i', 'n', 'g'
  ]
 */

// sort : 배열의 아이템들을 정렬
const texts = ["h1", "abc"];
texts.sort();
console.log(texts); // [ 'abc', 'h1' ]
const testNums = [1, 10, 5, 3, 2]; // sorting시 숫자를 조심해야한다.
testNums.sort();
console.log(testNums); // [ 1, 10, 2, 3, 5 ]
testNums.sort((a, b) => a - b); // a가 작다면 오름차순
console.log(testNums);

// reduce : 배열의 요소들을 접어서 접어서 값을 하나로!
const reduceResult = testNums.reduce((sum, value) => {
  sum += value;
  return sum;
}, 0);
console.log(reduceResult);
