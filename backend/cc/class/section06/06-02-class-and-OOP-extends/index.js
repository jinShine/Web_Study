const date = new Date();
console.log(date.getFullYear());
console.log(date.getMonth() + 1);
console.log(date.getDate());

class Monster {
  power;

  constructor(power = 20) {
    this.power = power;
  }

  attack = () => {
    console.log("공격하자 :", this.power);
  };

  run() {
    console.log("도망가자");
  }
}

const demon1 = new Monster();
demon1.attack();
demon1.run();

const demon2 = new Monster(50);
demon2.attack();
demon2.run();

class 공중몬스터 extends Monster {
  constructor(power) {
    super(power);
  }

  // 오버라이딩
  run() {
    console.log("공중 도망가자");
  }
}

const fDemon1 = new 공중몬스터(70);
fDemon1.attack();
fDemon1.run();
