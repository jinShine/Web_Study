interface Person {
  name: string;
  say(message: string): void;
}

interface Programmer {
  writeCode(requirement: string): string;
}

class korean implements Person, Programmer {
  constructor(public name: string) {}

  say(message: string): void {
    console.log(message);
  }

  writeCode(requirement: string): string {
    return requirement + ".....";
  }
}

abstract class Korean implements Person {
  public abstract jumin: number;
  constructor(public name: string) {}

  say(message: string) {
    console.log(message);
  }

  abstract loveKimchi(): void;
}

class KoreanProgrammer extends Korean implements Programmer {
  constructor(public name: string, public jumin: number) {
    super(name);
  }

  say(message: string): void {
    console.log(message);
  }

  writeCode(requirement: string): string {
    console.log(requirement);
    return requirement;
  }

  loveKimchi(): void {}
}

const jay = new KoreanProgrammer("Buzz", 91);
