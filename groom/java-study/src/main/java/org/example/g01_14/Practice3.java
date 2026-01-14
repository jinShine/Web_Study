package org.example.g01_14;

public class Practice3 {
  public static void main(String[] args) {
    // ═══════════════════════════════════════════════════════
    // 입력값과 정답
    // ═══════════════════════════════════════════════════════
    String inputId = "admin";
    String inputPassword = "1234";

    String correctId = "admin";
    String correctPassword = "admin123";

    if (inputId.equals(correctId) && inputPassword.equals(correctPassword)) {
      System.out.println("✅ 로그인 성공!");
    } else {
      System.out.println("❌ 로그인 실패!");
    }
  }
}
