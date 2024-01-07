let aaa = "안녕하세요";
// aaa = 3;

let bbb: number | string = 3;
bbb = "안녕";

let ccc: boolean = true;
ccc = false;

// 배열
let ddd: number[] = [1, 2, 3];
let eee: (string | number)[] = ["1", 2, "3", "4", 5, 6];

// 객체
interface IProfile {
  name: string;
  age: number | string;
  school: string;
  hobby?: string;
}

const profile: IProfile = {
  name: "철수",
  age: 8,
  school: "다람쥐초등학교",
};

// 함수
function add(a: number, b: number): number {
  return a + b;
}
