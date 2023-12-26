import sendTokenToSMS, { checkPhone, getToken } from "./phone.js";
import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import { Board } from "./models/board.model.js";

const app = express();

app.use(cors());
app.use(express.json()); // 옛날에는 body-parser를 설치해서 사용했지만, 지금은 express에 내장되어 있음
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get("/boards", async (req, res) => {
  // 1. DB에 접속 후, 데이터를 조회
  const result = await Board.find();

  // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 주기
  res.send(result);
});

app.post("/boards", async (req, res) => {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log("==================");
  console.log(req.body);
  console.log("==================");

  const { writer, title, content } = req.body;

  // 2. DB에 접속 후, 데이터를 저장
  const board = new Board({ writer, title, content });
  await board.save();

  // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
  res.send("게시물 등록에 성공하였습니다.");
});

app.post("/tokens/phone", (req, res) => {
  const { phone } = req.body;

  const isValid = checkPhone(phone);
  if (!isValid) {
    return;
  }

  // 2. 인증번호 6자리(토큰) 만들기
  const token = getToken();

  // 3. 핸드폰 번호에 토큰 전송하기
  sendTokenToSMS(phone, token);

  res.send("인증완료");
});

app.post("/users", (req, res) => {
  const { name, age, school, email } = req.body;
  // 1. 이메일이 체크
  // 1-1. 존재 여부
  // 1-2. @포함 여부
  const isValid = checkEmail(email);
  if (!isValid) {
    return;
  }

  // 2. 가입환영 템플릿 만들기

  const myTemplate = getWelcomeTemplate({ name, age, school });

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, myTemplate);

  res.send("가입완료");
});

mongoose.set("debug", true);

mongoose
  .connect("mongodb://db:27017/dbtest") // docker-compose.yml에 있는 db 이름 (네임리졸루션)
  .then(() => console.log("DB Connected"))
  .catch(() => console.log("DB Connection Error"));

app.listen(8080, () => {
  console.log("Listening to port 8081");
});
