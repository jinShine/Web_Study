const DIGIT = 6;

export const getToken = () => {
  // 6자리
  const token = Math.floor(Math.random() * 10 ** DIGIT);
  return String(token).padStart(DIGIT, "0");
};

// console.log(getToken());
// console.log(10 ** 3);
