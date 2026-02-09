package org.example.intermediate;

public class Ramda {
    public static void main(String[] args) {
        A a1 = new Service();

        // interface는 new를 사용할 수 없다
        // A a2 = new A();

        // 익명 클래스를 사용하면 사용할 수 있다.
        A a2 = new A() {
            public void m() {
                System.out.println("익명 내부 클래스");
            }
        };

        // 익명 내부 클래스를 줄인게 람다식!
        // A 인터페이스는 m이라는 메서드가 있으니까 어래와 같이 줄일 수있다!
        // 여기서 중요한 것은 인터페이스에 메서드가 하나만 존재해야된다!
        A a3 = () -> {
            System.out.println("이건 람다식!");
        };

        // 람다식은 메서드가 하나인 인터페이스로 만든다.

    }
}

class Service implements A {
    public void m() {
        System.out.println("Service");
    }
}

interface A {
    void m();
}