package org.example.g01_14;

public class Practice1 {
  public static void main(String[] args) {
    int score = 85;
    char grade;
    String message;

    // ═══════════════════════════════════════════════════════
    // if-else if-else로 학점 계산
    // ═══════════════════════════════════════════════════════
    if (score >= 90) {
      grade = 'A';
      message = "우수합니다!";
    } else if (score >= 80) {
      grade = 'B';
      message = "좋습니다!";
    } else if (score >= 70) {
      grade = 'C';
      message = "보통입니다.";
    } else if (score >= 60) {
      grade = 'D';
      message = "노력이 필요합니다.";
    } else {
      grade = 'F';
      message = "재수강이 필요합니다.";
    }

    // ─────────────────────────────────────────────────────
    // 결과 출력
    // ─────────────────────────────────────────────────────
    System.out.println("╔════════════════════════════╗");
    System.out.println("║       성적 결과표           ║");
    System.out.println("╠════════════════════════════╣");
    System.out.println("║ 점수: " + score + "점");
    System.out.println("║ 학점: " + grade);
    System.out.println("║ 평가: " + message);
    System.out.println("╚════════════════════════════╝");
  }
}
