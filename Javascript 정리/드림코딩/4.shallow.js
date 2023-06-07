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

/** 퀴즈 */

// 퀴즈1: 주어진 배열 안의 딸기 아이템을 키위로 교체하는 함수를 만들기
// 단, 주어진 배열을 수정하지 않도록!
// input: ['🍌', '🍓', '🍇', '🍓']
// output: [ '🍌', '🥝', '🍇', '🥝' ]

function replace(array, from, to) {
  const replaced = Array.from(array);

  const index = replaced.indexOf(from);
  replaced[index] = to;

  return replaced;
}
const result1 = replace(["🍌", "🍓", "🍇", "🍓"], "🍓", "🥝");
console.log(result1);

// 퀴즈2: 배열1, 배열2 두개의 배열을 전달받아,
// 배열1 아이템중 배열2에 존재하는 아이템만 담고 있는 배열 반환
// input: ['🍌', '🥝', '🍇'],  ['🍌', '🍓', '🍇', '🍓']
// output: [ '🍌', '🍇' ]

function match(input, search) {
  const result = [];

  for (let i = 0; i < input.length; i++) {
    if (search.includes(input[i])) {
      result.push(input[i]);
    }
  }

  return result;
}

const result2 = match(["🍌", "🥝", "🍇"], ["🍌", "🍓", "🍇", "🍓"]);
console.log(result2);
