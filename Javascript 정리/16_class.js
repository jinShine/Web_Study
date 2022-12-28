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

/*  
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
