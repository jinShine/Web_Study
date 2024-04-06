// Set
// 중복이 없는 데이터 집합체

const set1 = new Set(); // 빈 값을 전달해도 되지만
const set2 = new Set([1, 2, 3]); // 배열 전달도 가능하다.

console.log(set1);
console.log(set2);

// 사이즈
console.log(set2.size);

// 존재하는지 확인 (has)
console.log(set2.has(2));
console.log(set2.has(6));

// 순회
set2.forEach((value) => console.log(value));

// 추가
set2.add(6);
console.log(set2);
set2.add(6);
console.log(set2);

// 제거
set2.delete(6);
console.log(set2);

set2.clear();
console.log(set2);

const obj1 = { name: "사과", price: 8 };
const obj2 = { name: "바나나", price: 5 };
const objs = new Set([obj1, obj2]);
console.log(objs);

obj1.price = 10;
objs.add(obj1);
console.log("@@", objs);

// 퀴즈
const obj3 = { name: "바나나", price: 5 };
objs.add(obj3);
console.log(objs);
/**
 * ?????????????
 * 똑같아도 들어가네?????????
 Set(3) {
  { name: '사과', price: 10 },
  { name: '바나나', price: 5 },
  { name: '바나나', price: 5 }
}

  값을 보는게 아니라 메모리 주소가 동일한지 아닌지 판단하기 때문에
  obj2와 obj3이 동일한 객체더라도, 주소가 다르기 때문에 중복으로판단하지 않는다.
 */
