package org.example.intermediate.g01_28;

public class Ex2 {
  public static void main(String[] agrs) {
    // ** 문자열 -> 숫자
    String strNum = "12345";
    String strDouble = "123.45";

    int num = Integer.parseInt(strNum);
    double pi = Double.parseDouble(strDouble);

    System.out.println("문자열 → 숫자");
    System.out.println("정수: " + num);
    System.out.println("실수: " + pi);

    // ** 숫자 -> 문자열
    int score = 95;
    double height = 175.5;

    String strScore = Integer.toString(score);
    String strHeight = Double.toString(height);

    System.out.println("\n숫자 → 문자열");
    System.out.println("점수: " + strScore);
    System.out.println("키: " + strHeight);

    // 진법 변환
    int decimal = 255;
    System.out.println("\n진법 변환 (255)");
    System.out.println("2진수: " + Integer.toBinaryString(decimal));
    System.out.println("8진수: " + Integer.toOctalString(decimal));
    System.out.println("16진수: " + Integer.toHexString(decimal));
  }
}
