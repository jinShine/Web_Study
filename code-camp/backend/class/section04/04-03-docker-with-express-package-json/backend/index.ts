import express from "express";
import cors from "cors";

import nodemailer from "nodemailer";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/users", (req, res) => {
  console.log(req.body);

  const { name, age, school, email, createdAt } = req.body;

  // 1. 이메일이 정상인지 확인(1.존재여부, 2. @포함여부)
  const isValid = checkEmail(email);
  if (!isValid) return;

  // 2. 가입환영 템플릿 만들기

  const template = getWelcomeTemplate({ name, age, school, createdAt });

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, template);

  res.send("가입완료");
});

app.listen(3000);

const checkEmail = (email: string) => {
  if (!email || !email.includes("@")) {
    return false;
  }

  return true;
};

const getWelcomeTemplate = ({
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

const sendTemplateToEmail = async (email: string, template: string) => {
  console.log(email + "로 템플릿을 전송합니다.");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "seungjin429@gmail.com",
      pass: "whis!34679",
    },
  });

  const info = await transporter.sendMail({
    from: "seungjin429@gmail.com",
    to: email,
    subject: "가입환영 이메일",
    html: template,
  });

  console.log(info);
};

const getToday = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return `${yyyy}-${mm}-${dd}`;
};
