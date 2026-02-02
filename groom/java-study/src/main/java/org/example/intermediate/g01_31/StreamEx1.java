package org.example.intermediate.g01_31;

import java.util.ArrayList;
import java.util.List;

public class StreamEx1 {

  public static void main(String[] args) {
    Main main = new Main();
    main.sortByPrice();
  }

}

class Main {

  List<Product> products = new ArrayList<>();

  Main() {
    init();
  }

  private void init() {
    products.add(new Product("P001", "노트북", 1500000, "전자제품", 10));
    products.add(new Product("P002", "마우스", 30000, "전자제품", 50));
    products.add(new Product("P003", "키보드", 80000, "전자제품", 30));
    products.add(new Product("P004", "책상", 200000, "가구", 15));
    products.add(new Product("P005", "의자", 150000, "가구", 20));
    products.add(new Product("P006", "모니터", 400000, "전자제품", 25));
  }

  void sortByPrice() {
    System.out.println("==========가격순 정렬");
    products.sort((p1, p2) -> Double.compare(p1.getPrice(), p2.getPrice()));
    products.forEach(System.out::println);
  }
}

class Product {
  private String id;
  private String name;
  private double price;
  private String category;
  private int stock;

  public Product(String id, String name, double price, String category, int stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.stock = stock;
  }

  // Getters
  public String getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public double getPrice() {
    return price;
  }

  public String getCategory() {
    return category;
  }

  public int getStock() {
    return stock;
  }

  // Setters
  public void setPrice(double price) {
    this.price = price;
  }

  public void setStock(int stock) {
    this.stock = stock;
  }

  @Override
  public String toString() {
    return String.format("[%s] %s - %.2f원 (재고: %d)", id, name, price, stock);
  }
}
