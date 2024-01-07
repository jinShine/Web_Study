import express from "express";

import { CashService } from "./mvc/controller/services/cash.service.js";
import { ProductService } from "./mvc/controller/services/product.service.js";
import { ProductController } from "./mvc/controller/product.controller.js";
import { CouponController } from "./mvc/controller/coupon.controller.js";

const app = express();

/** 의존성주입 장점
 *
 * 1. new 한번으로 모든 곳에서 재사용 가능
 * 2. 의존성 주입으로 몽땅 한꺼번에 변경 가능
 */
const cashService = new CashService();
const productService = new ProductService();

// 상품API
const productController = new ProductController(cashService, productService);
app.post("/products/buy", productController.buyProduct);
app.post("/products/refund", productController.refundProduct);

// 쿠폰(상품권)API
const couponController = new CouponController(cashService);
app.post("/coupons/buy", couponController.buyCoupon);

app.listen(8080, () => {
  console.log("Listening to port 8080");
});
