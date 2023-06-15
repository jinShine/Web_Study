function makeIterable(initValue, maxValue, callback) {
  return {
    [Symbol.iterator]() {
      let init = initValue;
      return {
        next() {
          return { value: callback(init++), done: init > maxValue };
        },
      };
    },
  };
}

const multiple = makeIterable(0, 10, (n) => n * 2);

for (const num of multiple) {
  console.log(num);
}
