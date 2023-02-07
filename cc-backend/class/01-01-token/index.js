function getToken(digit = 6) {
  const generationNumber = Math.floor(Math.random() * 10 ** digit);
  const result = String(generationNumber).padStart(digit, "0");
  console.log(result);
}

getToken(6);
