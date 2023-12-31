import express from "express";

import { CashService } from "./cash.js";
import { ProductService } from "./product.js";
import { ProductController } from "./mvc/controller/product.controller.js";

const app = express();

const productController = new ProductController();

// 상품 구매하기 API
app.post("/products/buy", productController.buyProduct);

// 상품 환불하기 API
app.post("/products/refund", productController.refundProduct);

app.listen(8080, () => {
  console.log("Listening to port 8080");
});
