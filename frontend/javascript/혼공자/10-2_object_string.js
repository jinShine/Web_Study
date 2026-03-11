`use strict`;
/* String 객체 */

// trim()
// 양쪽 끝의 공백 없애기
const str1 = "        안녕     하세요   ";
console.log(str1.trim()); // 안녕     하세요
const str2 = "      안녕하세요";
console.log(str2.trim()); // 안녕하세요

// split()
// 특정 문자로 잘라서 배열을 만들어 리턴
const str3 = "한국, 가나, 포르투갈, 우루과이";
let splited = str3.split(",");
console.log(splited);

// length
// 문자열 길이
const str4 = "안녕하세요";
console.log(str4.length); // 5

// indexOf()
const str5 = "안녕하세요";
console.log(str5.indexOf("요")); // 4

// replace(문자열1, 문자열2)
// 문자열1을 찾아 문자열2로 교체
// 한번만 적용
const str6 = "Welcome jeju jeju jeju";
console.log(str6.replace("jeju", "seoul")); // Welcome seoul jeju jeju

// toUpperCase 대문자로 변경, toLowerCase 소문자로 변경
str6.toUpperCase();
str6.toLowerCase();

// charAt()
// 특정 위치의 문자 접근
console.log(str6.charAt(3)); // c

// startWith() : 매개변수 값으로 문자열이 시작하는 체크
// endtWith() : 매개변수 값으로 문자열이 끝나는지 체크
// include() : 매개변수 값으로 특장 문자열이 포함되었는지 체크
console.log(str6.includes("jeju")); // true

// substring() : 시작위치, 끝 위치의 직전까지 리턴
console.log(str6.substring(0, 5)); // Welco

const textObj = new String("Hello World");
const ttt = "Hello World";
ttt[0];
ttt.charAt(0);
ttt[1];
ttt.charAt(1);
console.log(ttt.indexOf("l"));
console.log(ttt.indexOf("a")); // 없으면 -1
console.log(ttt.includes("a")); // false
console.log(ttt.substring(0, 2)); // He
console.log(ttt.slice(2));
console.log(ttt.slice(-5));
console.log(ttt.slice(2, 5));
