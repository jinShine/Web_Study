/*
변수
  * 데이터를 담는 그릇
  * 예약어로 let, const가 존재한다.
  * 변경 가능성이 있으으면 변수, 그렇지 않다면 상수를 사용하자
*/

let name1 = "버즈";
const name2 = "버즈";

name1 = "버즈2"; // let은 재할당 가능
// name2 = "버즈2" // const 재할당 불가

/*
  ES6 이전에는 var 변수를 사용하였는데, 호이스팅 문제로 var 사용을 지양한다.
*/
var name3 = "버즈";
var name3 = "버즈2"; // var는 재할당 재선언이 가능
console.log(name3);

//////////////////////////
// 변수명

// 나쁜 예제
let audio1;
let audio2;

// 좋은 예제
let backgroundAudio;
let windAudio;

// 더 좋은 꿀팁
// 무엇인지를 먼저 나타내고 구체적인것으로 지어주면 더 좋다.
let audioBackground;
let audioWind;
