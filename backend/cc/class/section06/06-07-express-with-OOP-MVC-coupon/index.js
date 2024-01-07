import express from "express";

import { CashService } from "./mvc/controller/services/cash.service.js";
import { ProductService } from "./mvc/controller/services/product.service.js";
import { ProductController } from "./mvc/controller/product.controller.js";
import { CouponController } from "./mvc/controller/coupon.controller.js";

const app = express();

// 상품API
const productController = new ProductController();
app.post("/products/buy", productController.buyProduct);
app.post("/products/refund", productController.refundProduct);

// 쿠폰(상품권)API
const couponController = new CouponController();
app.post("/coupons/buy", couponController.buyCoupon);

app.listen(8080, () => {
  console.log("Listening to port 8080");
});
