import express from "express";
import cors from "cors";

import coolsms from "coolsms-node-sdk";

const mysms = new coolsms(
  "NCS8PYI4LUL8NZAT",
  "0PD5NM9IO1G2YL2VBQQDWFLV9BVOSGWH"
);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/boards", (req, res) => {
  res.send("Hellow world");
});

app.post("/tokens/phone", (req, res) => {
  console.log(req.body);
  const phone = req.body.phone;

  const isValid = checkPhone(phone);
  if (!isValid) return;

  const token = getToken();
  sendTokenToSMS(phone, token);

  res.send("인증코드 발송완료");
});

app.listen(3000);

const sendTokenToSMS = async (phone: string, token: string) => {
  const result = await mysms.sendOne({
    to: phone,
    from: "01099598910",
    text: `[코드캠프] 인증번호는 ${token}입니다.`,
    autoTypeDetect: true,
  });

  console.log(result);
};

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
