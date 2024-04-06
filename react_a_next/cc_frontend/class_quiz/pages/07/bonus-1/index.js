const classmates = [
  { name: "철수", age: 10, school: "토끼초등학교" },
  { name: "영희", age: 13, school: "다람쥐초등학교" },
  { name: "훈이", age: 11, school: "토끼초등학교" },
];

export default function Bonus1() {
  // 1
  let result1 = classmates
    .filter((el) => el.school === "토끼초등학교")
    .map((el) => {
      const newEl = el;
      newEl.candy = 10;
      return newEl;
    });

  console.log(result1);
  //   [
  //     {
  //         "name": "철수",
  //         "age": 10,
  //         "school": "토끼초등학교",
  //         "candy": 10
  //     },
  //     {
  //         "name": "훈이",
  //         "age": 11,
  //         "school": "토끼초등학교",
  //         "candy": 10
  //     }
  // ]

  // 2
  let result2 = classmates
    .filter((el) => el.school === "다람쥐초등학교")
    .map((el) => el.name + "어린이");

  console.log(result2);
  // [
  //   "영희어린이"
  // ]

  return <></>;
}
