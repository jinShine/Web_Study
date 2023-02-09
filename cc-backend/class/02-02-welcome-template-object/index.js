// 구조분해할당
function getWelcomeTemplate({ name, age, school, createdAt }) {
  const result = `
    <html>
      <body>
        <h1>${name}님 가입을 환영합니다!!</h1>
        <hr />
        <div>이름: ${name}</div>
        <div>나이: ${age}</div>
        <div>학교: ${school}</div>
        <div>가입일: ${createdAt}</div>
      </body>
    </html>
  `;

  console.log(result);
}

const myUser = {
  name: "영희123123123",
  ge: 12,
  school: "토끼초등학교",
  createdAt: "2023-02-09",
};

getWelcomeTemplate(myUser);
