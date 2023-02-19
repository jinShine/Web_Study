var score1 = 1;
let score2 = 2;
const score3 = 3;

// var의 스코프는 함수단위!
// function outer() {
//   var score = 0;

//   if (true) {
//     console.log("#1 : ", score);
//   }

//   for (var i = 0; i < 3; i++) {
//     setTimeout(function () {
//       console.log("#2 :", i);
//     }, 1000);
//   }

//   console.log("#3 : ", score);
// }
// outer();

// let, const의 스코프는 블록단위
function outer() {
  let score = 0;

  if (true) {
    console.log("#1 : ", score);
  }

  for (let i = 0; i < 3; i++) {
    setTimeout(function () {
      console.log("#2 :", i);
    }, 1000);
  }

  console.log("#3 : ", score);
}
outer();
