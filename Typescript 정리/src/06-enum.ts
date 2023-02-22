enum StarbuksGrade {
  WELCOME,
  GREEN,
  GOLD,
}

enum StarbuksGrade2 {
  WELCOME = 0,
  GREEN = 1,
  GOLD = 2,
}

// 값 할당 가능
enum StarbuksGrade3 {
  WELCOME = "WELCOME",
  GREEN = "GREEN",
  GOLD = "GOLD",
}

function getDiscount(v: StarbuksGrade): number {
  switch (v) {
    case StarbuksGrade.WELCOME:
      return 0;
    case StarbuksGrade.GREEN:
      return 5;
    case StarbuksGrade.GOLD:
      return 10;
  }
}

console.log(StarbuksGrade);
console.log(StarbuksGrade["GOLD"]);
console.log(getDiscount(StarbuksGrade.GREEN));
