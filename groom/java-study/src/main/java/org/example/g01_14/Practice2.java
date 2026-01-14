package org.example.g01_14;

public class Practice2 {
  public static void main(String[] args) {
    int day = 5;

    // ═══════════════════════════════════════════════════════
    // switch 문으로 요일 출력
    // ═══════════════════════════════════════════════════════
    String dayName;

    switch (day) {
      case 1:
        dayName = "월요일";
        break;
      case 2:
        dayName = "화요일";
        break;
      case 3:
        dayName = "수요일";
        break;
      case 4:
        dayName = "목요일";
        break;
      case 5:
        dayName = "금요일";
        break;
      case 6:
        dayName = "토요일";
        break;
      case 7:
        dayName = "일요일";
        break;
      default:
        dayName = "잘못된 입력";
    }

    System.out.println("오늘은 " + dayName + "입니다.");

    // ─────────────────────────────────────────────────────
    // 평일/주말 판단 (if 문)
    // ─────────────────────────────────────────────────────
    if (day >= 1 && day <= 5) {
      System.out.println("평일입니다. 열심히 공부하세요!");
    } else if (day == 6 || day == 7) {
      System.out.println("주말입니다. 푹 쉬세요!");
    } else {
      System.out.println("올바른 요일 번호를 입력하세요. (1-7)");
    }
  }
}
