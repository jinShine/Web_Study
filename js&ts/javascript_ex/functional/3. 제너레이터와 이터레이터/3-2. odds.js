function* odds(a) {
  for (let i = 0; i < a; i++) {
    if (i % 2) {
      yield i;
    }
  }
}

let iter = odds(10);
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

console.log(...odds(10));
console.log([...odds(5), ...odds(10)]);

const [first, ...all] = odds(10);
console.log(first);
console.log(all);
