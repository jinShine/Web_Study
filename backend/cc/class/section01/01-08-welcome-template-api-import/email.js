import { getToday } from "./utils.js";

export function checkEmail(email) {
  if (email === undefined || !email.includes("@")) {
    console.log("에러발생!!!, 이메일 주소를 제대로 입력해 주세요");
    return false;
  }

  return true;
}

export function getWelcomeTemplate({ name, age, school }) {
  const myTemplate = `
    <html>
      <head>
      </head>
      <body>
        <h1>${name}님 가입을 환영합니다.</h1>
        </hr>
        <div>
          이름: ${name}
        </div>
        <div>
          나이: ${age}
        </div>
        <div>
          학교: ${school}
        </div>
        <div>
          가입일: ${getToday()}
        </div>
      </body>
    </html>
  `;

  return myTemplate;
}

export function sendTemplateToEmail(email, result) {
  console.log(email + "이메일로 가입환영템플릿" + result + " 를 전송합니다.");
}
