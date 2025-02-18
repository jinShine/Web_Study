import express from "express";
import swaggerUi from "swagger-ui-express";

import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config";

const app = express();

// 미들웨어 설정

app.use(express.json()); // 바디 데이터 파싱을 위한 미들웨어 (옛날에는 bodyParser를 사용했다)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get("/boards", (req, res) => {
  console.log(req);
  // 1. DB에 접속 후 데이터를 조회
  const result = [
    {
      number: 1,
      title: "제목입니다 1",
      writer: "철수 1",
      date: "2025-01-01",
    },
    {
      number: 2,
      title: "제목입니다 2",
      writer: "철수 2",
      date: "2025-01-01",
    },
  ];

  // 2. DB에서 꺼내온 결과를 브라우저에 응답(response)로 주기
  res.send(result);
});

app.post("/boards", (req, res) => {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log(req.body);

  // 2. DB 접속 후, 데이터를 저장
  res.send("Hellow world");
});

app.post("/tokens/phone", (req, res) => {
  console.log(req.body);
  const phone = req.body.phone;

  const isValid = checkPhone(phone);
  if (!isValid) return;

  // 2. 인증번호 토큰 6자리 만들기
  const token = getToken();

  // 3. 토큰 전송하기
  sendTokenToSMS(phone, token);

  res.send("인증번호 전송 완료");
});

app.listen(3005, () => {
  console.log("서버가 켜졌어요!");
});

// Helpers

const checkPhone = (phone: string) => {
  if (phone.length < 10 || phone.length > 11) {
    return false;
  }

  return true;
};

const getToken = () => {
  const DIGIT = 6;
  const token = Math.floor(Math.random() * 10 ** DIGIT);

  return String(token).padStart(DIGIT, "0");
};

const sendTokenToSMS = (phone: string, token: string) => {
  console.log(phone + "번호로 인증번호" + token + "를 전송합니다.");
};
