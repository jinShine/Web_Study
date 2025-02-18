import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./01-08-welcome-template-api-helper";

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
