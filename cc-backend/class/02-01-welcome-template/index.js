// Template Literal
const apple = 3;

console.log("철수는 사과를" + apple + "개");
console.log(`철수는 사과를 ${apple}개`);

function getWelcomeTemplate(name, age, school, createAt) {
  const result = `
    <html>
      <body>
        <h1>${name}님 가입을 환영합니다!!</h1>
        <hr />
        <div>이름: ${name}</div>
        <div>나이: ${age}</div>
        <div>학교: ${school}</div>
        <div>가입일: ${createAt}</div>
      </body>
    </html>
  `;

  console.log(result);
}

const myName = "영희";
const myAge = 12;
const mySchool = "토끼초등학교";
const myCreatedAt = "2023-02-09";
getWelcomeTemplate(myName, myAge, mySchool, myCreatedAt);
