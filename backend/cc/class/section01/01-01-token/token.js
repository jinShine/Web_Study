function getToken() {
  return String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
}

console.log(getToken());
