import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";

function createUser({ name, age, shcool, email }) {
  // 1. 이메일이 체크
  // 1-1. 존재 여부
  // 1-2. @포함 여부
  const isValid = checkEmail(email);
  if (!isValid) {
    return;
  }

  // 2. 가입환영 템플릿 만들기

  const myTemplate = getWelcomeTemplate({ name, age, shcool });

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, myTemplate);
}

const name = "철수";
const age = 8;
const shcool = "다람쥐초등학교";
const email = "buzz@gmail.com";

createUser({ name, age, shcool, email });
