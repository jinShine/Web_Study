import { CashService } from "./services/cash.service.js";
import { ProductService } from "./services/product.service.js";

export class ProductController {
  buyProduct = (req, res) => {
    // 1. 가진돈 검증하는 코드
    const cashService = new CashService();
    const hasMoney = cashService.checkValue();

    // 2. 판매 여부를 검증하는 코드
    const productService = new ProductService();
    productService.checkSoldout();

    // 3. 상품 구매 코드
    if (hasMoney && !isSoldout) {
      res.send("상품 구매 완료");
    }
  };

  refundProduct = (req, res) => {
    const productService = new ProductService();
    productService.checkSoldout();

    if (isSoldout) {
      res.send("상품 환불 완료!");
    }
  };
}
