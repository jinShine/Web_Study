package org.example.basic;

public class FinalTest {
  public static void main(String[] args) {
    problem1();
    problem2();
    problem3();
    // problem4();
    problem5();
  }

  static void problem1() {
    System.out.println("----------- problem1 -----------");

    int a = 5;
    int b = a++;
    int c = ++a;

    System.out.println("a = " + a); // 7
    System.out.println("b = " + b); // 5
    System.out.println("c = " + c); // 7
  }

  static void problem2() {
    System.out.println("----------- problem2 -----------");

    int x = 7;
    int y = 2;

    int result1 = x / y;
    double result2 = x / y;
    double result3 = (double) x / y;

    System.out.println("result1 = " + result1);
    System.out.println("result2 = " + result2);
    System.out.println("result3 = " + result3);
  }

  static void problem3() {
    System.out.println("----------- problem3 -----------");

    int n = 5;

    if (n > 3 || ++n > 10) {
      System.out.println("조건 만족");
    }
    System.out.println("n = " + n);

    int m = 5;

    if (m < 3 || ++m > 10) {
      System.out.println("조건 만족");
    }
    System.out.println("m = " + m);
  }

  static void problem4() {
    System.out.println("----------- problem4 -----------");

    int[] arr = {2, 4, 6, 8, 10};
    int sum = 0;

    for (int i = 1; i <= arr.length; i++) {
      if (i % 2 == 0) {
        continue;
      }
      sum += arr[i];
    }

    System.out.println("sum = " + sum); // ArrayIndexOutOfBoundsException 에러 발생
  }

  static void problem5() {
    System.out.println("----------- problem5 -----------");

    int[] original = {1, 2, 3, 4, 5};
    int[] copy = original;

    copy[0] = 100;

    int[] another = new int[original.length];
    for (int i = 0; i < original.length; i++) {
      another[i] = original[i];
    }

    another[1] = 200;

    System.out.println("original[0] = " + original[0]);
    System.out.println("original[1] = " + original[1]);
    System.out.println("copy[0] = " + copy[0]);
    System.out.println("another[1] = " + another[1]);

    System.out.println("original == copy : " + (original == copy));
    System.out.println("original == another : " + (original == another));
  }
}
