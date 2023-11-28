// 제너레이터 / 이터레이터
// - 제너레이터 : Iterator이자 Iterable을 생성하는 함수

// 순회할 것을 문장으로 표현할 수 있다.
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

// 제너레이터 함수를 호출하면 이터레이터가 반환된다.
let iter = gen();
console.log(iter.next());

// 자기 자신
iter[Symbol.iterator]() === iter; // true

for (const a of gen()) {
  console.log(a);
}
