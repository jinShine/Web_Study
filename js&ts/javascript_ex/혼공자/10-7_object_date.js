// UTC(협정 세계시, 1970년 1월 1일 UTC 자정과의 시간 차이를 밀리초 단위로 표기)
console.log(new Date());
console.log(new Date("2023-06-11T03:02:00"));

console.log(Date.now());
console.log(Date.parse("2023-06-11T03:02:00"));

const now = new Date();
now.setFullYear(1991);
now.setMonth(2); // month는 0이 1월임
now.setDate(16);
console.log(now);

console.log(now.toString());
console.log(now.toDateString());
console.log(now.toISOString()); // ISO 8601 형식
console.log(now.toLocaleString("ko-KR"));
