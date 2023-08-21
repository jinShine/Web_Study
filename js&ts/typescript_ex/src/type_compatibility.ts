type Captain = {
  name: string;
};

interface Antman {
  name: string;
}

let a1: Captain = {
  name: "캡틴",
};

let b1: Antman = {
  name: "앤트맨",
};

// 구조적 타이핑
// -> 타입 유형보다는 타입구조로 호환여부를 판별한다.
b1 = a1;
