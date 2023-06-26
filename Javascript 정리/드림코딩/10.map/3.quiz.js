// 주어진 배열에서 중복을 제거 하라
const fruits = ["🍌", "🍎", "🍇", "🍌", "🍎", "🍑"];
//  ['🍌', '🍎', '🍇', '🍑']

const fruitsSet = new Set(fruits);
console.log(fruitsSet);

function removeDuplication(array) {
  return [...new Set(array)];
}
console.log(removeDuplication(fruitsSet) === removeDuplication(fruitsSet));
// console.log(removeDuplication(fruitsSet));
// console.log(removeDuplication(fruitsSet));

// 주어진 두 세트의 공통된 아이템만 담고 있는 세트 만들어라
const set1 = new Set([1, 2, 3, 4, 5]);
const set2 = new Set([1, 2, 3]);
const set3 = new Set([...set1, ...set2]);
console.log(set3);

function findIntersection(set1, set2) {
  return [...new Set([...set1, ...set2])];
}

console.log(findIntersection(set1, set2));
