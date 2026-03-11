// Symbol 심볼
// 유일한 키를 생성할 수 있음

const map = new Map();

const key1 = "key";
const key2 = "key";
map.set(key1, "Hello");
console.log(map.get(key2));
console.log(key1 === key2);

const sKey1 = Symbol("sKey");
const sKey2 = Symbol("sKey");
map.set(sKey1, "헬로오오오오오오");
console.log(map.get(key2));
console.log(sKey1 === sKey2); // false

// 동일한 이름으로 하나의 키를 사용하고 싶다면, Symbol.for
// 전역 심벌 레지스트리
const k1 = Symbol.for("key9");
const k2 = Symbol.for("key9");
console.log(k1 === k2); // true

// 같은 키라도 유일한 키를 타나내고 싶다면 Symbol()
// 동일한 이름으로 하나의 키를 사용하고 싶다면 Symbol.for()

console.log(Symbol.keyFor(k1));
console.log(Symbol.keyFor(sKey1));

const obj = { [k1]: "Hello", [Symbol("key11")]: 1 };
console.log(obj);
console.log(obj[k1]);
console.log(obj[Symbol("key11")]);
