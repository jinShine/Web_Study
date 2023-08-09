// Nullish Coalescing Operator
// ?? : null과 undefined 일때만 체크!

// || falthy한 경우에 설정이 된다.
// 그렇기 때문에 에러가 발생하는 경우가 많다.
// falthy : 0, -0, "", null, undefined

let num = 0;
console.log(num || -1); // -1
console.log(num ?? -1); // 0

let test = null;
console.log(test ?? "null 일땐 내가짱");
