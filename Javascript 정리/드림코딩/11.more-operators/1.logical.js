const obj1 = { name: "강아지" };
const obj2 = { name: "고양이" };

if (obj1 && obj2) {
  console.log("true");
}

// 이러한 조건문을 밖에서 쓰면!

let result = obj1 && obj2; // 앞에 조건이 truthy이면 뒤에를 표시 해라
console.log(result);

result = obj1 || obj2; // 앞에 조건이 falthy 뒤에를 표시해라
console.log(result);

// null 또는 undefined인 경우를 확인할때
// let item = { price: 1 };
let item;
const price = item && item.price;
console.log(price); // undefined

function print(message) {
  const text = message || "Hello"; // message는 undefined기 때문에 Hello를 출력
  console.log(text);
}
print();
