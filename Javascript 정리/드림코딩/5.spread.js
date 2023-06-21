// Spread 연산자, 전개구문
// 모든 Iterable은 Spread 될 수 있다.
// 순회가 가능한 모든 것들은 펼쳐질 수 있다.

// function(...iterable)
// [...iterable]
// { ...obj }

function add(a, b, c) {
  return a + b + c;
}
const nums = [1, 2, 3];
console.log(...nums);

add(num[0], num[1], num[2]);
console.log(add(...nums));

// Rest parameters
function sum(first, second, ...nums) {
  console.log("rest :", nums);
}

sum(1, 2, 7, 8, 9);

// Array concat
const testArray1 = [1, 2, 3];
const testArray2 = [6, 7, 8];
const testArray3 = [...testArray1, ...testArray2];
console.log(testArray3); // [1, 2, 3, 6, 7, 8];

// Object
const obj1 = { name: "test1", age: 30 };
const update = {
  ...obj1,
  job: "s/w engineer",
};
console.log(update);
