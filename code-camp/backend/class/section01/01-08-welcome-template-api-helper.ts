// Helpers

export const checkEmail = (email: string) => {
  if (!email || !email.includes("@")) {
    return false;
  }

  return true;
};

export const getWelcomeTemplate = ({
  name,
  age,
  school,
  createdAt,
}: {
  name: string;
  age: number;
  school: string;
  createdAt: string;
}) => {
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

export const sendTemplateToEmail = (email: string, template: string) => {
  console.log(email + "로 템플릿을 전송합니다.");
};

export const getToday = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return `${yyyy}-${mm}-${dd}`;
};
