// 타입을 정의
// 기본적인 정의만 작성한다.

interface TV {
  turnOn(): void;
  turnOff(): void;
}

const myTV: TV = {
  turnOn() {
    console.log("티비 켜짐");
  },
  turnOff() {
    console.log("티비 꺼짐");
  },
};

function tryTurnOn(tv: TV) {
  tv.turnOn();
}

tryTurnOn(myTV);

interface Cell {
  row: number;
  col: number;
  piece: PictureInPictureEvent;
}
