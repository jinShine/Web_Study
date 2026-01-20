package org.example.intermediate.g01_20;


public class Assignment {
  public static void main(String[] args) {
    StringBuilder sb2 = new StringBuilder("안녕하세요");
    sb2.insert(0, "버즈님");
    System.out.println(sb2.toString());
  }

  public static String toUpperCase(String str) {
    return str.toUpperCase();
  }

  public static String toLowerCase(String str) {
    return str.toLowerCase();
  }

  public static int length(String str) {
    return str.length();
  }

  public static String reverse(String s) {
    StringBuilder sb = new StringBuilder(s);
    return sb.reverse().toString();
  }

  // ═══════════════════════════════════════════════════════
  // 문자 세기 메서드
  // ═══════════════════════════════════════════════════════
  public static int countSpaces(String s) {
    int count = 0;
    for (char c : s.toCharArray()) {
      if (c == ' ')
        count++;
    }
    return count;
  }

  public static int countChar(String s, char target) {
    int count = 0;
    for (char c : s.toCharArray()) {
      if (c == target)
        count++;
    }
    return count;
  }
}
