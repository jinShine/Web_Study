package org.example.basic.g01_15;

/**
 * 반복문
 */
public class Assignment {
  public static void main(String[] args) {
    System.out.println("╔════════════════════════════════════════╗");
    System.out.println("║         1 ~ 100 소수 찾기               ║");
    System.out.println("╚════════════════════════════════════════╝");

    int count = 0;

    for (int num = 2; num <= 100; num++) {
      boolean isPrime = true;

      // ─────────────────────────────────────────────────
      // 소수 판별: 2부터 √num까지 나눠봄
      // ─────────────────────────────────────────────────
      for (int i = 2; i <= Math.sqrt(num); i++) {
        if (num % i == 0) {
          isPrime = false;
          break; // 나눠지면 소수 아님, 더 볼 필요 없음
        }
      }

      // ─────────────────────────────────────────────────
      // 소수면 출력
      // ─────────────────────────────────────────────────
      if (isPrime) {
        System.out.printf("%4d", num);
        count++;

        // 10개마다 줄바꿈
        if (count % 10 == 0) {
          System.out.println();
        }
      }
    }

    System.out.println("\n\n총 " + count + "개의 소수가 있습니다.");
  }
}
