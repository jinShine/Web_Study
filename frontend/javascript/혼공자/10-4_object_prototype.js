///////////////////////////////////////////// 프로토타입(Prototype) /////////////////////////////////////////////

/* 
      자바스크립트의 모든 객체는 프로토타입을 가지고 있습니다.
      모든 객체는 프로토타입으로부터 속성과 메서드를 상속받습니다.
  
        * 객체 자료형 이름.prototype.메소드 이름 = function() { }
      */

Number.prototype.testNum = 10;
// const i = 1000;
let price = 33.22222;

let fixedPrice = price.toFixed(2);

Number.prototype.customPow = function (n) {
  return this.valueOf() ** n;
};

console.log("POWWWWWWWWW:", price.customPow(2));

Number.prototype.power = function (n) {
  return this.valueOf() ** n;
};

let pNum = 2;
console.log(pNum.power(2));
console.log(pNum.power(3));
console.log(pNum.power(4));

Number.prototype.isPrime = function (num) {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return num > 1;
};

console.log("##### isPrime", Number.prototype.isPrime(3));

String.prototype.contain = function (str) {
  return this.indexOf(str) >= 0;
};
Array.prototype.contain = function (data) {
  return this.indexOf(data) >= 0;
};

const a = "안녕하세요";
console.log(a.contain("안녕"));
console.log(a.contain("없"));

const b = [1, 2, 3, 4, 5];
console.log(b.contain(1));
console.log(b.contain(9));
