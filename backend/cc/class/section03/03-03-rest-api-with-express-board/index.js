import sendTokenToSMS, { checkPhone, getToken } from "./phone.js";
import express from "express";

const app = express();
app.use(express.json()); // 옛날에는 body-parser를 설치해서 사용했지만, 지금은 express에 내장되어 있음

app.get("/boards", (req, res) => {
  // 1. DB에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
  const result = [
    { number: 1, writer: "철수", title: "제목입니다", content: "내용입니다" },
    { number: 2, writer: "영희", title: "영희입니다", content: "영희입니다" },
    { number: 3, writer: "훈이", title: "훈이입니다", content: "훈이입니다" },
  ];

  // 2. DB에서 꺼내온 결과를 브라우저에 응답(response) 주기

  res.send(result);
});

app.post("/boards", (req, res) => {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log(req);
  console.log("==================");
  console.log(req.body);
  console.log("==================");

  // 2. DB에 접속 후, 데이터를 저장 => 데이터를 저장했다고 가정

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

app.listen(8080, () => {
  console.log("Listening to port 8080");
});
