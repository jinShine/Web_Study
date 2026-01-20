package org.example.intermediate.g01_19;

class Student {
  String name;
  int studentId;
  int[] scores;

  Student(String name, int studentId) {
    this.name = name;
    this.studentId = studentId;
    this.scores = new int[3];
  }

  public void setScore(int korean, int english, int math) {
    this.scores[0] = korean;
    this.scores[1] = english;
    this.scores[2] = math;
  }

  // 총점 계산
  public int getTotal() {
    int sum = 0;
    for (int score : scores) {
      sum += score;
    }
    return sum;
  }

  // 평균 계산
  public double getAverage() {
    return (double) getTotal() / scores.length;
  }

  // 성적표 출력
  public void printReport() {
    System.out.println("=== 성적표 ===");
    System.out.println("학번: " + studentId);
    System.out.println("이름: " + name);
    System.out.println("국어: " + scores[0] + ", 영어: " + scores[1] + ", 수학: " + scores[2]);
    System.out.println("총점: " + getTotal() + ", 평균: " + String.format("%.1f", getAverage()));
  }
}


public class Assignment {
  public static void main(String[] args) {
    Student student = new Student("홍길동", 202301);
    student.setScore(95, 88, 92);
    student.printReport();
  }
}
