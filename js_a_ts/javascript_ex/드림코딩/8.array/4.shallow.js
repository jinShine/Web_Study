// 객체는 메모리 주소를 전달하게 된다.

// 얕은복사(Shallow Copy)
// 자바스크립트에서 복사할때는 항상 얕은 복사가 이루어짐.

//  => 그래서 Array.from, concat, slice, spread(...), Object.assign 등을 사용하면 다른 주소로 복사가 이루어 진다.

const pizza = { name: "🍕", price: 2, owner: { name: "Ellie" } };
const ramen = { name: "🍜", price: 3 };
const sushi = { name: "🍣", price: 1 };

const store1 = [pizza, ramen];
const store2 = Array.from(store1);

console.log("store1 :", store1);
console.log("store2 :", store2);

store2.push(sushi);
console.log("store1 :", store1);
console.log("store2 :", store2);

pizza.price = 7; // 2 => 7로 변경됨
console.log("store1 :", store1);
console.log("store2 :", store2);
