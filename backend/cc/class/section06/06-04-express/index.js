import express from "express";

const app = express();

// 상품 구매하기 API
app.post("/products/buy", (req, res) => {
  // 1. 가진돈 검증하는 코드
  // ...
  // 2. 판매 여부를 검증하는 코드
  // ...
  // 3. 상품 구매 코드
  // if (hasMoney) {
  //   res.send("상품 구매 완료");
  // }
});

// 상품 환불하기 API
app.post("/products/refund", (req, res) => {
  // 1. 판매 여부를 검증하는 코드
  // ...
  // 2. 상품 환불하는 코드
  // ...
});

app.listen(8080, () => {
  console.log("Listening to port 8080");
});
