// 예외 처리 (Exception Handling)

package org.example.intermediate.g01_27;

import java.io.FileReader;
import java.io.IOException;

public class Ex1 {
  public static void main(String[] args) {

    try {
      int result = 10 / 0;
    } catch (ArithmeticException e) {
      System.out.println("0으로 나눌 수 없습니다. 기본값 0을 사용합니다.");
    }

    System.out.println("프로그램이 죽지 않고 계속 실행된다.");

    // IOException 예외 처리
    // Checked Exception이기 때문에 반드시 try, catch 문으로 처리해야 한다.
    try {
      FileReader reader = new FileReader("test.txt");
    } catch (IOException e) {
      System.out.println("파일을 찾을 수 없습니다.");
    }

  }
}
