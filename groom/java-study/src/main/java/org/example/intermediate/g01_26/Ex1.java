package org.example.intermediate.g01_26;

public class Ex1 {
  public static void main(String[] args) {

    CreditCard creditCard = new CreditCard();
    creditCard.process();

    Cash cash = new Cash();
    cash.process();
  }
}


interface Processor {
  void process();
}


class CreditCard implements Processor {

  @Override
  public void process() {
    System.out.println("신용카드 결제");
  }
}


class Cash implements Processor {
  @Override
  public void process() {
    System.out.println("현금 결제");
  }
}
