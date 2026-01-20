package org.example.intermediate.g01_19;

class Person {
  String name;
  int age;
  String job;

  Person(String name, int age, String job) {
    this.name = name;
    this.age = age;
    this.job = job;
  }

  Person(String name) {
    this(name, 0, "미정");
  }

  Person(String name, int age) {
    this(name, age, "백수");
  }

  public void introduce() {
    System.out.println("이름 :" + name + "\n" + "나이 :" + age + "\n" + "직업 :" + job);
  }
}


public class Class {
  public static void main(String[] args) {

    Person person1 = new Person("홍길동", 20, "개발자");
    person1.introduce();
  }
}
