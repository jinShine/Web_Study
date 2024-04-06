///////////////////////////////////////////// 클래스 /////////////////////////////////////////////

/*  
  자바스크립트는 다른 언어의 클래스와 다른개념
  생성자 함수를 좀 더 쉽게 바꾼 슈거(sugar)
*/

/*  
  클래스 선언 방법 

class 클래스 이름 {}
*/
class TestClass {}
const testClass = new TestClass(); //         인스턴스 객체라고 부른다.

/*  
  생성자(constructor)

  클래스가 생성될때 호출되는 생성자(constructor)함수가 존재한다.
*/

class TestClass1 {
  constructor() {
    // 생성자 코드
  }
}

class Student {
  constructor(이름, 국어, 영어, 수학, 과학) {
    this.이름 = 이름;
    this.국어 = 국어;
    this.영어 = 영어;
    this.수학 = 수학;
    this.과학 = 과학;
  }

  getSum() {
    return this.국어 + this.영어 + this.수학 + this.과학;
  }
  getAverage() {
    return this.getSum() / 4;
  }
}

const students = [];
students.push(new Student("구름", 87, 88, 99, 93));
students.push(new Student("버즈", 87, 38, 79, 83));
students.push(new Student("쩡", 83, 85, 96, 93));
students.push(new Student("지석", 81, 80, 99, 91));

students.forEach((student) => console.log(student.getAverage()));

/*  
  static 정적 프로퍼티, 메서드
*/

class Fruit {
  // 생성자 : new 키워드로 객체를 생성할때 호출되는 함수
  constructor(name, emoji) {
    this.name = name;
    this.emoji = emoji;
  }

  static makeRandomFruit() {
    return new Fruit("banana", "🍌");
  }

  display = () => {
    console.log(this.name);
    console.log(this.emoji);
  };
}

const banana = Fruit.makeRandomFruit();
console.log(banana);

/*  
  상속

  부모 객체의 프로퍼티나 메서드를 가져와서 사용할 수 있는것.
  자바스크립트에선 이러한 상속을 구현하기 위해서는 프로토타입(prototype)을 사용합니다.
  모든 객체는 프로토타입(prototype)을 가지고 있고, 프로토타입으로부터 프로퍼티와 메서드를 상속 받는다.

  class 클래스 이름 extends 부모클래스 이름 {}
*/

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(width, height) {
    super(width, height);
  }
}

let square = new Square(10, 20);
console.log(square.getArea());

//ex2
class Tiger {
  constructor(color) {
    this.color = color;
  }
  eat() {
    console.log("먹자!");
  }
  sleep() {
    console.log("잔다!");
  }
}

class Dog {
  constructor(color) {
    this.color = color;
  }
  eat() {
    console.log("먹자!");
  }
  sleep() {
    console.log("잔다!");
  }
  play() {
    console.log("논다!");
  }
}

class Animal {
  constructor(color) {
    this.color = color;
  }
  eat() {
    console.log("먹자!");
  }
  sleep() {
    console.log("잔다!");
  }
}

class Tiger2 extends Animal {}

const yellowTiger = new Tiger2("노랑");
yellowTiger.eat();
yellowTiger.sleep();
console.log(yellowTiger);

class Dog2 extends Animal {
  // 부모꺼도 가지고 와야된다.
  constructor(color, ownerName) {
    super(color);
    this.ownerName = ownerName;
  }

  play() {
    console.log("논다!");
  }

  eat() {
    console.log("강아지가 먹는다. (덮어쓰여짐 overriding)");
  }
}

const blueDog = new Dog2("블루", "버즈");
console.log(blueDog);
blueDog.play();
blueDog.eat();

/*  
  접근 제어자 (private, public)
  private 속성과 메서드

  class 클래스 이름 {
    #속성 이름
    #메서드 이름() {

    }
  }
*/

class RectangleBox1 {
  #length; // private를 사용하겠다고 미리 선언을 해야된다.

  constructor(length, height) {
    if (length <= 0) {
      throw "길이는 0보다 커야 합니다.";
    }

    this.#length = length;
    this.height = height;
  }

  get area() {
    return this.#length * this.height;
  }
}

const rectBox1 = new RectangleBox1(10, 5);
// rectBox1.length = 5; // 접근하여 값을 넣어도 변경되지 않는다.
// rectBox1.#length = 3; // 에러 발생, 접근하지 못함
rectBox1.height = 3;
console.log(rectBox1.area);

class Fruit1 {
  #name;

  constructor(name, emoji) {
    this.#name = name;
    this.emoji = emoji;
  }

  display = () => {
    console.log(this.#name);
    console.log(this.emoji);
  };
}

let orange = new Fruit1("orange", "🍊");
orange.name = "귤"; // name이 변경된다.
// 외부에서 변경이 불가하게 만들기 위해서 접근제어자를 사용한다.

console.log(orange);

// getter, setter
// 접근자 프로퍼티
class Person {
  #firstName;
  #lastName;

  constructor(firstName, lastName) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  fullName() {
    return `${this.#firstName}${this.#lastName}`;
  }

  get fullName2() {
    return `${this.#firstName}${this.#lastName}`;
  }

  set fullName2(value) {
    console.log(value);
  }
}

const per = new Person("김", "승진");
console.log(per.fullName());
console.log(per.fullName2); // get을 사용하면 프로퍼티처럼 사용할 수 있다.
per.fullName2 = "김버즈";

// 실습

// 1. 카운터를 만들기
// 0이상의 값으로 초기화 한 뒤 하나씩 숫자를 증가할 수 있는 카운터를 만들기
class Counter {
  #initValue;
  constructor(initValue) {
    if (isNaN(initValue) || initValue < 0) {
      this.#initValue = 0;
    } else {
      this.#initValue = initValue;
    }
  }

  get value() {
    return this.#initValue;
  }

  up() {
    return (this.#initValue += 1);
  }

  down() {
    return (this.#initValue -= 1);
  }
}

let counter = new Counter(0);
console.log(counter.up());
console.log(counter.up());
console.log(counter.down());

// 2. 정직원과 파트타임직원을 나타낼 수 있는 클래스를 만들어 보자
// 직원들의 정보: 이름, 부서이름, 한달 근무 시간
// 매달 직원들의 정보를 이용해서 한달 월급을 계산할 수 있다.
// 정직원은 시간당 10000원
// 파트타임 직원은 시간당 8000원

class Employee {
  #name;
  #department;
  #workingHours;
  #paymentPerHours;

  constructor(name, department, workingHours, paymentPerHours) {
    this.#name = name;
    this.#department = department;
    this.#workingHours = workingHours;
    this.#paymentPerHours = paymentPerHours;
  }

  calculatePay() {
    return this.#workingHours * this.#paymentPerHours;
  }
}

class FullTimeEmployee extends Employee {
  static #PAYMENT_PER_HOURS = 10000;

  constructor(name, department, workingHours) {
    super(name, department, workingHours, FullTimeEmployee.#PAYMENT_PER_HOURS);
  }
}

class PartTimeEmploy extends Employee {
  static #PAYMENT_PER_HOURS = 8000;

  constructor(name, department, workingHours) {
    super(name, department, workingHours, PartTimeEmploy.#PAYMENT_PER_HOURS);
  }
}

const buzz = new FullTimeEmployee("버즈", "웹 프론트팀", "50");
console.log(buzz.calculatePay());
