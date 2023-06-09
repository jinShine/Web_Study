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
