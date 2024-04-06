const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) {
      res.push(a);
    }
  }
  return res;
};

const resultFilter = filter((p) => p.price < 20000, products);
console.log(resultFilter);
