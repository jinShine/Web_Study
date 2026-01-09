/**
 * 문자열 순서 뒤집기
 */
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

/**
 * 중복 제거
 */
function removeDuplicates(str: string) {
  const result = new Set([...str]);
  // ⭐️ Set을 배열로 변환하는 여러 방법들:
  // [...result];
  // Array.from(result);
  console.log([...result].join(""));
  return [...result].join("");
}
removeDuplicates("abcdeefgg");

/**
 * 문자열 압축
 */
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

/**
 * 가장 많이 등장하는 단어
 */
function mostCommonWord(str: string) {
  const words = str.toLowerCase().split(/\W+/);

  const wordsMap = new Map<string, number>();

  words.forEach((word) => {
    if (wordsMap.has(word)) {
      wordsMap.set(word, (wordsMap.get(word) ?? 0) + 1);
    } else {
      wordsMap.set(word, 1);
    }
  });

  const maxValue = Math.max(...wordsMap.values());
  return [...wordsMap].find(([key, value]) => value === maxValue)?.[0];
}

console.log(
  mostCommonWord("Hello world! this is a test string, hello hello test")
);

/**
 * 회문 (palindrome)
 * - 앞에서 읽어도 뒤에서 읽어도 같은 결과를 나타내는 문자열
 */

// 1. 방법: reverse
function isPalindromeWithReverse(str: string) {
  return str === [...str].reverse().join("");
}

console.log(isPalindromeWithReverse("level")); // true
console.log(isPalindromeWithReverse("soccer")); // false
console.log(isPalindromeWithReverse("abba")); // true

function isPalindromeWithLoop(str: string) {
  const length = str.length;

  const mid = Math.floor(length / 2);
  for (let i = 0; i < mid; i++) {
    if (str[i] !== str[length - 1 - i]) {
      return false;
    }
  }

  return true;
}

console.log(isPalindromeWithLoop("level")); // true
console.log(isPalindromeWithLoop("soccer")); // false
console.log(isPalindromeWithLoop("abba")); // true

/**
 * 애너그램
 * - 단어의 문자를 재배열하여 다른 단어를 만드는것
 * 예시)
 *    - listen, silent => true
 *    - mouse, moose => false
 */

function isAnagramWithSort(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  const sortedStr1 = [...str1].sort().join("");
  const sortedStr2 = [...str2].sort().join("");

  return sortedStr1 === sortedStr2;
}

console.log("isAnagramWithSort", isAnagramWithSort("listen", "silent"));
console.log("isAnagramWithSort", isAnagramWithSort("mouse", "moose"));

function isAnagramWithMap(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  const charMap = new Map<string, number>();

  for (let char of str1) {
    if (charMap.has(char)) {
      charMap.set(char, (charMap.get(char) || 0) + 1);
    } else {
      charMap.set(char, 1);
    }
  }

  for (let char of str2) {
    if ((charMap.has(char) && charMap.get(char)) || 0 > 0) {
      charMap.set(char, (charMap.get(char) || 0) - 1);
    } else {
      // charMap에 없거나 value가 0이면 애너그램이 아니다!
      return false;
    }
  }

  return true;
}

console.log("isAnagramWithMap", isAnagramWithMap("listen", "silent"));
console.log("isAnagramWithMap", isAnagramWithMap("mouse", "moose"));

/**
 * 재정렬
 *  - 숫자와 소문자 알파벳 a-z로 이루어진 한쌍 (예 "1a")
 *    각단어의 두번째 문자의 알파벳 순서로 정렬하는 기능을 구현하래
 *  예)
 *    - "3d, 1c, 5f, 7h, 2a, 4e, 6g" -> "2a, 1c, 3d, 4e, 5f, 6g, 7h"
 *    - "3d, 1a, 5e, 7d, 2a, 4c, 6b" -> "1a, 2a, 6b, 4c, 3d, 7d, 5e"
 */

function strToInt(str: string) {
  const words = str.split(", ");

  const result = words
    .map((word) => ({ word, letter: word[1] }))
    .sort((a, b) => a.letter.localeCompare(b.letter))
    .map((obj) => obj.word)
    .join(", ");

  return result;
}

console.log(strToInt("3d, 1c, 5f, 7h, 2a, 4e, 6g"));
console.log(strToInt("3d, 1a, 5e, 7d, 2a, 4c, 6b"));
