function getText<T>(text: T): T {
  return text;
}

const getText2 = <T>(text: T): T => {
  return text;
};

getText<number>(30);
getText2<string>("3");

function test1<T>(text: T): T {
  return text;
}
const text2 = <T>(text: T): T => {
  return text;
};

const enum Skill {
  FireBall,
  IceBall,
}

interface ProductDropdown {
  value: string;
  selected: boolean;
}

interface StockDropdown {
  value: string;
  selected: number;
}

// 위에 같은 interface를 해결하기 위해 공통적으로 사용할수 있는 제네릭 방식으로 사용 가능
interface Dropdown<T> {
  value: T;
  selected: boolean;
}

let product: Dropdown<string>;
let stock: Dropdown<number>;
let address: Dropdown<{ city: string; address: string }>;

// 타입 제약
// extends, keyof
function embraceEverything<T extends string | number>(thing: T): T {
  return thing;
}
embraceEverything("123");
// embraceEverything({key: "123"})
const ddd = <T extends { length: number }>(value: T): T => {
  return value;
};

ddd({ key: "123", length: 3 });
console.log(
  'ddd({ key: "123", length: 3 });: ',
  ddd({ key: "123", length: 3 })
);

function embraceEverything2<T extends keyof ProductDropdown>(value: T) {
  return value;
}

embraceEverything2("value");

type TestType = keyof { name: string; age: number };

const ddd5 = <T>(texts: T[]) => {};
