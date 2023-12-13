function checkEmail(email) {
  if (email === undefined || !email.includes("@")) {
    console.log("에러발생!!!, 이메일 주소를 제대로 입력해 주세요");
    return false;
  }

  return true;
}

function getWelcomeTemplate({ name, age, school, createdAt }) {
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
          가입일: ${createdAt}
        </div>
      </body>
    </html>
  `;

  return myTemplate;
}

function sendTemplateToEmail(email, result) {
  console.log(email + "이메일로 가입환영템플릿" + result + " 를 전송합니다.");
}

function createUser({ name, age, shcool, email, createdAt }) {
  // 1. 이메일이 체크
  // 1-1. 존재 여부
  // 1-2. @포함 여부
  const isValid = checkEmail(email);
  if (!isValid) {
    return;
  }

  // 2. 가입환영 템플릿 만들기

  const myTemplate = getWelcomeTemplate({ name, age, shcool, createdAt });

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, myTemplate);
}

const name = "철수";
const age = 8;
const shcool = "다람쥐초등학교";
const email = "buzz@gmail.com";
const createdAt = "2020-10-10";

createUser({ name, age, shcool, email, createdAt });
