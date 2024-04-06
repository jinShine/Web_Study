const log = console.log;

// Array

// 키와 벨류로 접근하여
const arr = [1, 2, 3];
for (const a of arr) {
  log(a);
}

// 키를 가지고 벨류를 접근할 수 있다.
// 하지만 Set, Map은 키로 벨류를 접근할 수 없다.
console.log(arr[0]);

// Set
const set = new Set([5, 6, 7]);
for (const a of set) {
  log(a);
}
// Map
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
// Set, Map은 키로 벨류를 접근할 수 없다.
// 그렇기 때문에 ES6에서 for of 으로 바뀐 내부는
// for i++처럼 생기지 않았다는 것!
console.log(set[0]);

// for of가 어떻게 추상화 되어있는지 확인해보자

// # 이터레이블/이터레이터 프롵토콜
// - 이터러블:
//         - [Symbol.iterator]()를 실행했을때 이터레이터(iterator)를 리턴한다.
//         - Symbol.iterator 심볼을 속성으로 가지고 있고, 이터레이터 객체를 반환하는 객체를 뜻한다.
// - 이터레이터: { value, done } 객체를 리턴하는 next()를 가진 값

console.log(arr[Symbol.iterator]);

const iterator = arr[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());

// -- 다시 Array를 iterator로 보자면
const arrIterator = arr[Symbol.iterator]();
for (const a of arrIterator) {
  log(a);
}

// -- Set을 iterator로 보자면
const setIterator = set[Symbol.iterator]();
for (const a of setIterator) {
  log(a);
}

console.log("----------- 다시 정리 ------------");
// 다시 정리
// iterable 객체는 배열을 일반화한 객체
// for...of를 사용할 수 있다.

let range = { from: 1, to: 5 };
range[Symbol.iterator] = function () {
  return {
    current: this.from,
    last: this.to,
    next() {
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
};

for (const a of range) {
  console.log(a);
}
