import { getToken } from "./01-01-token";

// 안좋은 예
// function createTokenOfPhone(phone: string) {
//   // 1. 휴대폰 번호 맞는지 확인 (10 ~ 11 자리)
//   if (phone.length >= 10) {
//     if (phone.length <= 11) {
//       // 2. 인증번호 토큰 6자리 만들기
//       const token = getToken();
//       console.log(token);
//       // 3. 토큰 전송하기
//       console.log(phone + "번호로 인증번호" + token + "를 전송합니다.");
//     } else {
//       console.log("에러 발생! 핸드폰 번호를 제대로 입력해 주세요.");
//     }
//   } else {
//     console.log("에러 발생! 핸드폰 번호를 제대로 입력해 주세요.");
//   }
// }

// 좋은 예
function createTokenOfPhone(phone: string) {
  /////////////////////////////////////////
  // 먼저 에러인 경우들을 찾아서 위에 선언한다. (Early Exit)
  /////////////////////////////////////////
  // 1. 휴대폰 번호 맞는지 확인 (10 ~ 11 자리)
  if (phone.length < 10 || phone.length > 11) {
    console.log("에러 발생! 핸드폰 번호를 제대로 입력해 주세요.");
    return;
  }

  // 2. 인증번호 토큰 6자리 만들기
  const token = getToken();
  console.log(token);

  // 3. 토큰 전송하기
  console.log(phone + "번호로 인증번호" + token + "를 전송합니다.");
}

createTokenOfPhone("01012345678");
