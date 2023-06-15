// Iterable 하다는건! 순회가 가능하다는 거!
// [Symbol.iterator](): Iterator;
// 심볼 정의를 가진 객체나, 특정한 함수가 Iterator를 리턴한다는것은 순회 가능한 객체다 라는걸 알 수 있음
// 순회가 가능하면 무엇을 할 수 있나? for...of, spread 등

const array = [1, 2, 3];
for (const item of array) {
  console.log(item); // 1, 2, 3
}

for (const item of array.entries()) {
  console.log(item); // 1, 2, 3
}

const iterator = array.values();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next().value); // 2

// 이런방식으로 for문의 내부를 비슷하게 만들어 볼 수 있다.
while (true) {
  const nextItem = iterator.next();
  if (nextItem.done) {
    break;
  }
  console.log(nextItem);
}
