const log = console.log;

const iterable = {
  [Symbol.iterator]() {
    let i = 3;

    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false };
      },
    };
  },
};

const iterator = iterable[Symbol.iterator]();
log(iterator.next());
log(iterator.next());
log(iterator.next());

const arr = [1, 2, 3];
const iter2 = arr[Symbol.iterator]();
iter2.next();
for (const a of iter2) {
  log(a);
}
