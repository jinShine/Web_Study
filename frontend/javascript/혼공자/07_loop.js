/*
    반복문
      * 같은 동작을 여러 번 실행하기 위해 사용하는 문
    */

///////////////////////////////////////////// for /////////////////////////////////////////////
/*
    for (초기값; 조건; 증가식) { ... }

    초기값은 처음에 한 번만 할당하고 조건 체크와 명령 실행, 증가식을 계속 반복한다.
    */

const students = ["Park", "Kim", "Lee"];

for (let i = 0; i < students.length; i++) {
  console.log(students[i]);
}

/*
    배열명.forEach(콜백함수) { ... }

    for문과 forEach문 사이에 큰 차이는 없지만, 프로그램중에서 배열의 길이가 바뀌어 정확하게 배열의 크기를 알 수 없을때,
    또는 배열의 요소를 가져와서 함수를 실해해야 할 때 편하게 사용 가능
    */
students.forEach(function (student) {
  console.log(student);
});

/*
    for...in 문
    for...in문은 객체의 키만 가져올 수 있다.
    */
const book = {
  title: "자바스크립트 책",
  pages: 300,
};

for (key in book) {
  console.log(book[key]);
}

/*
    for...of 문
    for...of문은 forEach와 같다.
    */
for (student of students) {
  console.log(student);
}

///////////////////////////////////////////// while /////////////////////////////////////////////
/*
    while문과 do...while문

    while문은 조건이 참(true)인 동안 문장을 반복한다.

    while(조건) { 명령 }

    do {
      명령
    } while(조건)
    */

let count = 5;
while (count > 0) {
  console.log("#");
  count -= 1;
}

///////////////////////////////////////////// break, continue 문 /////////////////////////////////////////////
/*
    반복문은 반복문 횟수만큼 하지만, 조건에 따라 중간에 끝낼 수 있다.

    break : 조건이 되면 반복을 끝냄
    continue : 조건을 만났을때 실행하던 반복문장을 건너뛰고 다음 반복과정으로 넘어간다.
    */

const number = 5;
students.forEach((stu) => {
  if (stu === "Kim") {
    // break, continue; // forEach에서는 사용할 수 없다. (switch or for loop)
  }

  console.log(stu);
});

for (stu of students) {
  if (stu == "Kim") {
    break;
  }

  console.log("#", stu);
}

for (stu of students) {
  if (stu == "Kim") {
    continue;
  }

  console.log("&", stu);
}

// 피라미드
/*
 *
 **
 ***
 ****
 *****
 */
let input = 5;
let output = "";
for (let i = 0; i < 5; i++) {
  for (let j = 0; j <= i; j++) {
    output += "*";
  }

  output += "\n";
}

console.log(output);

/*
 *
 ***
 *****
 *******
 */
for (let i = 1; i < input; i++) {
  for (let j = input; j > i; j--) {
    output += " ";
  }

  for (let k = 0; k < 2 * i - 1; k++) {
    output += "*";
  }

  output += "\n";
}

console.log(output);
