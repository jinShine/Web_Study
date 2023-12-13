// 구조분해 할당 예제
const profile = {
  name: "철수",
  age: 12,
  school: "다람쥐초등학교",
  createdAt: "2020-10-10",
};

const { name, school } = profile;

// 2. 객체 전달하기
function zzz(aaa) {
  const { name } = aaa;

  console.log(name);
}

zzz(profile);
