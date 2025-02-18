function createTokenOfPhone(phone: string) {
  const isValid = checkPhone(phone);
  if (!isValid) return;

  // 2. 인증번호 토큰 6자리 만들기
  const token = getToken();

  // 3. 토큰 전송하기
  sendTokenToSMS(phone, token);
}

createTokenOfPhone("01012345678");

// Helpers

export const checkPhone = (phone: string) => {
  return phone.length < 10 || phone.length > 11;
};

export const getToken = () => {
  const DIGIT = 6;
  const token = Math.floor(Math.random() * 10 ** DIGIT);

  return String(token).padStart(DIGIT, "0");
};

export const sendTokenToSMS = (phone: string, token: string) => {
  console.log(phone + "번호로 인증번호" + token + "를 전송합니다.");
};
