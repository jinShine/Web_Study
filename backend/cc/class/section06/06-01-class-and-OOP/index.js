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
