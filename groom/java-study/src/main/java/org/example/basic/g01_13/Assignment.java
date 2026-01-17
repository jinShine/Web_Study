package org.example.basic.g01_13;

import java.util.Scanner;

public class Assignment {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    System.out.println("첫번째 숫자를 입력하세요. :");
    double num1 = scanner.nextDouble();

    System.out.println("연산자를 입력하세요. (예 +, -, *, /, %) :");
    String operator = scanner.next();

    System.out.println("두번째 숫자를 입력하세요. :");
    double num2 = scanner.nextDouble();

    double result = 0;
    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
      default:
        System.out.println("잘못된 연산자입니다.");
        scanner.close();
        break;
    }

    System.out.println(num1 + " " + operator + " " + num2 + " = " + result);

    scanner.close();
  }
}
