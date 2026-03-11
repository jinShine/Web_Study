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
