function createUser({
  name,
  age,
  school,
  email,
  createdAt,
}: {
  name: string;
  age: number;
  school: string;
  email: string;
  createdAt: string;
}) {
  // 1. 이메일이 정상인지 확인(1.존재여부, 2. @포함여부)
  const isValid = checkEmail(email);
  if (!isValid) return;

  // 2. 가입환영 템플릿 만들기

  const template = getWelcomeTemplate({ name, age, school, createdAt });

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, template);
}

const name = "철수";
const age = 10;
const school = "다람쥐초등학교";
const email = "test@test.com";
const createdAt = "2025-01-01";

createUser({ name, age, school, email, createdAt });

// Helpers

const checkEmail = (email: string) => {
  if (!email || !email.includes("@")) {
    return false;
  }

  return true;
};

const getWelcomeTemplate = ({ name, age, school, createdAt }) => {
  return `  
    <html>
      <body>
        <h1>${name}님 가입을 환영합니다.</h1>
        <hr />
        <div>이름: ${name}</div>
        <div>나이: ${age}살</div>
        <div>학교: ${school}</div>
        <div>가입일: ${createdAt}</div>
      </body>
    </html>
  `;
};

const sendTemplateToEmail = (email: string, template: string) => {
  console.log(email + "로 템플릿을 전송합니다.");
};
