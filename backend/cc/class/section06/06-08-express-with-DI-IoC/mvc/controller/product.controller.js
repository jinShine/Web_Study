export class ProductController {
  cashService;
  productService;

  constructor(cashService, productService) {
    this.cashService = cashService;
    this.productService = productService;
  }

  buyProduct = (req, res) => {
    // 1. 가진돈 검증하는 코드
    const hasMoney = this.cashService.checkValue();

    // 2. 판매 여부를 검증하는 코드
    this.productService.checkSoldout();

    // 3. 상품 구매 코드
    if (hasMoney && !isSoldout) {
      res.send("상품 구매 완료");
    }
  };

  refundProduct = (req, res) => {
    this.productService.checkSoldout();

    if (isSoldout) {
      res.send("상품 환불 완료!");
    }
  };
}
