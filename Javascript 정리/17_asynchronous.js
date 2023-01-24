// 자바스크립트에서 비동기 방식은 크게 3가지 방식이 존재한다.
// 1. 콜백함수(callback), 2. 프로미스(Promise), 3. async await

/* 
  1. 콜백함수 
*/

// 커피를 주문후 3초후에 커피가 준비되었다고 알려준다.
function order(coffee, callback) {
  console.log(`${coffee} 주문 접수`);

  setTimeout(() => {
    callback(coffee);
  }, 3000);
}
function display(result) {
  console.log(`${result} 준비 완료`);
}

order("아메리카노", display);

// 콜백지옥
function displayLetter() {
  console.log("A");
  setTimeout(() => {
    console.log("B");
    setTimeout(() => {
      console.log("C");
      setTimeout(() => {
        console.log("D");
        setTimeout(() => {
          console.log("STOP");
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}
// displayLetter();

/* 
  2. Promise

  성공(then)에게 보낸다 : resolve()
  실패(catch)에게 보낸다. : reject()

  사용법
  new Promise(resolve, reject);

  Promise의 상태
  1. pending : 대기 상태
  2. fulfilled : 성공하면 이행 상태
  3. rejected : 성공하지 못하면 거부 상태
*/

// 성공, 실패에 대한 결과값을 전달하는 제작코드(producing code)
const ASSAPPIZZA = true;
const pizza = new Promise((resolve, reject) => {
  if (ASSAPPIZZA) {
    resolve("피자를 주문 합니다.");
  } else {
    reject("피자를 주문하지 않습니다.");
  }
});

// 제작코드 작성 후 사용하는 소비코드(consuming code)를 작성해야한다.
// 성공이 왔을때 then(), 실패가 왔을때 catch(), 무조건 실행 finally()
pizza
  .then((result) => console.log(result))
  .catch((err) => console.log(err))
  .finally(() => console.log("완료"));

function whatsYourFavoritePromise() {
  let fav = "Javascript";
  return new Promise((resolve, reject) => resolve(fav));
}

function displaySubject(subject) {
  return new Promise((resolve, reject) => resolve(`Hello ${subject}`));
}

whatsYourFavorite().then(displaySubject).then(console.log);

async function mergePromise() {
  const response = await whatsYourFavorite();
  const result = await displaySubject(response);
  console.log(result);
}

/* 
  3. async, await

  사용법
  async function() {}
*/

async function displayHello() {
  console.log("Hello");
}
displayHello(); // Promise {<fulfilled>: undefined}

// Promise 타입이므로 .then, .catch. finally를 사용할 수 있다.

async function whatsYourFavorite() {
  let fav = "Javascript";
  return fav;
}

async function displaySubject(subject) {
  return `Hello, ${subject}`;
}

async function merge() {
  const response = await whatsYourFavorite();
  const result = await displaySubject(response);
  console.log(result);
}
merge();
