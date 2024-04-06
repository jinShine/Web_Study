import { preProcessFile } from "typescript";

export default function Qqq() {
  // 타입 추론
  let aaa = "안녕하세요";
  let bbb = 3;

  // 타입 명시
  let ccc: string = "반갑";
  let ddd: string;
  ddd = "반갑습니다.";

  // 배열
  let fff: number[] = [1, 2, 3, 4, 5];
  let fff2: string[] = ["1", "2"];
  let fff3: (number | string)[] = [1, "1", "2"];
  console.log(fff3);

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
  profile.age = "8살";

  // 함수 => 어디서든 몇번이든 호출 가능하므로, 타입추론 할 수 없음(반드시, 타입명시 필요)
  const add = (number1: number, number2: number, unit: string): string => {
    return number1 + number2 + unit;
  };
  const result = add(1000, 2000, "원");
  console.log(result);

  // any 타입
  let aType: any = "123";
  aType = 123;
  aType = true;

  return <div></div>;
}
