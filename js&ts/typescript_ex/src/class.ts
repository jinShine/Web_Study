function FPerson(name, age) {
  this.name = name;
  this.age = age;
}

FPerson.prototype.sayHi = () => {
  console.log("Hi");
};

class CPerson {
  name: string;
  age: number;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHi() {
    console.log("Hi");
  }
}

const fPerson = new FPerson("fBuzz", 32);
const cPerson = new CPerson("cBuzz", 32);

class Developer extends CPerson {
  skill: string;

  constructor(name: string, age: number, skill: string) {
    super(name, age);
    this.skill = skill;
  }

  coding() {
    console.log("Coding...", this.skill);
  }
}

class WatherPurifier {
  private waterAmount: number;

  constructor(waterAmount: number) {
    this.waterAmount = waterAmount;
  }

  wash() {
    if (this.waterAmount > 0) {
      console.log("정상");
    } else {
      console.log("오류");
    }
  }
}

const machine1 = new WatherPurifier(30);
machine1.wash(); // 정상
//machine1.waterAmount = 0; // 이렇게 접근해서 오작동을 일으키면 안좋겠지
//machine1.wash(); // 오류
