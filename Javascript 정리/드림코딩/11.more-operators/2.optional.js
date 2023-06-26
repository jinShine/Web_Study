// 옵셔널 체이닝 연산자 Optional Chaning Operator
// ?.

// null 또는 undefined를 확인 할때

// let item = { name: "강아지", owner: { name: "버즈" } };
let item = { name: "강아지" };
const ownerName = item && item.owner && item.owner.name;
console.log(ownerName);

// ?. 있다면 접근, 없다면 undefined
const ownerName2 = item?.owner?.name;
console.log(ownerName2);
