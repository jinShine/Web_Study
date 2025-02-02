const test = (text: string) => {
  const data = text.replace(/ /g, "").split("");

  const result = { alphabet: "", count: 0 };

  for (let i = 0; i < data.length; i++) {
    let alphabet = data[i];
    let count = 0;

    for (let j = 0; j < data.length; j++) {
      if (alphabet === data[j]) {
        count++;
      }
    }

    if (result.count < count) {
      result.alphabet = data[i];
      result.count = count;
    }
  }

  return result.alphabet;
};

const result = test("hello my name is dingcodingco");

console.log(result);
