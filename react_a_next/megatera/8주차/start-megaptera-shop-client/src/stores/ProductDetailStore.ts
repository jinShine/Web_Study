import { singleton } from "tsyringe";

import { Action, Store } from "usestore-ts";

import { ProductDetail, nullProductDetail } from "../types";

import { apiService } from "../services/apiService";

@singleton()
@Store()
export default class ProductDetailsStore {
  product: ProductDetail = nullProductDetail;

  loading = true;

  error = false;

  async fetchProduct({ productId }: { productId: string }) {
    this.startLoading();

    try {
      const product = await apiService.fetchProduct({ productId });
      this.setProduct(product);
    } catch {
      this.setError();
    }
  }

  @Action()
  private startLoading() {
    this.product = nullProductDetail;
    this.loading = true;
    this.error = false;
  }

  @Action()
  private setProduct(product: ProductDetail) {
    this.product = product;
    this.loading = false;
    this.error = false;
  }

  @Action()
  private setError() {
    this.product = nullProductDetail;
    this.loading = false;
    this.error = true;
  }
}
