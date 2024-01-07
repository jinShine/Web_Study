class Monster {
  // public, private, protected, readonly

  // protected: 상속 받은 애들까지 접근 가능, 바깥에서는 접근 불가
  // readonly: 바깥까지고 접근은 가능, 어디서든 변경은 불가
  // private readonly: 자기 자신 안에서 접근만 가능하고 변경은 불가
  constructor(public power: number) {
    this.power = power;
  }

  attack = () => {
    console.log(this.power + "로 공격하자");
  };
}

class FlyingMonster extends Monster {
  // protected는 상속받는애들까지 접근 가능
  constructor(power: number) {
    super(power);
  }

  attack2 = () => {
    console.log(this.power + "로 날개 공격하자");
  };
}

const monster1 = new Monster(50);
monster1.power = 2000; // private면 접근을 할 수 없다.
monster1.attack();

const monster2 = new FlyingMonster(100);
monster2.attack2();
