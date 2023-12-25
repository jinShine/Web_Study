import "dotenv/config";
import coolsms from "coolsms-node-sdk";

const sms = coolsms.default;

export function checkPhone(phone) {
  if (phone.length < 10 || phone.length > 11) {
    console.log("에러 발생!! 핸드폰 번호를 제대로 입력해 주세요!!!");
    return false;
  }

  return true;
}

export function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart("6", "0");

  return result;
}

console.log(process.env.COOLSMS_API_KEY, process.env.COOLSMS_API_SECRET_KEY);

export default function sendTokenToSMS(phone, token) {
  const messageService = new sms(
    process.env.COOLSMS_API_KEY,
    process.env.COOLSMS_API_SECRET_KEY
  );

  messageService.sendOne({
    to: phone,
    from: "01099598910",
    text: `[버즈] 인증번호 ${token} 입니다.`,
  });

  console.log(phone + "번호로 인증번호 " + token + " 를 전송합니다.");
}
