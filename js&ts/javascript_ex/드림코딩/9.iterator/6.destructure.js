// 구조 분해 할당 Destructuring Assignment
// 데이터 그룹화를 쉽게 만들 수 있다.

const fruits = ["사과", "배", "딸기", "바나나"];
const [first, second, ...others] = fruits;
console.log(first);
console.log(second);
console.log(others);

const [x, y, z = 0] = [1, 2];
console.log(x);
console.log(y);
console.log(z);

const buzz = { name: "buzz", age: 32, job: "s/w engineer" };
function display({ name, age, job }) {
  console.log("Name", name);
  console.log("Age", age);
  console.log("Job", job);
}
display(buzz);

const { name: nickname, age, job, pet = "몽실이" } = buzz;
console.log("Nickname", nickname);
console.log("Age", age);
console.log("Job", job);
console.log("Pet", pet);

// Quiz

const prop = {
  name: "Button",
  styles: {
    size: 20,
    color: "black",
  },
};

// color를 바로 가져오기
// const {name, styles: {size, color}} = props
function changeColor({ styles: { color } }) {
  console.log(color);
}

changeColor(prop);
