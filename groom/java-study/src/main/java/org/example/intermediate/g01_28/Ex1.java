package org.example.intermediate.g01_28;

import java.util.ArrayList;
import java.util.List;

public class Ex1 {
  public static void main(String[] agrs) {
    int pInt = 10;
    double pDouble = 10.0;
    boolean pBoolean = true;

    Integer wrapInt = 10;
    Double wrapDouble = 10.0;
    Boolean wrapBoolean = true;

    // 출력
    System.out.println("=== 기본형 ===");
    System.out.println("int: " + pInt);
    System.out.println("double: " + pDouble);
    System.out.println("boolean: " + pBoolean);

    System.out.println("\n=== Wrapper 클래스 ===");
    System.out.println("Integer: " + wrapInt);
    System.out.println("Double: " + wrapDouble);
    System.out.println("Boolean: " + wrapBoolean);

    // Wrapper 클래스의 메서드 사용
    System.out.println("\n=== Wrapper 메서드 ===");
    System.out.println("Integer의 타입: " + wrapInt.getClass().getName());
    System.out.println("int 최대값: " + Integer.MAX_VALUE);
    System.out.println("int 최소값: " + Integer.MIN_VALUE);
  }
}
