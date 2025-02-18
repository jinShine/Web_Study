// 객체 구조분해할당
const profile = {
  name: "철수",
  age: 10,
  school: "다람쥐초등학교",
  createdAt: "2025-01-01",
};

const { name, age, school, createdAt } = profile;

// 배열 구조분해할당
const fruits = ["사과", "바나나", "딸기", "포도", "망고"];

const [apple, banana, strawberry, ...rest] = fruits;
