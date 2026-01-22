package org.example.intermediate.g01_22;

public class Ex1 {
  public static void main(String[] args) {
    Animal[] animals = {new Dog("뽀삐"), new Cat("나비")};

    for (Animal animal : animals) {
      animal.speak();

      if (animal instanceof Dog) {
        ((Dog) animal).fetch();
      } else if (animal instanceof Cat) {
        ((Cat) animal).scratch();
      }
    }
  }
}


abstract class Animal {
  protected String name;

  public Animal(String name) {
    this.name = name;
  }

  public void eat() {
    System.out.println(name + "이 먹는다.");
  }

  public abstract void speak();

  public void showInfo() {
    System.out.println("이름: " + name);
  }
}


class Dog extends Animal {
  public Dog(String name) {
    super(name);
  }

  @Override
  public void speak() {
    System.out.println(name + "이 짖는다.");
  }

  public void fetch() {
    System.out.println(name + "이 던진 공을 주웁니다.");
  }
}


class Cat extends Animal {
  public Cat(String name) {
    super(name);
  }

  @Override
  public void speak() {
    System.out.println(name + "이 야옹거린다.");
  }

  public void scratch() {
    System.out.println(name + "이 할퀴어 간다.");
  }
}
