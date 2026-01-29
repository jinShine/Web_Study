package org.example.intermediate.g01_28;

import java.util.ArrayList;
import java.util.List;

public class Assignment1 {
  public static void main(String[] args) {
    StudentManager studentManager = new StudentManager();
    studentManager.addStudent(new Student("홍길동", 95));
    studentManager.addStudent(new Student("이순신", 85));
    studentManager.addStudent(new Student("강감찬", 75));

    System.out.println(studentManager.findStudent("홍길동"));
    System.out.println(studentManager.getAverage());
  }
}

class Student {
  private String name;
  private int score;

  Student(String name, int score) {
    this.name = name;
    this.score = score;
  }

  public String getName() {
    return this.name;
  }

  public int getScore() {
    return this.score;
  }

  @Override
  public String toString() {
    return this.name + " : " + this.score;
  }
}

class StudentManager {
  private List<Student> students = new ArrayList<>();

  public void addStudent(Student student) {
    students.add(student);
  }

  public void removeStudent(Student student) {
    for (int i = 0; i < students.size(); i++) {
      if (students.get(i).getName().equals(student)) {
        students.remove(i);
        System.out.println(student.getName() + " 학생을 삭제했습니다.");
        return;
      }
    }

    System.out.println(student.getName() + " 학생을 찾을 수 없습니다.");
  }

  public Student findStudent(String name) {
    for (Student s : students) {
      if (s.getName().equals(name)) {
        return s;
      }
    }

    return null;
  }

  public double getAverage() {
    if (students.isEmpty()) {
      return 0;
    }

    int sum = 0;
    for (Student s : students) {
      sum += s.getScore();
    }

    return (double) sum / students.size();
  }

}