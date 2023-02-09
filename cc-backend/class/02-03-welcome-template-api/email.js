import { getToday } from "./utils.js";

export function checkValidationEmail(email) {
  if (email === undefined || !email.includes("@")) {
    console.log("정확한 이메일 주소를 입력해주세요.");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({ name, age, school }) {
  return `
      <html>
          <body>
              <h1>${name}님 가입을 환영합니다.</h1>
              <hr />
              <div>이름: ${name}</div>
              <div>나이: ${age}살</div>
              <div>학교: ${school}</div>
              <div>가입일: ${getToday()}</div>
          </body>
      </html>
  `;
}

export function sendWelcomeTemplateToEmail(email, template) {
  // 템플릿을 이메일에 전송
  console.log(`${email}로 템플릿 ${template}를 전송합니다.`);
}
