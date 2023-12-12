function checkPhone(phone) {
  if (phone.length < 10 || phone.length > 11) {
    console.log("에러 발생!! 핸드폰 번호를 제대로 입력해 주세요!!!");
    return false;
  }

  return true;
}

function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart("6", "0");

  return result;
}

function sendTokenToSMS(phone, token) {
  console.log(phone + "번호로 인증번호 " + token + " 를 전송합니다.");
}

function createTokenOfPhone(phone) {
  // 1. 휴대폰번호 자릿수가 맞는지 확인하기 (10~11자리)
  const isValid = checkPhone(phone);
  if (!isValid) {
    return;
  }

  // 2. 인증번호 6자리(토큰) 만들기
  const token = getToken();

  // 3. 핸드폰 번호에 토큰 전송하기
  sendTokenToSMS(phone, token);
}

createTokenOfPhone("01099598910");
