package org.example.intermediate.g01_26;

public class Ex2 {
  public static void main(String[] args) {

  }
}


interface Flyable {
  void fly();
}


interface Swimable {
  void swim();
}


interface Runnable {
  void run();
}


class Duck implements Flyable, Swimable, Runnable {
  @Override
  public void fly() {
    System.out.println("날다");
  }

  @Override
  public void swim() {
    System.out.println("수영");
  }

  @Override
  public void run() {
    System.out.println("달리다");
  }
}
