const map1 = new Map();
const map2 = new Map([
  ["key1", "사과"],
  ["key2", "배"],
  ["key3", "딸기"],
]);

console.log(map2);

// 사이즈
console.log(map2.size);

// 존재 여부
console.log(map2.has("key2"));
console.log(map2.has("key3"));

// 순회
map2.forEach((value, key) => console.log(value, key));

// 찾기
map2.get("key2");

// 추가
map2.set("key5", "바나나");
console.log(map2);
map2.set("key5", "감");
console.log(map2);

// 삭제
map2.delete("key5");
console.log(map2);

// 전부삭제
map2.clear();
console.log(map2);

// Object와 Map의 차이점
// 거의 유사하지만, 사용 메서드가 조금 다르다.
