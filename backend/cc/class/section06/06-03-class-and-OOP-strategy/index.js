class 공중부품 {
  run = () => {
    console.log("날라서 도망가자");
  };
}

class 지상부품 {
  run = () => {
    console.log("뛰어서 도망가자");
  };
}

class Monster {
  부품;

  constructor(부품) {
    this.부품 = 부품;
  }

  attack = () => {
    console.log("공격하자");
  };

  run() {
    this.부품.run();
  }
}

const demon1 = new Monster(new 공중부품());
demon1.attack();
demon1.run();

const demon2 = new Monster(new 지상부품());
demon2.attack();
demon2.run();
