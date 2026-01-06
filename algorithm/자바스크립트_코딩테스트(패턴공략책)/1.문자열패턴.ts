// ** 문자열 순서 뒤집기
// 방법 1: 내장 메서드 사용
function reverseString1(target: string) {
  const result = Array.from(target).reverse().join("");
  console.log(result);

  // ⭐️ 배열을 만드는 여러 방법들:
  // [...target];
  // Array.from(target);
  // target.split("");

  return result;
}
reverseString1("hello");

// 방법 2: 내림차순 반복문 사용
function reverseString2(target: string) {
  let result = "";

  for (let i = target.length - 1; i >= 0; i--) {
    result += target[i];
  }

  return result;
}
reverseString2("hello");

// ** 중복 제거
// 방법 1: Set 사용
function removeDuplicates(str: string) {
  const result = new Set([...str]);
  // ⭐️ Set을 배열로 변환하는 여러 방법들:
  // [...result];
  // Array.from(result);
  console.log([...result].join(""));
  return [...result].join("");
}
removeDuplicates("abcdeefgg");

// ** 문자열 압축
function compressString(str: string) {
  let result = "";
  let counter = 1;

  [...str].forEach((char, idx) => {
    if (char === str[idx + 1]) {
      counter++;
    } else {
      result += char + counter;
      counter = 1;
    }
  });

  if (result.length > str.length) {
    return str;
  }

  return result;
}

console.log(compressString("aabcccccaaa"));
console.log(compressString("aaabccdede"));
compressString("aabcccccaaa"); // a2b1c5a3
compressString("aaabccdede"); // aaabccdede -> 원형 문자열보다 길면 원형 문자열 반열
