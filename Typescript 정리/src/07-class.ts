interface User {
  name: string;
}

interface Product {
  id: string;
  price: number;
}

class Cart {
  protected user: User; // 자식에게는 열려있다.
  private store: object;

  constructor(user: User) {
    this.user = user;
    this.store = {};
  }

  // 생성자의 매개변수에 넣으면 줄여서 사용가능하다.
  // constructor(protected user: User, private store: object) {}

  put(id: string, product: Product) {
    this.store[id] = product;
  }
  get(id: string) {
    return this.store[id];
  }
}

class PromotionCart extends Cart {
  addPromotion() {}
}

const cartJohn = new Cart({ name: "john" });
cartJohn.user;
