// 예외 처리 (Exception Handling)

package org.example.intermediate.g01_27;

public class Ex2 {
  public static void main(String[] args) {
    ThrowExample example = new ThrowExample();

    try {
      example.setAge(-1);
    } catch (IllegalArgumentException e) {
      System.out.println(e.getMessage());
    }

    DataValidation dataValidation = new DataValidation();
    try {
      dataValidation.validateEmail("adfaf.com");
      dataValidation.validatePassword("1234567");
    } catch (IllegalArgumentException e) {
      System.out.println(e.getMessage());
    }

  }
}

class ThrowExample {
  void setAge(int age) {
    if (age < 0) {
      throw new IllegalArgumentException("나이는 0이상이어야 합니다.");
    }

    System.out.println("나이는 " + age + "입니다.");
  }
}

class DataValidation {
  void validateEmail(String email) {
    if (email == null || !email.isEmpty()) {
      throw new IllegalArgumentException("이메일은 비어있을 수 없습니다.");
    }
    if (!email.contains("@")) {
      throw new IllegalArgumentException("올바른 이메일 형식이 아닙니다.");
    }
  }

  void validatePassword(String password) {
    if (password == null || password.length() < 8) {
      throw new IllegalArgumentException("비밀번호는 8자 이상이어야 합니다.");
    }
  }
}