function getWelcomeTemplate(
  name: string,
  age: number,
  school: string,
  createdAt: string
) {
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
}

getWelcomeTemplate("철수", 10, "다람쥐초등학교", "2025-01-01");
