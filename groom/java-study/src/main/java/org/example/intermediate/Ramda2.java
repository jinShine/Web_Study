package org.example.intermediate;

public class Ramda2 {
    public static void main(String[] args) {
        A a = () -> {
            System.out.println("A");
        };

        B b = (str) -> {
            System.out.println(str);
        };

        C c = () -> {
            System.out.println("C");
            return "C";
        };

        D d = (x, y) -> {
            return x + y;
        };
    }
}

@FunctionalInterface
interface A {
    void m(); // 파라미터 X, 리턴값 X
}

interface B {
    void m(String str); // 파라미터 O, 리턴값 X
}

interface C {
    String m(); // 파라미터 X, 리턴값 O
}

interface D {
    int m(int x, int y); // 파라미터 O, 리턴값 O
}
