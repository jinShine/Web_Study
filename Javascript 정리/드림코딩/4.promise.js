// 주어진 seconds(초)가 지나면 callback함수를 호출함
// 단, seconds가 0보다 작으면 에러를 던지자!

// function runInDelay(callback, seconds) {
//   if (!seconds || seconds < 0) {
//     throw new Error("초를 입력해주세요");
//   }

//   setTimeout(callback, seconds * 1000);
// }

// // runInDelay(() => console.log("실행되어라"), 2);
// runInDelay(() => console.log("실행되어라"), 0);

// Promise로 변경해보기

function runInDelay(seconds) {
  return new Promise((resolve, reject) => {
    if (!seconds || seconds < 0) {
      reject(new Error(""));
    }

    setTimeout(resolve, seconds * 1000);
  });
}

runInDelay(2)
  .then(() => console.log("타이머 끝!"))
  .catch(console.log)
  .finally(() => console.log("promise 끝"));
