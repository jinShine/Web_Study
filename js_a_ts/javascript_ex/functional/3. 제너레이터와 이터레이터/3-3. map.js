const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

let names = [];
for (const p of products) {
  names.push(p.name);
}
// console.log(names);

const map1 = () => {
  let names = [];
  for (const p of products) {
    names.push(p.name);
  }
  return names;
};

// console.log(map1());

const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

const resultNames = map((p) => p.name, products);
console.log(resultNames);
const resultPrices = map((p) => p.price, products);
console.log(resultPrices);
