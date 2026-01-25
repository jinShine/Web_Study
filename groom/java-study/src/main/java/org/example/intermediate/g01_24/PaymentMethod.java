package org.example.intermediate.g01_24;

/**
 * ============== OCP 위반 코드 : 결제 방법 클래스 ==============
 */

class PaymentProcessor {

  public boolean pay(String paymentType, int amount) {

    if (paymentType.equals("CARD")) {
      System.out.println("신용카드로 " + amount + "원 결제");
    } else if (paymentType.equals("CASH")) {
      System.out.println("현금으로 " + amount + "원 결제");
    } else {
      System.out.println("결제 방법을 선택해 주세요.");
      return false;
    }

    return true;
  }
}


/**
 * ============== OCP 준수 코드 : 결제 방법 클래스 ==============
 */

public abstract class PaymentMethod {
  protected String methodName;

  public PaymentMethod(String methodName) {
    this.methodName = methodName;
  }

  // 결제 처리 추상 메서드
  public abstract boolean pay(int amount);

  // 결제 취소 추상 메서드
  public abstract boolean cancel(int amount);

  public String getMethodName() {
    return this.methodName;
  }
}


class CardPaymentMethod extends PaymentMethod {
  public CardPaymentMethod(String methodString) {
    super(methodString);
  }

  @Override
  public boolean pay(int amount) {
    System.out.println(methodName + " 카드 결제 처리");
    return true;
  }

  @Override
  public boolean cancel(int amount) {
    System.out.println(methodName + " 카드 결제 취소 처리");
    return true;
  }
}


class CashPaymentMethod extends PaymentMethod {
  public CashPaymentMethod(String methodString) {
    super(methodString);
  }

  @Override
  public boolean pay(int amount) {
    System.out.println(methodName + " 현금 결제 처리");
    return true;
  }

  @Override
  public boolean cancel(int amount) {
    System.out.println(methodName + " 현금 결제 취소 처리");
    return true;
  }
}
