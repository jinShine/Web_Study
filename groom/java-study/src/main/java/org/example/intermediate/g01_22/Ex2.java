package org.example.intermediate.g01_22;

// 결제 시스템
public class Ex2 {
  public static void main(String[] args) {

  }
}


abstract class Payment {
  protected int amount;

  public Payment(int amount) {
    this.amount = amount;
  }

  abstract void process();

  public void printReceipt() {
    System.out.println("결제 금액: " + amount + "원");
  }
}


class CashPayment extends Payment {
  private int receivedAmount;

  CashPayment(int amount, int receivedAmount) {
    super(amount);
    this.receivedAmount = receivedAmount;
  }

  @Override
  void process() {
    System.out.println("현금 결제");

    if (receivedAmount < amount) {
      System.out.println("결제 금액이 부족합니다.");
      return;
    }

    System.out.println("결제 완료");
  }
}


class CardPayment extends Payment {
  private String cardNumber;

  CardPayment(int amount, String cardNumber) {
    super(amount);
    this.cardNumber = cardNumber;
  }

  @Override
  void process() {
    System.out.println("카드 결제");
    System.out.println("카드 번호: " + cardNumber);
    System.out.println("결제 완료");
  }
}
