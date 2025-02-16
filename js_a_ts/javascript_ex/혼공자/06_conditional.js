/*
    조건문
      * 명령을 실행하기 위해 조건을 체크하는 statement
    */

///////////////////////////////////////////// if else /////////////////////////////////////////////
if (true) {
} else {
}

const date = new Date();
const hour = date.getHours(); // 현재 시간을 0 ~ 23 사이의 값을 출력

if (hour < 12) {
  console.log("오전 입니다.");
} else {
  console.log("오후 입니다.");
}

///////////////////////////////////////////// switch /////////////////////////////////////////////
/* 
    체크해야될 조건이 많으면 switch 문이 편하다.

     switch (조건)  {
       case 조건A:
         break
       default: // 생략 가능
         break
    }
    */

const inputData = 3;
switch (inputData) {
  case 2:
    console.log(2);
    break;
  case 3:
    break;
}
switch (inputData % 2) {
  case 0:
    console.log("짝수 입니다.");
    break;
  case 1:
    console.log("홀수 입니다.");
    break;
  default:
    console.log("숫자가 아닙니다.");
    break;
}

///////////////////////////////////////////// 삼항 연산자 /////////////////////////////////////////////
/* 
    (조건) ? true : false
    */

let x = 3;
let y = 5;

x < y ? console.log("참") : console.log("거짓");
